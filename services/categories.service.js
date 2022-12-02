const { ErrorObject } = require("../helpers/error");
const { Category } = require("../database/models");

exports.getOne = async (id) => {
  try {
    const category = await Category.findByPk(id);
    if (!category) throw new ErrorObject("Category not found", 404);
    return category;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.getAll = async () => {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
