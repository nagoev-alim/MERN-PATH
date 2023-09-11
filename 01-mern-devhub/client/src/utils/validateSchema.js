import * as yup from 'yup';

export const schema = {
  required: yup.string().required('Field is required'),
  name: yup.string()
    .min(3, `Must be at least 3 characters`)
    .max(30, `Must be 30 characters or less`)
    .matches(/^[A-z\s]+$/, 'Only alphabets are allowed for this field')
    .required('Required'),
  email: yup.string()
    .email('Email is invalid')
    .matches(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/, 'Enter a valid email address')
    .required('Email is required'),
  password: yup.string()
    .max(30, `Must be 30 characters or less`)
    .matches(
      /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
      `
          <p>Passwords will contain at least 1 upper case letter</p>
          <p>Passwords will contain at least 1 lower case letter</p>
          <p>Passwords will contain at least 1 number</p>
          <p>Passwords will contain at least 1 special character (!@#$%^&*()-_+.)</p>`)
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Password is required'),
};


export const validateSchema = {
  register: {
    name: schema.name,
    email: schema.email,
    password: schema.password,
    // confirmPassword: schema.confirmPassword,
  },
  login: {
    email: schema.email,
    password: schema.password,
  },
  createProfile: {
    status: schema.required,
    skills: schema.required,
  },
  addExperience: {
    title: schema.required,
    company: schema.required,
    from: schema.required,
  },
  addEducation: {
    school: schema.required,
    degree: schema.required,
  },
};

export const defaultValues = {
  register: {
    name: '',
    email: '',
    password: '',
    // confirmPassword: '',
  },
  login: {
    email: '',
    password: '',
  },
  createProfile: {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    github: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  },
  addExperience: {
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    description: '',
  },
  addEducation: {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    description: '',
  },
};
