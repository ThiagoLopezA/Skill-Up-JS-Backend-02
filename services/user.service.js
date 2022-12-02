const { ErrorObject } = require("../helpers/error");
const { User } = require("../database/models");

exports.getByEmail = async email => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new ErrorObject("User not found", 404);
    return user;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
