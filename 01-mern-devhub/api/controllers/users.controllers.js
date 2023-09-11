import { httpCodes, validations } from '../utils/index.js';
import { User } from '../models/index.js';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import normalize from 'normalize-url';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

const usersControllers = {
  // Регистрация пользователя
  register: async (req, res) => {
    // Валидация запроса
    const { error } = validations.register(req.body);
    if (error) {
      return res.status(400).json({ error: true, message: error.details[0].message });
    }
    // Получение полей запроса
    const { name, email, password } = req.body;

    try {
      // Проверка существования пользователя
      const doc = await User.findOne({ email });
      if (doc) {
        return res.status(httpCodes.BAD_REQUEST.code).json({
          error: true,
          message: 'User already exists',
        });
      }
      // Создание превью пользователя
      const avatarUrl = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true },
      );
      // Создание пользователя
      const user = await new User({ name, email, password, avatarUrl });
      // Подготовка пароля
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // Добавление пользователя в базу данных
      await user.save();
      // Подготовка токена
      const payload = { user: { id: user.id } };
      // Создание токена
      const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
      // Создание ответа
      return res.status(httpCodes.CREATED.code).json({
        error: false,
        message: httpCodes.CREATED.message,
        // user: {
        //   email: user.email,
        //   name: user.name,
        //   avatarUrl: user.avatarUrl,
        // },
        token,
      });
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
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

  getUser: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await User.findById(id).select('-password');
      return res.status(httpCodes.OK.code).json(user)
    } catch (error) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },
};

export default usersControllers;
