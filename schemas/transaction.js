module.exports = {
  userId: {
    isNumeric: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  toUserId: {
    optional: { checkFalsy: true },
    isNumeric: true,
    exists: true,
    notEmpty: true,
    trim: true,
    escape: true,
  },
  categoryId: {
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
};
