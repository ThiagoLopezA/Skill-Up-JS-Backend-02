const { User } = require('../database/models');
const { ErrorObject } = require('../helpers/error');

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
