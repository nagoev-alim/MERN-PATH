import Joi from 'joi';

const schemaValidation = {
  // Регистрация
  register: (data) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  },
  // Авторизация
  login: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  },
  // Создание профиля
  createProfile: (data) => {
    const schema = Joi.object({
      status: Joi.string().not().empty().required(),
      skills: Joi.string().not().empty().required(),
    }).options({ stripUnknown: true });
    return schema.validate(data);
  },
  // Добавление опыта работы
  addExperience: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      company: Joi.string().required(),
      from: Joi.string().not().empty().custom((value, helpers) => {
        return data.to ? value < data.to : true;
      }).required(),
    }).options({ stripUnknown: true });
    return schema.validate(data);
  },
  // Добавление образования
  addEducation: (data) => {
    const schema = Joi.object({
      school: Joi.string().required(),
      degree: Joi.string().required(),
      fieldofstudy: Joi.string().not().empty(),
      from: Joi.string().not().empty().custom((value, helpers) => {
        return data.to ? value < data.to : true;
      }).required(),
    }).options({ stripUnknown: true });
    return schema.validate(data);
  },
  // Добавление поста
  addPost: (data) => {
    const schema = Joi.object({
      text: Joi.string().not().empty().required(),
    });
    return schema.validate(data);
  },
  // Добавление комментария
  addComment: (data) => {
    const schema = Joi.object({
      text: Joi.string().not().empty().required(),
    });
    return schema.validate(data);
  },
};

export default schemaValidation;
