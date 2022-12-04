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

module.exports.deleteOne = async (id) => {
  try {
    const find = await User.findByPk(id);
    if (find !== null) {
      const destroy = await User.destroy({ where: { id } });
      return find;
    }
    throw new ErrorObject('user not found', 404);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

module.exports.createUser = async (user) => {
  try {
    const email = user.email;
    const find = await User.findOne({ where: { email } });
    if (find) {
      throw new ErrorObject('email is already exists', 400);
    }
    user.firstName = user.first_name;
    user.lastName = user.last_name;
    await User.create(user);
    return await User.findOne({ where: { email } });

  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};