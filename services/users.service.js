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
    throw new ErrorObject("user not found", 404);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

module.exports.editUser = async (id, props) => {
  try {
    const userToEdit = await User.findByPk(id);
    if (userToEdit == null) {
      throw new ErrorObject("User not found", 404);
    }
    const values = {
      firstName: props.firstname,
        lastName: props.lastname,
        email: props.email,
        avatar: props.avatar,
        password: props.password,
        roleId: props.roleId
    }
    const result = await User.update(values, {where: id});
    return result;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
