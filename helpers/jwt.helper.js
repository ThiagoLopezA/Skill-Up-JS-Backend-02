const JWT = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  encode: (object, expiration) => {
    return JWT.sign(object, process.env.TOKEN_SECRET, {
      expiresIn: expiration,
    });
  },
  decode: () => {},
  verify: () => {},
};
