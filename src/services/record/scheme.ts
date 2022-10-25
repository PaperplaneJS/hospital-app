export function createEmptyRecord(): IRawRecord {
  const now = new Date()

  const emptyRecord: IEmpty<IRawRecord> = {
    bedNumber: '',

    patientName: '',
    visitorName: '',
    relationship: '',
    idNumber: '',
    contactPhone: '',
    addressDetail: '',

    morningTemperature: '',
    afternoonTemperature: '',

    isSukangCodeOK: false,
    isXingchengCodeOK: false,
    isMijieCodeOK: false,
    isWuyiqujiechu: false,
    isWuzhengzhuang: false,
    isHesuanYinxing: false,
    isOutSuzhou: false,

    enterDate: now.valueOf(),
    hesuanDate: now.valueOf(),

    provinceId: '',
    cityId: '',
  }

  return emptyRecord as IRawRecord
}
