// 🔳 Imports packages
import jwt from 'jsonwebtoken';
// 🔳 Custom import
import { httpCodes } from '../utils/index.js';
import { configuration } from '../config/index.js';

/**
 * @description - Check if user is authorized to access
 * @return {*}
 */
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    return res.status(httpCodes.UNAUTHORIZED.code).json(httpCodes.UNAUTHORIZED.message);
  }
  jwt.verify(token, configuration.jwt.access, (err, user) => {
    if (err) {
      return res.status(httpCodes.UNAUTHORIZED.code).json(httpCodes.UNAUTHORIZED.message);
    }
    req.user = user.userId;
    next();
  });
};
