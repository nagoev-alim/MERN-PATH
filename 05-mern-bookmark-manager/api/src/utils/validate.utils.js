import Joi from 'joi';

/**
 * @description Validate request fields
 * @type {object}
 */
const validate = {
  register: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
  login: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
  category: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
  bookmark: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      url: Joi.string().required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
};

export default validate;
