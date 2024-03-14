import * as express from 'express'
import { swaggerRoute } from './swagger-config'
import { crudRoute } from './crud-route'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import consoleStamp from 'console-stamp'

consoleStamp(console)

const app = express()

app.use(cors())
app.use(bodyParser.json({type: 'application/json'}))

app.use('/api/:prefix', swaggerRoute)
app.use('/api/:prefix/:model', crudRoute)

app.listen(process.env.PORT, () => console.log('api server is running'))