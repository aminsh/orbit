import { Injectable, OnModuleInit } from '@nestjs/common'
import { SwaggerFactoryService } from './swagger-factory.service'
import { HttpAdapterHost } from '@nestjs/core'
import * as SwaggerUi from 'swagger-ui-express'
import { ApiConfigurationRepository } from '../repository/api-configuration.repository'
import * as express from 'express'
import { Router } from 'express'
import { ApiConfiguration } from '../schema/api-configuration'
import { DataModelQueryService } from '../../data/service/postgres/data-model-query.service'

type Request = express.Request & {
  apiConfiguration: ApiConfiguration
}
@Injectable()
export class RouteHandlerService implements OnModuleInit {
  constructor(
    private swaggerFactory: SwaggerFactoryService,
    private adaptorHost: HttpAdapterHost,
    private apiConfigurationRepository: ApiConfigurationRepository,
    private dataModelQueryService: DataModelQueryService
  ) {
  }

  onModuleInit() {
    this.handleAll()
  }

  handleAll() {
    const httpAdapter = this.adaptorHost.httpAdapter
    const app = httpAdapter.getInstance()

    const route = express.Router()

    this.handleDocs(route)
    this.handleGetAll(route)

    const resolveConfiguration = async (req: Request, res: express.Response, next: express.NextFunction) => {
      const prefix = req.params.prefix
      const config = await this.findEntityByPrefix(prefix)

      if(!config)
        return res.sendStatus(404)

      req.apiConfiguration = config
      next()
    }

    app.use('/api/:prefix', resolveConfiguration, route)
  }

  private handleDocs(route: Router) {
    route.use('/docs',SwaggerUi.serve, async (req: Request, res: express.Response, next: express.NextFunction) => {
      const swaggerDocuments = await this.swaggerFactory.create(req.apiConfiguration)
      SwaggerUi.setup(swaggerDocuments)(req, res, next)
    })
  }

  private handleGetAll(route: Router){
    route.get('/:name', async (req: Request, res: express.Response) => {
      const config: ApiConfiguration = req.apiConfiguration
      const result = await this.dataModelQueryService.find(config.dataModal._id, {
        offset: 0,
        limit: 10,
        order: [
          ['id', 'DESC'],
        ],
      })
      res.send(result)
    })
  }

  private findEntityByPrefix(prefix: string): Promise<ApiConfiguration> {
    return this.apiConfigurationRepository.findOne({
      prefix,
    }, {}, {
      populate: 'dataModal',
    })
  }
}