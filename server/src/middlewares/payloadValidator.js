const payloadValidator = (requiredFields) => {
  return (req, res, next) => {
    const invalidField = requiredFields.filter(
      field => !Object.keys(req.body).includes(field)
    )
    const errorMessage = `[${invalidField.join(", ")}] must be included in the payload`
    if (invalidField.length === 0) {
      next()
    } else {
      res.status(400).json(errorMessage)
    }
  }
}

module.exports.payloadValidator = payloadValidator
