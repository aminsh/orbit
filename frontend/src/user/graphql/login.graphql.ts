import {gql} from 'apollo-angular'

export const USER_LOGIN_REQUEST = gql`
  mutation UserLoginRequest($dto: LoginDTO!) {
    userLogin(dto: $dto) {
      access_token
      token_type
    }
  }
`

export const GET_AUTHENTICATED_USER = gql`
  query GetUserAuthenticatedUser {
    userAuthenticated {
      id
      name
      email
    }
  }
`

export interface LoginDTOVariable {
  dto: {
    email: string
    password: string
  }
}
