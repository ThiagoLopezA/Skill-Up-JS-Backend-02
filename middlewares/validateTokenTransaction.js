const { ErrorObject } = require("../helpers/error");
const jwt = require("../helpers/jwt.helper");
const { catchAsync } = require("../helpers/catchAsync");
const {Transaction} = require("../database/models")

const accessTransaction = catchAsync(async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  const verified = jwt.verify(token)
  const id = req.params
  const findTransaction = await Transaction.findOne({where:{id}});

     if (!verified || !findTransaction ) throw new ErrorObject("Access denied", 403);
    next();
 
});

module.exports = { accessTransaction };
