const errorMiddleware = (error, req, res, next) => {
  console.error("Server error:", error);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.statusCode ? error.message : "Internal server error.",
  });
};

module.exports = errorMiddleware;
