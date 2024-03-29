import cors from 'cors'
import express from "express";
import helmet from "helmet";
import morgan from 'morgan'

//Config stuffs
const allowedRequestOrigins = '*'
const allowedRequestMethods = ['GET', 'POST', 'PUT', 'DELETE']

const cors_options = {
    origin: allowedRequestOrigins,
    methods: allowedRequestMethods
}

// Create Middleware Bunny

const bunnyMiddlewareFunction= (req,res, next) => {
    console.log('Middleware function is running and printing "Bunny" to console')
    next()
}



const apply = (app)=>{
    app.use(helmet())
    app.use(cors(cors_options))
    app.use(express.json())
    app.use(bunnyMiddlewareFunction)
    app.use(morgan('common'))

}

const notFound = (req, res, next) => {
    const error = new  Error(`Sorry !! Not found "${req.originalUrl}"!`)
    res.status(404)
    next(error)
}

const wrongPath = (app) => {
    app.use(notFound)
}

const errorHandler = (error, req,res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        statusCode: statusCode,
        message: error.message,
        stackTrace: error.stack
    })
    next()
}

const errorHandling = (app) => {
    app.use(errorHandler)
}

export default {
    apply,
    wrongPath,
    errorHandling
}