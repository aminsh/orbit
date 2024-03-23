import * as path from 'path'
import { Global, Module } from '@nestjs/common'
import { RequestContext } from './service/request-context'
import { MulterModule } from '@nestjs/platform-express'
import { FILES_ROOT_NAME } from './shared.contacts'
import { FileService } from './service/file.service'
import { FileRepository } from './repository/file.repository'
import { FileController } from './controller/file.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { File, FileSchema } from './schema/file'
import {SearchService} from './service/search.service'
import {ElasticsearchModule} from '@nestjs/elasticsearch'
import {ConfigService} from '@nestjs/config'

@Global()
@Module({
  imports: [
    MulterModule.register({
      dest: path.join(process.cwd(), FILES_ROOT_NAME)
    }),
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema }
    ]),
    ElasticsearchModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        node: configService.get('ELASTIC_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    RequestContext,
    FileService,
    FileRepository,
    SearchService,
  ],
  controllers: [
    FileController
  ],
  exports: [
    RequestContext,
    FileRepository,
    SearchService,
  ]
})
export class SharedModule {
}
