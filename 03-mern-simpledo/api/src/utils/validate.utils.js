import Joi from 'joi';

/**
 * @description Validate request fields
 * @type {object}
 */
const validate = {
  register: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  },
  login: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  },
  todo: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
    });
    return schema.validate(data);
  },
};

export default validate;
