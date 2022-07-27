const { CustomAPIError } = require('../errors/custom-error')


errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    console.log(err)
    return res.status(500).json({ message: `something went wrong try again` })
}


module.exports = errorHandlerMiddleware