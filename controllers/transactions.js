const createHttpError = require("http-errors");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const { deleteOne } = require("../services/transactions.service");

module.exports = {
  deleteOne: catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await deleteOne(id);
      endpointResponse({
        res,
        message: "Transaction deleted successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting transaction] - [/:id - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
}