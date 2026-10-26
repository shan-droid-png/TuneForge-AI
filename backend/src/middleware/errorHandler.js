import { logger } from '../utils/logger.js';

/**
 * Centralized error-handling middleware.
 * Formats operational and unexpected errors consistently across the API.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, err.stack);

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      statusCode,
      ...(isProduction ? {} : { stack: err.stack })
    }
  });
};
