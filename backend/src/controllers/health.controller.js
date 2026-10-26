/**
 * Health check controller.
 * Returns the current API service status.
 */
export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "TuneForge AI API is running",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};
