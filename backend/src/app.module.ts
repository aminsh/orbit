import {join} from 'path'
import {redisStore} from 'cache-manager-redis-store'
import {CacheModule, CacheModuleAsyncOptions, Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {UserModule} from './user/user.module'
import {GraphQLModule} from '@nestjs/graphql'
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {GraphQLJSON, VoidResolver} from 'graphql-scalars'
import {SharedModule} from './shared/shared.module'
import {DataModule} from './data/data.module'
import {EventEmitterModule} from '@nestjs/event-emitter'
import {ApiModule} from './api/api.module'
import {ShopModule} from './shop/shop.module'
import * as mongoose from 'mongoose'

mongoose.set('debug', true)

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: {
        Void: VoidResolver,
        JSON: GraphQLJSON,
      }
    }),
    EventEmitterModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: Number(configService.get('REDIS_PORT')),
          },
        })
        return {
          store: () => store,
        }
      },
      inject: [ConfigService],
    } as CacheModuleAsyncOptions),
    SharedModule,
    UserModule,
    DataModule,
    ApiModule,
    ShopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}


