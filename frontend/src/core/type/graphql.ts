export interface MutationCreateRequestParameters<TDto> {
  dto: TDto
}

export interface MutationUpdateRequestParameters<TDto> {
  id: string
  dto: TDto
}


export interface MutationCreateResponse {
  id: string
}

export type QueryPageableResponse<TView, TKey extends string> = {
  [key in TKey]: {
    data: TView[]
    count: number
  }
}

export interface QueryPageableRequest<TExtraParameters = Object> {
  request: {
    take: number
    skip: number
  } & TExtraParameters
}
