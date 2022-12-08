module.exports = {
  user: {
    isNumeric: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  category: {
    isNumeric: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  amount: {
    isNumeric: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  date: {
    exists: true,
    isDate: true,
    notEmpty: true,
    trim: true,
  },
};
