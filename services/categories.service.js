const { ErrorObject } = require("../helpers/error");
const { Category } = require("../database/models");

exports.getOne = async id => {
  try {
    const category = await Category.findByPk(id);
    if (!category) throw new ErrorObject("Category not found", 404);
    return category;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.deleteOne = async id => {
  try {
    const category = await Category.findByPk(id);
    if (category !== null) {
      const destroy = await Category.destroy({ where: { id } });
      return category
    }
    throw new ErrorObject("Category not found", 404);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
