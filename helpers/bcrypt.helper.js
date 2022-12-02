const bcrypt = require("bcrypt");

module.exports = {
  hash: async string => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(string, salt);
  },
  compare: async (string, encrypted) => {
    return await bcrypt.compare(string, encrypted);
  },
};
