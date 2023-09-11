import 'dotenv/config';

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    access: process.env.JWT_ACCESS || 'access',
    refresh: process.env.JWT_REFRESH || 'refresh',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/test',
  },
  github:{
    uri: process.env.GITHUB_URL || 'https://api.github.com/users',
    token: process.env.GITHUB_TOKEN || ''
  }
};

export default config;
