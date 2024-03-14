import * as express from 'express'

export type Request = express.Request & {
  apiConfiguration: ApiConfiguration,
}

export type Response = express.Response
export type NextFunction = express.NextFunction

export type RouteHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>

export type ApiConfiguration = {}