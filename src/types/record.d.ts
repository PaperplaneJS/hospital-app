interface IRawRecord {
  bedNumber: number
  enterDate: ITimestamp
  patientName: string
  visitorName: string
  relationship: string
  idNumber: string
  contactPhone: string

  provinceId: string
  cityId: string
  addressDetail: string

  isSukangCodeOK: boolean
  isXingchengCodeOK: boolean
  isMijieCodeOK: boolean
  isWuyiqujiechu: boolean
  isWuzhengzhuang: boolean

  hesuanDate: ITimestamp
  isHesuanYinxing: boolean
  isOutSuzhou: boolean

  morningTemperature: number
  afternoonTemperature: number
}

interface IRecord extends ICommonInfo {}

interface IRecordWithId extends IRecord {
  id: string
}
