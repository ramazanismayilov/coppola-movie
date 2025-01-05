const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { success, data, error } = schema.safeParse(req.body);

    if (!success) {
      const issues = error.issues.map((issue) => ({
        field: issue.path.join("."), 
        message: issue.message,
      }));

      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: issues,
      });
    }

    req.body = data; 

    next();
  };
};

module.exports = validationMiddleware;
