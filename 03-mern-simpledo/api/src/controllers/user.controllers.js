import bcrypt from 'bcryptjs';
import { httpCodes, generateToken, validate } from '../utils/index.js';
import { User } from '../models/index.js';

/**
 * @description User Controller
 */
const userControllers = {
  /**
   * @description Register user
   * @param req
   * @param res
   * @return {object}
   */
  register: async (req, res) => {
    try {
      // Validate fields
      const { error } = validate.register(req.body);
      if (error) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
      }
      // Get field from request body
      const { name, email, password } = req.body;
      // Search doc from email
      const existsDoc = await User.findOne({ email });
      // Check if doc is exists
      if (existsDoc) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: 'Email already in use' });
      }
      // Generate password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      // Create doc
      const createdDoc = await User.create({ name, email, password: hash, verified: false });
      // Save doc
      const doc = await createdDoc.save();
      // Generate tokens
      const accessToken = generateToken.access(doc.id);
      const refreshToken = generateToken.refresh(doc.id);
      return res.status(httpCodes.OK.code).json({ name, email, accessToken, refreshToken });
      // Return response
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
  /**
   * @description Login user
   * @param req
   * @param res
   * @return {object}
   */
  login: async (req, res) => {
    try {
      // Validate fields
      const { error } = validate.login(req.body);
      if (error) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
      }
      // Get field from request body
      const { email, password } = req.body;
      // Search doc from email
      const existsDoc = await User.findOne({ email });
      console.log(existsDoc);
      // Check if doc is exists
      if (!existsDoc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Compare password
      const matchPassword = await bcrypt.compare(password, existsDoc.password);
      // Check if password match
      if (!matchPassword) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: httpCodes.BAD_REQUEST.message });
      }
      // Generate tokens
      const accessToken = generateToken.access(existsDoc.id);
      const refreshToken = generateToken.refresh(existsDoc.id);
      // Return response
      return res.status(httpCodes.OK.code).json({
        name: existsDoc.name,
        email: existsDoc.email,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
  /**
   * @description Refresh Token
   * @param req
   * @param res
   * @return {object}
   */
  refresh: async (req, res) => {
    try {
      // Get field from request
      const { refreshToken } = req.body;
      // If no token
      if (!refreshToken) {
        return res.status(httpCodes.UNAUTHORIZED.code).json(httpCodes.UNAUTHORIZED.message);
      }
      // Verify and return new tokens
      const accessToken = generateToken.newToken(refreshToken);
      // Return response
      return res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
  /**
   * @description Get user
   * @return {object}
   */
  get: async (req, res) => {
    try {
      // Search doc by ID
      const doc = await User.findOne({ _id: req.user });
      // Check if doc is exists
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Return response
      return res.json({
        id: doc._id,
        name: doc.name,
        email: doc.email,
      });
    } catch (error) {
      console.error(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },

  /**
   * @description Update user
   * @return {object}
   */
  update: async (req, res) => {
    try {
      // Search doc by ID
      const updatedDoc = await User.findByIdAndUpdate({ _id: req.user }, req.body, { new: true });
      // Check if doc is exists
      if (!updatedDoc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Return response
      return res.json({
        id: updatedDoc._id,
        name: updatedDoc.name,
        email: updatedDoc.email,
      });
    } catch (error) {
      console.error(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
};

export default userControllers;
