import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular'
import {HttpLink} from 'apollo-angular/http'
import {NgModule} from '@angular/core'
import {ApolloClientOptions, ApolloLink, InMemoryCache} from '@apollo/client/core'
import {environment} from '../environments/environment'
import {HttpClientModule} from '@angular/common/http'
import {Token} from '../user/user.type'
import {setContext} from '@apollo/client/link/context'
import {AUTHENTICATION_TOKEN} from '../user/user.constant'

const uri = environment['graphql_root_url']

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const auth = setContext(() => {
    const tokenJson = localStorage.getItem(AUTHENTICATION_TOKEN)
    const token: Token = tokenJson ? JSON.parse(tokenJson) : null

    if (token === null)
      return {}

    return {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    }
  });

  return {
    link: ApolloLink.from([
      auth,
      httpLink.create({uri}),
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  };
}

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
