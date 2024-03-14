import * as express from 'express'
import { RouteHandler } from './type'

export const crudRoute = express.Router()

const handleGet: RouteHandler = (req, res) => {

}

const handleGetOne: RouteHandler = (req, res) => {

}

const handleCreate: RouteHandler = (req, res) => {

}

const handleUpdate: RouteHandler = (req, res) => {

}

const handleDelete: RouteHandler = (req, res) => {

}

crudRoute.get('/', handleGet)
crudRoute.get('/:id', handleGetOne)
crudRoute.post('/', handleCreate)
crudRoute.put('/:id', handleUpdate)
crudRoute.delete('/:id', handleDelete)