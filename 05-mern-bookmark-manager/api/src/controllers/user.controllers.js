import bcrypt from 'bcryptjs';
import { httpCodes, generateToken, validate, mailer } from '../utils/index.js';
import { Bookmark, Category, Token, User } from '../models/index.js';
import * as crypto from 'crypto';
import { configuration } from '../config/index.js';

/**
 * @description User Controller
 */
const userControllers = {
  /**
   * @description Register user
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
      const { email, password, ...rest } = req.body;
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
      const createdDoc = await User.create({ ...rest, email, password: hash });

      // Uncomment if you need mail notification
      // const createdDoc = await User.create({ ...rest, email, password: hash, verified: false });

      // Save doc
      const doc = await createdDoc.save();

      // Uncomment if you need mail notification
      // const token = await new Token({
      //   userId: doc._id,
      //   token: crypto.randomBytes(32).toString('hex'),
      // }).save();
      // await mailer(doc.email, 'Verify Email', `${configuration.url.client}/verify/${token.token}`);
      // return res.status(httpCodes.OK.code).json({ message: 'An Email sent to your account please verify' });

      // Generate tokens
      const accessToken = generateToken.access(doc.id);
      const refreshToken = generateToken.refresh(doc.id);
      // Get only info fields
      const { password: userPassword, createdAt, updatedAt, __v, ...restData } = doc._doc;
      // Return response
      return res.status(httpCodes.OK.code).json({ ...restData, accessToken, refreshToken });
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
  /**
   * @description Login user
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

      // Uncomment if you need mail notification
      // if (!existsDoc.verified) {
      //   let token = await Token.findOne({ userId: existsDoc._id });
      //   if (!token) {
      //     token = await new Token({
      //       userId: existsDoc._id,
      //       token: crypto.randomBytes(32).toString('hex'),
      //     }).save();
      //     await mailer(existsDoc.email, 'Verify Email', `${configuration.url.client}/verify/${token.token}`);
      //   }
      //   return res.status(httpCodes.BAD_REQUEST.code).send({ message: 'An Email sent to your account please verify' });
      // }

      // Get only info fields
      const { password: userPassword, createdAt, updatedAt, __v, ...restData } = existsDoc._doc;
      // Return response
      return res.status(httpCodes.OK.code).json({
        ...restData,
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
      // Get only info fields
      const { password: userPassword, createdAt, updatedAt, __v, ...restData } = doc._doc;
      // Return response
      return res.json({ ...restData });
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
      // Get only info fields
      const { password: userPassword, createdAt, updatedAt, __v, ...restData } = updatedDoc._doc;
      // Return response
      return res.json({ ...restData });
    } catch (error) {
      console.error(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },


  /**
   * @description Delete user
   * @return {object}
   */
  delete: async (req, res) => {
    try {
      // Search doc by ID
      await Promise.all([
        await User.findByIdAndDelete({ _id: req.user }),
        await Category.deleteMany({ userId: req.user}),
        await Bookmark.deleteMany({ userId: req.user}),
      ])
      // Return response
      return res.status(httpCodes.OK.code).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },

  /**
   * @description Verify user
   * @return {object}
   */
  verify: async (req, res) => {
    try {
      // Get field from params
      const { token } = req.params;
      // Get doc by ID
      const doc = await Token.findOne({ token });
      // Check if doc is exists
      if (!doc) {
        return res.status(httpCodes.BAD_REQUEST.code).send({ message: 'Invalid link' });
      }
      // Update doc
      await User.findByIdAndUpdate({ _id: doc.userId }, { verified: true }, { new: true });
      // Delete doc
      await Token.findByIdAndRemove({ _id: doc.id });
      // Return response
      res.status(httpCodes.OK.code).send({ message: 'Email verified successfully' });
    } catch (error) {
      console.error(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
};

export default userControllers;
