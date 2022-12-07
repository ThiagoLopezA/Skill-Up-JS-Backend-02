const { ErrorObject } = require("../helpers/error");
const jwt = require("../helpers/jwt.helper");

const accesTransaction = async (req, res, next) => {
  const { encrypted } = req.body;
  const verifyTransaction = jwt.decode(encrypted);

  if (!verifyTransaction) throw new ErrorObject("Acces denied", 403);
  next();
};

module.exports = { accesTransaction };
