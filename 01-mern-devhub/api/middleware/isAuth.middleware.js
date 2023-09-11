import { httpCodes } from '../utils/index.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const isAuth = async (req, res, next) => {
  // Полуаем заголовок
  const token = req.headers.authorization.split(' ')[1];
  // Проверяем токен
  if (!token) {
    return res.status(httpCodes.UNAUTHORIZED.code).json({ error: true, message: httpCodes.UNAUTHORIZED.message });
  }
  try {
    // Валидация токена
    const decoded = jwt.verify(token, config.jwt.secret);
    // Добавляем токен в запрос
    req.user = decoded.user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(httpCodes.UNAUTHORIZED.code).json({ error: true, message: httpCodes.UNAUTHORIZED.message });
  }
};

export default isAuth;
