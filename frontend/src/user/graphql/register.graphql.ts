import {gql} from 'apollo-angular'

export const USER_REGISTER_REQUEST = gql`
  mutation UserRegisterRequest($dto: RegisterDTO!) {
    userRegister(dto: $dto) {
      id
    }
  }
`

export interface RegisterDTOVariable {
  dto: {
    name: string
    email: string
    password: string
  }
}

export interface RegisterResponse {
  userRegister: {
    id: string
  }
}


