module.exports = errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === "CastError"){
        response.status(400).send({
            error: "malformated id"
        })
    }
    if (error.name === "ValidationError"){
        response.status(400).json({error: error.message})
    }

    next(error)
}
