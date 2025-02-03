const mongoose = require('mongoose');

/**
 * Middleware to validate MongoDB ObjectId in request params.
 * @param {String} paramName - The name of the parameter to validate.
 */
function validateObjectId(paramName = 'id') {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
      return res.status(400).json({ message: `Invalid ${paramName} format` });
    }
    next();
  };
}

module.exports = validateObjectId;
