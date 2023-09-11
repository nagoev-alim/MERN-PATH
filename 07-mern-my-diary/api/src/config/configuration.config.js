// 🔳 Imports packages
import 'dotenv/config';

/**
 * @description - Setup configuration
 * @type {Object}
 */
export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  url: {
    client: process.env.CLIENT_URL || 'http://localhost:5173',
    api: process.env.API_URL || 'http://localhost:5000',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    access: process.env.JWT_ACCESS || 'access',
    refresh: process.env.JWT_REFRESH || 'refresh',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/test',
  },
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
  corsOptions: {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  },
};
