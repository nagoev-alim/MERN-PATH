import { httpCodes, validations } from '../utils/index.js';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const authControllers = {
  // Проверка авторизации
  testAuth: async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id).select('-password');
    res.json(user);
  },

  // Авторизация пользователя
  login: async (req, res) => {
    // Валидация запроса
    const { error } = validations.login(req.body);
    if (error) {
      return res.status(400).json({ error: true, message: error.details[0].message });
    }
    // Получение полей запроса
    const { email, password } = req.body;

    try {
      // Проверка существования пользователя
      const doc = await User.findOne({ email });
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({
          error: true,
          message: httpCodes.NOT_FOUND.message,
        });
      }
      // Валидация пароля
      const passwordCompare = await bcrypt.compare(password, doc.password);
      if (!passwordCompare) {
        return res.status(httpCodes.BAD_REQUEST.code).json({
          error: true,
          message: httpCodes.BAD_REQUEST.message,
        });
      }
      // Подготовка токена
      const payload = { user: { id: doc.id } };
      // Создание токена
      const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
      // Возвращение ответа
      return res.status(httpCodes.OK.code).json({
        error: false,
        message: httpCodes.OK.message,
        token,
        user: {
          name: doc.name,
          email: doc.email,
          avatarUrl: doc.avatarUrl,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

};

export default authControllers;
