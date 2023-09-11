import jwt from 'jsonwebtoken';
import { configuration } from '../config/index.js';

/**
 * @description Generate access token
 * @param id - User ID
 * @return {string}
 */
const access = (id) => {
  return jwt.sign(
    { userId: id },
    configuration.jwt.access,
    { expiresIn: configuration.jwt.expiresIn },
  );
};

/**
 * @description Generate refresh token
 * @param id - User ID
 * @return {string}
 */
const refresh = (id) => {
  return jwt.sign(
    { userId: id },
    configuration.jwt.refresh,
  );
};

/**
 * @description Generate new access token
 * @param refreshToken - Refresh token
 * @return {string}
 */
const newToken = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, configuration.jwt.refresh);
  return jwt.sign(
    { userId: decoded.userId },
    configuration.jwt.access,
    { expiresIn: configuration.jwt.expiresIn },
  );
};

export default {
  access,
  refresh,
  newToken,
};
