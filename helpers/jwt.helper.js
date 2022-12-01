const JWT = require("jsonwebtoken");
const ErrorObject = require("./error");
require("dotenv").config();

module.exports = {
  encode: (object, expiration) => {
    return JWT.sign(object, process.env.TOKEN_SECRET, {
      expiresIn: expiration,
    });
  },
  decode: token => {
    const decoded = JWT.decode(token);
    if (!decoded) throw new ErrorObject("Invalid token", 400);
    return decoded;
  },
  verify: token => {
    return JWT.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) return true;
      return false;
    });
  },
};
