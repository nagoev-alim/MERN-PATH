// 🔳 Imports packages
import * as yup from 'yup';

// 🔴 Yup validation schema
const fieldSample = yup
  .string()
  .required('❌ Field is required');

const username = yup
  .string()
  .min(3, `❌ Username must be at least 3 characters`)
  .max(30, `❌ Username must be 30 characters or less`)
  .matches(/^[A-z\s]+$/, '❌️ Username only alphabets are allowed for this field')
  .required('❌ Username required');

const email = yup
  .string()
  .email('❌️ Email is invalid')
  .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, '❌️ Enter a valid email address')
  .required('❌️ Email is required');

const password = yup
  .string()
  .max(30, `Password must be 30 characters or less`)
  .matches(
    /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
    `
          <p>❌️ Passwords will contain at least 1 upper case letter</p>
          <p>❌️ Passwords will contain at least 1 lower case letter</p>
          <p>❌️ Passwords will contain at least 1 number</p>
          <p>❌️ Passwords will contain at least 1 special character (!@#$%^&*()-_+.)</p>`)
  .required('❌ Password is required');

const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password'), null], '❌ Password must match')
  .required('❌ Password is required');

const url = yup
  .string()
  .matches(/^(?:https?:\/\/)?(?:www\.)?[\w.-]+\.[a-zA-Z]{2,20}(?:\/.*)?$/, '❌️ Enter a valid URL address')
  .required('❌️ URL is required');

/**
 * @description - Register Schema
 * @type {object}
 */
export const registerSchema = {
  defaultValue: { username: '', email: '', password: '' },
  schema: { username, email, password },
};

/**
 * @description - Login Schema
 * @type {object}
 */
export const loginSchema = {
  defaultValue: { email: '', password: '' },
  schema: { email, password },
};


/**
 * @description - Account Schema
 * @type {object}
 */
export const accountSchema = {
  defaultValue: { username: '', email: '' },
  schema: { username, email },
};

/**
 * @description - Diary Schema
 * @type {object}
 */
export const diarySchema = {
  defaultValue: {
    note: '',
    date: '',
    day: '',
    weather: '',
    social: '',
    school: '',
    romance: '',
    other: '',
    meals: '',
    health: '',
    chores: '',
    beauty: '',
    work: '',
    emotions: '',
    hobbies: '',
    events: '',
  },
  schema: { day: fieldSample, note: fieldSample, date: fieldSample },
};
