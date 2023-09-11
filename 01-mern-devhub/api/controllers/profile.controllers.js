import { httpCodes, validations } from '../utils/index.js';
import { Post, Profile, User } from '../models/index.js';
import normalize from 'normalize-url';
import { config } from '../config/index.js';
import axios from 'axios';

const profileControllers = {

  // Получение профиля пользователя
  me: async (req, res) => {
    try {
      // Поиск профиля пользователя
      const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email', 'avatarUrl']);
      // Если профиль не найден
      if (!profile) {
        return res.status(httpCodes.NOT_FOUND.code).json({
          error: true,
          message: httpCodes.NOT_FOUND.message,
        });
      }
      // Создание ответа
      return res.status(httpCodes.OK.code).json({
        error: false,
        message: httpCodes.OK.message,
        profile,
      });
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Создание профиля пользователя
  create: async (req, res) => {
    try {
      // Валидация запроса
      const { error } = validations.createProfile(req.body);
      if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
      }
      // Получения полей из запроса
      const { website, skills, youtube, twitter, instagram, linkedin, facebook, ...rest } = req.body;
      // Поля профиля
      const profileFields = {
        user: req.user.id,
        website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
        skills: Array.isArray(skills) ? skills : skills.split(',').map((skill) => ' ' + skill.trim()),
        ...rest,
      };
      // Социальных сетей
      const socialFields = { youtube, twitter, instagram, linkedin, facebook };
      // Нормализация социальных полей для обеспечения правильного url
      for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0) {
          socialFields[key] = normalize(value, { forceHttps: true });
        }
      }
      // Добавление поля в объект профиля
      profileFields.social = socialFields;
      // Обновление записи
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
      // Создание ответа
      return res.status(httpCodes.CREATED.code).json(profile);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Получение всех профилей
  getAll: async (req, res) => {
    try {
      // Получение всех профилей
      const profiles = await Profile.find().populate('user', ['name', 'avatarUrl']);
      // Создание ответа
      return res.status(httpCodes.OK.code).json(profiles);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Получение профиля по идентификатору
  getByUserId: async (req, res) => {
    const { id: user } = req.params;
    try {
      // Поиск профиля пользователя по ID
      const profile = await Profile.findOne({ user }).populate('user', ['name', 'avatarUrl']);
      // Если профиль не найден
      if (!profile) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Создание ответа
      return res.status(httpCodes.OK.code).json(profile);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Удаление профиля
  delete: async (req, res) => {
    try {
      await Promise.all([
        Post.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id }),
      ]);
      // Создание ответа
      return res.status(httpCodes.OK.code).json({ message: 'User deleted' });
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Добавление опыта работы
  addExperience: async (req, res) => {
    try {
      // Валидация запроса
      const { error } = validations.addExperience(req.body);
      if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
      }
      // Поиск профиля пользователя по ID
      const profile = await Profile.findOne({ user: req.user.id });
      // Добавление тела запроса в начало свойства профиля
      profile.experience.unshift(req.body);
      // Сохранение профиля
      await profile.save();
      // Создание ответа
      return res.status(httpCodes.OK.code).json(profile);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Удаление опыта работы
  deleteExperience: async (req, res) => {
    try {
      // Поиск профиля пользователя по ID
      const profile = await Profile.findOne({ user: req.user.id });
      // Удаление значения из массива
      profile.experience = profile.experience.filter((exp) => exp._id.toString() !== req.params.id);
      // Сохранение профиля
      await profile.save();
      // Создание ответа
      return res.status(httpCodes.OK.code).json(profile);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Добавление образования
  addEducation: async (req, res) => {
    try {
      // Валидация запроса
      const { error } = validations.addEducation(req.body);
      if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
      }
      // Поиск профиля пользователя по ID
      const profile = await Profile.findOne({ user: req.user.id });
      // Добавление тела запроса в начало свойства профиля
      profile.education.unshift(req.body);
      // Сохранение профиля
      await profile.save();
      // Создание ответа
      return res.status(httpCodes.OK.code).json(profile);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Удаление образования
  deleteEducation: async (req, res) => {
    try {
      // Поиск профиля пользователя по ID
      const profile = await Profile.findOne({ user: req.user.id });
      // Удаление значения из массива
      profile.education = profile.education.filter((exp) => exp._id.toString() !== req.params.id);
      // Сохранение профиля
      await profile.save();
      // Создание ответа
      return res.status(httpCodes.OK.code).json(profile);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Удаление образования
  getRepos: async (req, res) => {
    try {
      const uri = encodeURI(`${config.github.uri}/${req.params.username}/repos?per_page=5&sort=created:asc`);
      const headers = {
        'user-agent': 'node.js',
        // Authorization: `token ${config.github.token}`
      };
      const { data: gitHubResponse } = await axios.get(uri, { headers });
      // Создание ответа
      return res.status(httpCodes.OK.code).json(gitHubResponse);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

};

export default profileControllers;
