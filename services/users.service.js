const { ErrorObject } = require("../helpers/error");
const { User } = require("../database/models");

exports.getUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new ErrorObject("User not found", 404);
    return user;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
