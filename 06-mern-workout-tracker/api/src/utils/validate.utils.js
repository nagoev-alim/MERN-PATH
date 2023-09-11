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
    }).options({ allowUnknown: true });
    return schema.validate(data);
  },
  exercise: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      date: Joi.date().required(),
      duration: Joi.number().required(),
      sets: Joi.array()
        .items(
          Joi.object({
            reps: Joi.number().required(),
          }),
        )
        .required()
  }).
    options({ allowUnknown: true });
    return schema.validate(data);
  },
};

export default validate;
