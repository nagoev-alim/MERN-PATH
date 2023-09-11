import { config } from '../config/index.js';

const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: config.env === 'development' ? err.stack : {},
  });
};

export default errorHandler;
