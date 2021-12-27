const ErrorHandler = require("./../utils/error-handler");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  console.log(err)({
    message: "internal server error. Please, try again later",
  });
  res.status(500).json({ message: "error middliware 13" });
};

module.exports = errorMiddleware;
