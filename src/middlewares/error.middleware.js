const errorMiddleware = (err, req, res, next) => {
  if (err.statusCode === 500 || !err.statusCode) {
    res.status(500).json({ error: "Internal Server Error" });
  }

  res.status(err.statusCode).json({ err: err.message });
};

module.exports = errorMiddleware;
