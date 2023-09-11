// 🔳 Imports packages
import Joi from 'joi';

/**
 * @description Validate request fields
 * @type {object}
 */
export default {
  register: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().regex(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/).required(),
      password: Joi.string().min(8).max(30).regex(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/).required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
  login: (data) => {
    const schema = Joi.object({
      email: Joi.string().email().regex(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/).required(),
      password: Joi.string().min(8).max(30).regex(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/).required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
  diary: (data) => {
    const schema = Joi.object({
      note: Joi.string().required(),
      date: Joi.date().iso().required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
};
