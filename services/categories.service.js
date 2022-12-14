const { ErrorObject } = require("../helpers/error");
const { Category } = require("../database/models");

exports.getOne = async (id) => {
  try {
    const category = await Category.findByPk(id, { raw: true });
    if (!category) throw new ErrorObject("Category not found", 404);
    return category;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.deleteOne = async (id) => {
  try {
    const category = await Category.findByPk(id);
    if (category !== null) {
      const destroy = await Category.destroy({ where: { id } });
      return category;
    }
    throw new ErrorObject("Category not found", 404);
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

exports.editOne = async (id, category) => {
  try {
    const find = await Category.findByPk(id);
    if (find !== null) {
      const edit = await Category.update(category, { where: { id } });
      return category;
    }
    throw new ErrorObject("Category not found", 404);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

module.exports.createOne = async (category) => {
  try {
    return await Category.create(category);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
