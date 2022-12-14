const { ErrorObject } = require("./error");
const { decode } = require("./jwt.helper");
require("dotenv").config();

const validateAuth = async (headers) => {
  const auth = await headers["authorization"];
  if (!auth) throw new ErrorObject("Token do not exist", 404);
  const token = auth.split(" ")[1];
  const decoded = decode(token);
  return decoded;
};

module.exports = validateAuth;
