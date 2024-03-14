import * as express from 'express'
import { RouteHandler } from './type'

const swaggerRouteHandler: RouteHandler = (req, res, next) => {

}

export const swaggerRoute = express.Router()

swaggerRoute.use('/docs', swaggerRouteHandler)

