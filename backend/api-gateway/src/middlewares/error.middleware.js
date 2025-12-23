export const errorHandler = (err, req, res, next) => {
  console.error("Gateway Error:", err.message);

  res.status(500).json({
    message: "Gateway error",
    error: err.message
  });
};
