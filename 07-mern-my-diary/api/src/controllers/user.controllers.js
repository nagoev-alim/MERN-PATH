// 🔳 Custom import
import bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
// 🔳 Custom import
import { generateToken, httpCodes, mailer, validate } from '../utils/index.js';
import { Diary, Token, User } from '../models/index.js';
import { configuration } from '../config/index.js';

/**
 * @description User Controller
 * @type {object}
 */
export default {
  // 🟨 Register User
  registerUser: async (req, res) => await fn(req, res, 'CREATE'),
  // 🟨 Register User With Email Verification
  registerWithVerifiedEmail: async (req, res) => await fn(req, res, 'CREATE_WITH_VERIFIED'),
  // 🟨 Login User
  loginUser: async (req, res) => await fn(req, res, 'LOGIN'),
  // 🟨 Logout User
  logoutUser: async (req, res) => await fn(req, res, 'LOGOUT'),
  // 🟨 Login User  With Email Verification
  loginWithVerifiedEmail: async (req, res) => await fn(req, res, 'LOGIN_WITH_VERIFIED'),
  // 🟨 Read User
  readUser: async (req, res) => await fn(req, res, 'READ'),
  // 🟨 Update User
  updateUser: async (req, res) => await fn(req, res, 'UPDATE'),
  // 🟨 Delete User
  deleteUser: async (req, res) => await fn(req, res, 'DELETE'),
  // 🟨 Refresh User Token
  refreshToken: async (req, res) => await fn(req, res, 'REFRESH_TOKEN'),
  // 🟨 Verify User
  verifyUser: async (req, res) => await fn(req, res, 'VERIFY_USER'),
};

const fn = async (req, res, type) => {
  try {
    switch (type) {
      case 'CREATE': {
        const { error } = validate.register(req.body);
        if (error) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
        }
        const existsDoc = await User.findOne({ email: req.body.email });
        if (existsDoc) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: 'Email already in use' });
        }
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const doc = await User.create({ ...req.body, password });
        return res.status(httpCodes.OK.code).json({
          message: 'User created successfully',
          data: {
            _id: doc._id,
            token: generateToken.access(doc._id),
            username: doc.username,
            email: doc.email,
          },
        });
      }
      case 'CREATE_WITH_VERIFIED': {
        const { error } = validate.register(req.body);
        if (error) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
        }
        const existsDoc = await User.findOne({ email: req.body.email });
        if (existsDoc) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: 'Email already in use' });
        }
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const doc = await User.create({ ...req.body, verified: false, password });
        const token = await new Token({
          userId: doc._id,
          token: crypto.randomBytes(32).toString('hex'),
        }).save();
        await mailer(doc.email, '👋 Please Verify Email', `${configuration.url.client}/verify/${token.token}`);
        // await mailer(doc.email, '👋 Please Verify Email', `${configuration.url.api}/api/users/verify/${token.token}`); // 🔴 FOR TESTING
        return res.status(httpCodes.OK.code).json({
          message: 'An Email sent to your account, please verify',
        });
      }
      case 'LOGIN': {
        const { error } = validate.login(req.body);
        if (error) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
        }
        const existsDoc = await User.findOne({ email: req.body.email });
        if (!existsDoc) {
          return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
        }
        if (!await bcrypt.compare(req.body.password, existsDoc.password)) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: httpCodes.BAD_REQUEST.message });
        }

        const accessToken = generateToken.access(existsDoc._id);
        const refreshToken = generateToken.refresh(existsDoc._id);

        res.cookie('token', accessToken, {
          httpOnly: false,
        });
        res.cookie('refreshToken', refreshToken, {
          httpOnly: false,
        });

        return res.status(httpCodes.OK.code).json({
          message: 'User logged in successfully',
          data: {
            _id: existsDoc._id,
            username: existsDoc.username,
            email: existsDoc.email,
          },
        });
      }
      case 'LOGOUT': {
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        return res.status(httpCodes.OK.code).json({
          message: 'User logged out successfully',
        });
      }
      case 'LOGIN_WITH_VERIFIED': {
        const { error } = validate.login(req.body);
        if (error) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
        }
        const existsDoc = await User.findOne({ email: req.body.email });
        if (!existsDoc) {
          return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
        }
        if (!await bcrypt.compare(req.body.password, existsDoc.password)) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: httpCodes.BAD_REQUEST.message });
        }
        if (!existsDoc.verified) {
          let token = await Token.findOne({ userId: existsDoc._id });
          if (!token) {
            token = await new Token({
              userId: existsDoc._id,
              token: crypto.randomBytes(32).toString('hex'),
            }).save();
            await mailer(existsDoc.email, '👋 Please Verify Email', `${configuration.url.client}/verify/${token.token}`);
            // await mailer(existsDoc.email, '👋 Please Verify Email', `${configuration.url.api}/api/users/verify/${token.token}`); // 🔴 FOR TESTING
          }
          return res.status(httpCodes.BAD_REQUEST.code).send({
            message: 'An Email sent to your account, please verify',
          });
        }

        return res.status(httpCodes.OK.code).json({
          message: 'User logged in successfully',
          data: {
            _id: existsDoc._id,
            token: generateToken.access(existsDoc._id),
            refreshToken: generateToken.refresh(existsDoc._id),
            username: existsDoc.username,
            email: existsDoc.email,
          },
        });
      }
      case 'READ': {
        const doc = await User.findOne({ _id: req.user });
        if (!doc) {
          return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
        }
        return res.status(httpCodes.OK.code).json({
          message: 'Successfully retrieved',
          data: {
            _id: doc._id,
            username: doc.username,
            email: doc.email,
          },
        });
      }
      case 'UPDATE': {
        const doc = await User.findByIdAndUpdate({ _id: req.user }, req.body, { new: true });
        if (!doc) {
          return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
        }
        return res.status(httpCodes.OK.code).json({
          message: 'Successfully updated',
          data: {
            _id: doc._id,
            username: doc.username,
            email: doc.email,
          },
        });
      }
      case 'DELETE': {
        await Promise.all([
          await User.findByIdAndDelete({ _id: req.user }),
          await Diary.deleteMany({ userId: req.user}),
        ])
        return res.status(httpCodes.OK.code).json({
          message: 'Successfully deleted',
        });
      }
      case 'REFRESH_TOKEN': {
        if (!req.body.refreshToken) {
          return res.status(httpCodes.UNAUTHORIZED.code).json(httpCodes.UNAUTHORIZED.message);
        }

        return res.json({
          message: 'Token refreshed successfully',
          data: {
            token: generateToken.newToken(req.body.refreshToken),
            refreshToken: req.body.refreshToken,
          },
        });
      }
      case 'VERIFY_USER': {
        const doc = await Token.findOne({ token: req.params.token });
        if (!doc) {
          return res.status(httpCodes.BAD_REQUEST.code).send({ message: 'Invalid link' });
        }
        await User.findByIdAndUpdate({ _id: doc.userId }, { verified: true }, { new: true });
        await Token.findByIdAndRemove({ _id: doc.id });
        return res.json({ message: 'Email verified successfully' });
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
  }
};
