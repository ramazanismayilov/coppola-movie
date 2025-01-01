const validationMiddleware = (schema) => {
  return (req, res, next) => {
    let { success, data, error } = schema.safeParse(req.body);

    if (!success) {
      const messages = error.issues.map((issue) => issue.message);
      return res.status(400).json({ error: messages });
    }

    req.body = data;

    next();
  };
};

module.exports = validationMiddleware;
