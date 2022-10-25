interface IResponseBody {
  success: boolean
  message: string
  code: number
}

/** 成功的响应 */
interface ISuccessBody<TData = any> extends IResponseBody {
  success: true
  data: TData
}

/** 出错的响应   */
interface IErrorBody<TData = void> extends IResponseBody {
  success: false
  data?: TData
}

/** 分页数据 */
interface IPaginated<TData = any> {
  total: number
  current: number
  list: TData[]
}

type ITimestamp = number

interface IModifyInfo {
  createTime: ITimestamp
  updateTime: ITimestamp
}

type IWithModify<T extends object> = T & IModifyInfo

type IWithId<T extends object> = T & { id: string }

type IWithClientId<T extends object> = T & { clientId: string }

type IEmpty<T extends object> = {
  [p: keyof T]: typeof T[p] | string
}
