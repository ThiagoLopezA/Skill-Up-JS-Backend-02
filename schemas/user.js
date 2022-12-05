module.exports = {
  first_name: {
    isAlpha: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  last_name: {
    isAlpha: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  email: {
    isEmail: true,
    exists: true,
    notEmpty: true,
    trim: true,
  },
  password: {
    isAlphanumeric: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
};
