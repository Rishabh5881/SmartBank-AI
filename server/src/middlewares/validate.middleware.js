const ApiError = require('../utils/ApiError');

/**
 * Generic request validation middleware powered by a Zod schema.
 * Expects the schema to validate an object shaped like:
 * { body, query, params }
 *
 * On success, it reassigns req.body/query/params with the
 * parsed (and possibly transformed, e.g. trimmed/lowercased) data.
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.slice(1).join('.') || issue.path.join('.'),
        message: issue.message,
      }));
      return next(ApiError.badRequest('Validation failed', details));
    }

    req.body = result.data.body ?? req.body;
    req.query = result.data.query ?? req.query;
    req.params = result.data.params ?? req.params;

    next();
  };
}

module.exports = validate;