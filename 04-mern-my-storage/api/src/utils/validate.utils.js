import Joi from 'joi';

/**
 * @description Validate request fields
 * @type {object}
 */
const validate = {
  register: (data) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
  login: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  },
  note: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      body: Joi.string().required(),
    });
    return schema.validate(data);
  },
  book: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      author: Joi.string().required(),
      description: Joi.string().required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
  movie: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
};

export default validate;
