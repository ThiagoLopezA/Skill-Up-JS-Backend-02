module.exports = {
  firstName: {
    isAlpha: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  lastName: {
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
