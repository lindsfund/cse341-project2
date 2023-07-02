const{ body, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        //userName can't be empty
        body('userName').notEmpty(),
        //password must be more than 6 charaters
        body('password').isLength({ min:6 }),
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }
  
  module.exports = {
    userValidationRules,
    validate,
  }