const { checkSchema, validationResult } = require("express-validator");
const { ErrorObject } = require("../helpers/error");

const validation = schema => [
  checkSchema(schema, ["body"]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorObject("Invalid value/s", 422, errors.mapped());
    }
    return next();
  },
];

module.exports = validation;
