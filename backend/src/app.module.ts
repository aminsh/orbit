import { join } from 'path'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { VoidResolver } from 'graphql-scalars'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => ({ uri: configService.get('MONGO_URI') })
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: {
        Void: VoidResolver
      }
    }),
    SharedModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
