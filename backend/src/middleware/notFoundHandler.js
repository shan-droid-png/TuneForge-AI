/**
 * 404 Not Found Middleware
 * Handles requests that do not match any registered routes.
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Cannot ${req.method} ${req.originalUrl}`,
      statusCode: 404
    }
  });
};
