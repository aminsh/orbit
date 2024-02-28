export type TableOptions<TData = any> = {
  total: number,
  data: TData[]
  pageSize: number,
  pageIndex: number,
  loading: boolean,
}
