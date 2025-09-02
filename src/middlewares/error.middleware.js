const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  if (res.headersSent) {
    return next(err); 
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({ error: message });
};

module.exports = errorMiddleware;
