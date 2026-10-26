import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === "production";

  const errorCode =
    err.errorCode ||
    (statusCode >= 500 ? "INTERNAL_SERVER_ERROR" : "REQUEST_ERROR");

  const message =
    isProduction && statusCode >= 500
      ? "An unexpected error occurred."
      : err.message || "Internal Server Error";

  logger.error(
    `${req.method} ${req.originalUrl} - ${err.message}`,
    err.stack
  );

  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(err.details ? { details: err.details } : {}),
      statusCode,
      ...(isProduction ? {} : { stack: err.stack }),
    },
  });
};