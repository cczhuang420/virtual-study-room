const queryValidator = (requiredFields) => {
  return (req, res, next) => {
    const invalidField = requiredFields.filter(
      field => !Object.keys(req.query).includes(field)
    )
    const errorMessage = `[${invalidField.join(", ")}] must be included in the query`
    if (invalidField.length === 0) {
      next()
    } else {
      res.status(400).json(errorMessage)
    }
  }
}

module.exports.queryValidator = queryValidator
