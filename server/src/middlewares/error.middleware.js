const ApiError = require('../utils/ApiError');
const { NODE_ENV } = require('../config/env');

/**
 * Central error-handling middleware.
 * Must be registered LAST, after all routes.
 */
function errorMiddleware(err, req, res, next) {
  // Known, operational errors (thrown deliberately via ApiError)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  // Prisma: unique constraint violation
  if (err.code === 'P2002') {
    const fields = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'field';
    return res.status(409).json({
      success: false,
      message: `A record with this ${fields} already exists`,
    });
  }

  // Prisma: record not found
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Requested record not found',
    });
  }

  // JSON body parsing errors
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON payload',
    });
  }

  // Fallback: unexpected/unknown errors
  console.error('Unexpected Error:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
}

module.exports = errorMiddleware;