import { LoadingButton } from '@mui/lab'
import {
  Alert,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'
import { KeyboardEvent, useCallback, useMemo, useState } from 'react'

import { postRecordApi } from '@/apis/record'
import { createEmptyRecord } from '@/services/record'
import { provincesAndCities, provinces } from '@/utils/chinaDivision'
import { ensureClientId } from '@/utils/clientId'

import './index.scss'

/** 首页，用户填写提交表单使用 */
export default function Home(): RC {
  const [isLoading, setIsLoading] = useState(false)

  const [isNoticeShow, setIsNoticeShow] = useState(false)
  const [noticeText, setNoticeText] = useState('')
  const [noticeType, setNoticeType] = useState<'success' | 'error'>('success')

  const [recordData, setRecordData] = useState(() => createEmptyRecord())
  const mergeRecordData = useCallback(
    (field: string, value: any) => void setRecordData(rawData => ({ ...rawData, [field]: value })),
    []
  )

  const currentProvince = useMemo(
    () => provincesAndCities.find(item => item.code === recordData.provinceId),
    [recordData.provinceId]
  )

  const submitHandler = () => {
    setIsLoading(true)

    const submitData: IWithClientId<IRawRecord> = {
      ...recordData,
      clientId: ensureClientId(),

      bedNumber: Number(recordData.bedNumber),

      morningTemperature: Number(recordData.morningTemperature),
      afternoonTemperature: Number(recordData.afternoonTemperature),
      enterDate: recordData.enterDate.valueOf(),
      hesuanDate: recordData.hesuanDate.valueOf(),
    }

    postRecordApi(submitData)
      .then(res => {
        setNoticeText(res.result)
        setNoticeType('success')
      })
      .catch(error => {
        setNoticeText(error.message)
        setNoticeType('error')
      })
      .finally(() => {
        setIsNoticeShow(true)
        setIsLoading(false)
      })
  }

  const focusNext = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return
    }

    const currentElementId = (e.target as HTMLElement).id
    const idIndex = 1 + (Number(currentElementId.split('__')[1]) || 0)

    ;(document.querySelector('#home-form__' + idIndex) as HTMLElement).focus()
  }

  const blurCurrent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLElement).blur()
    }
  }

  return (
    <Container className="home-page" maxWidth="sm">
      <form onSubmit={() => false}>
        <Stack spacing={4}>
          <div className="home-page__title">陪护及探视人员登记</div>

          <TextField
            id="home-form__1"
            label="床号"
            variant="outlined"
            type="number"
            inputProps={{
              enterKeyHint: 'done',
              onKeyDown: blurCurrent,
            }}
            value={recordData.bedNumber}
            onChange={e => void mergeRecordData('bedNumber', e.target.value)}
            fullWidth
            required
          />

          <MobileDatePicker
            label="入院时间"
            inputFormat="yyyy年 M月 d日"
            value={recordData.enterDate}
            onChange={newDate => void mergeRecordData('enterDate', newDate)}
            renderInput={params => <TextField {...params} />}
            showToolbar={false}
            views={['year', 'month', 'day']}
            openTo="month"
            components={{
              ActionBar: () => <div style={{ height: '15px' }}> </div>,
            }}
            closeOnSelect
          />

          <TextField
            id="home-form__2"
            label="患者姓名"
            variant="outlined"
            inputProps={{
              enterKeyHint: 'next',
              onKeyDown: focusNext,
            }}
            value={recordData.patientName}
            onChange={e => void mergeRecordData('patientName', e.target.value)}
            fullWidth
            required
          />

          <TextField
            id="home-form__3"
            label="陪护/探视者姓名"
            variant="outlined"
            inputProps={{
              enterKeyHint: 'next',
              onKeyDown: focusNext,
            }}
            value={recordData.visitorName}
            onChange={e => void mergeRecordData('visitorName', e.target.value)}
            fullWidth
            required
          />

          <TextField
            id="home-form__4"
            label="关系"
            variant="outlined"
            inputProps={{
              enterKeyHint: 'next',
              onKeyDown: focusNext,
            }}
            value={recordData.relationship}
            onChange={e => void mergeRecordData('relationship', e.target.value)}
            fullWidth
            required
          />

          <TextField
            id="home-form__5"
            label="身份证号码"
            variant="outlined"
            inputProps={{
              maxLength: 18,
              enterKeyHint: 'next',
              onKeyDown: focusNext,
            }}
            value={recordData.idNumber}
            onChange={e => void mergeRecordData('idNumber', e.target.value)}
            fullWidth
            required
          />

          <TextField
            id="home-form__6"
            label="联系电话"
            variant="outlined"
            type="tel"
            inputProps={{
              maxLength: 11,
              enterKeyHint: 'done',
              onKeyDown: blurCurrent,
            }}
            value={recordData.contactPhone}
            onChange={e => void mergeRecordData('contactPhone', e.target.value)}
            fullWidth
            required
          />

          <FormControl fullWidth>
            <InputLabel id="home-province-picker">户籍地 省份</InputLabel>
            <Select
              labelId="home-province-picker"
              value={recordData.provinceId}
              label="户籍地 省份"
              onChange={e => void mergeRecordData('provinceId', e.target.value)}
              required
            >
              {provinces.map(province => (
                <MenuItem key={province.code} value={province.code}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {currentProvince ? (
            <FormControl fullWidth>
              <InputLabel id="home-city-picker">城市</InputLabel>
              <Select
                labelId="home-city-picker"
                value={recordData.cityId}
                label="城市"
                placeholder="选择户籍地城市"
                onChange={e => void mergeRecordData('cityId', e.target.value)}
                required
              >
                {currentProvince.children.map(city => (
                  <MenuItem key={city.code} value={city.code}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}

          {recordData.cityId ? (
            <TextField
              id="home-form__7"
              label="详细地址"
              variant="outlined"
              inputProps={{
                enterKeyHint: 'done',
                onKeyDown: blurCurrent,
              }}
              value={recordData.addressDetail}
              onChange={e => void mergeRecordData('addressDetail', e.target.value)}
              minRows={2}
              maxRows={3}
              multiline
              fullWidth
              required
            />
          ) : null}

          <FormGroup row>
            <FormControlLabel
              label="苏康码"
              control={
                <Checkbox
                  color="success"
                  checked={recordData.isSukangCodeOK}
                  onChange={e => void mergeRecordData('isSukangCodeOK', e.target.checked)}
                />
              }
            />

            <FormControlLabel
              label="行程码"
              control={
                <Checkbox
                  color="success"
                  checked={recordData.isXingchengCodeOK}
                  onChange={e => void mergeRecordData('isXingchengCodeOK', e.target.checked)}
                />
              }
            />

            <FormControlLabel
              label="密接码"
              control={
                <Checkbox
                  color="success"
                  checked={recordData.isMijieCodeOK}
                  onChange={e => void mergeRecordData('isMijieCodeOK', e.target.checked)}
                />
              }
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              label="无疫区接触史"
              control={
                <Checkbox
                  color="success"
                  checked={recordData.isWuyiqujiechu}
                  onChange={e => void mergeRecordData('isWuyiqujiechu', e.target.checked)}
                />
              }
              style={{ marginTop: '10px' }}
            />

            <FormControlLabel
              label="近期无咳嗽发热等症状"
              control={
                <Checkbox
                  color="success"
                  checked={recordData.isWuzhengzhuang}
                  onChange={e => void mergeRecordData('isWuzhengzhuang', e.target.checked)}
                />
              }
            />
          </FormGroup>

          <MobileDatePicker
            label="核酸检测日期 (24小时内)"
            inputFormat="yyyy年 M月 d日"
            value={recordData.hesuanDate}
            onChange={newDate => void mergeRecordData('hesuanDate', newDate)}
            renderInput={params => <TextField {...params} />}
            showToolbar={false}
            views={['year', 'month', 'day']}
            openTo="day"
            components={{
              ActionBar: () => <div style={{ height: '15px' }}> </div>,
            }}
            closeOnSelect
          />

          <FormGroup>
            <FormControlLabel
              label="核酸结果为阴性"
              control={
                <Checkbox
                  color="success"
                  checked={recordData.isHesuanYinxing}
                  onChange={e => void mergeRecordData('isHesuanYinxing', e.target.checked)}
                />
              }
            />

            <FormControlLabel
              label="是苏州外市"
              control={
                <Checkbox
                  color="success"
                  checked={recordData.isOutSuzhou}
                  onChange={e => void mergeRecordData('isOutSuzhou', e.target.checked)}
                />
              }
            />
          </FormGroup>

          <Stack direction="row" spacing={2}>
            <TextField
              id="home-form__8"
              label="上午体温"
              variant="outlined"
              type="number"
              inputProps={{
                enterKeyHint: 'next',
                onKeyDown: focusNext,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">℃</InputAdornment>,
              }}
              value={recordData.morningTemperature}
              onChange={e => void mergeRecordData('morningTemperature', e.target.value)}
              fullWidth
            />

            <TextField
              id="home-form__9"
              label="下午体温"
              variant="outlined"
              type="number"
              inputProps={{
                enterKeyHint: 'done',
                onKeyDown: blurCurrent,
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">℃</InputAdornment>,
              }}
              value={recordData.afternoonTemperature}
              onChange={e => void mergeRecordData('afternoonTemperature', e.target.value)}
              fullWidth
            />
          </Stack>

          <LoadingButton
            onClick={submitHandler}
            loading={isLoading}
            variant="contained"
            size="large"
          >
            提交
          </LoadingButton>
        </Stack>
      </form>

      <Snackbar
        open={isNoticeShow}
        autoHideDuration={2000}
        onClose={() => void setIsNoticeShow(false)}
      >
        <Alert severity={noticeType} sx={{ width: '100%' }}>
          {noticeText}
        </Alert>
      </Snackbar>
    </Container>
  )
}
