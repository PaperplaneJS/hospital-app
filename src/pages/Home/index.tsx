import { KeyboardEvent, useMemo, useState } from 'react'

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

import { postRecordApi } from '@/apis/record'
import { provincesAndCities, provinces } from '@/utils/chinaDivision'

import './index.scss'

/** 首页，用户填写提交表单使用 */
export default function Home(): RC {
  const [isLoading, setIsLoading] = useState(false)

  const [isNoticeShow, setIsNoticeShow] = useState(false)
  const [noticeText, setNoticeText] = useState('')
  const [noticeType, setNoticeType] = useState<'success' | 'error'>('success')

  const [bedNumber, setBedNumber] = useState('')
  const [patientName, setPatientName] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [morningTemperature, setMorningTemperature] = useState('')
  const [afternoonTemperature, setAfternoonTemperature] = useState('')

  const [isSukangCodeOK, setIsSukangCodeOK] = useState(false)
  const [isXingchengCodeOK, setIsXingchengCodeOK] = useState(false)
  const [isMijieCodeOK, setIsMijieCodeOK] = useState(false)
  const [isWuyiqujiechu, setIsWuyiqujiechu] = useState(false)
  const [isWuzhengzhuang, setIsWuzhengzhuang] = useState(false)
  const [isHesuanYinxing, setIsHesuanYinxing] = useState(false)
  const [isOutSuzhou, setIsOutSuzhou] = useState(false)

  const [enterDate, setEnterDate] = useState(() => new Date())
  const [hesuanDate, setHesuanDate] = useState(() => new Date())

  const [provinceId, setProvinceId] = useState('')
  const [cityId, setCityId] = useState('')

  const currentProvince = useMemo(
    () => provincesAndCities.find(item => item.code === provinceId),
    [provinceId]
  )

  const submitHandler = () => {
    setIsLoading(true)

    const submitData: IRawRecord = {
      bedNumber: Number(bedNumber),
      patientName,
      visitorName,
      relationship,
      idNumber,
      contactPhone,
      addressDetail,
      morningTemperature: Number(morningTemperature),
      afternoonTemperature: Number(afternoonTemperature),
      isSukangCodeOK,
      isXingchengCodeOK,
      isMijieCodeOK,
      isWuyiqujiechu,
      isWuzhengzhuang,
      isHesuanYinxing,
      isOutSuzhou,
      enterDate: enterDate.valueOf(),
      hesuanDate: hesuanDate.valueOf(),
      provinceId,
      cityId,
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
            value={bedNumber}
            onChange={e => void setBedNumber(e.target.value)}
            fullWidth
            required
          />

          <MobileDatePicker
            label="入院时间"
            inputFormat="yyyy年 M月 d日"
            value={enterDate}
            onChange={newDate => void setEnterDate(newDate!)}
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
            value={patientName}
            onChange={e => void setPatientName(e.target.value)}
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
            value={visitorName}
            onChange={e => void setVisitorName(e.target.value)}
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
            value={relationship}
            onChange={e => void setRelationship(e.target.value)}
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
            value={idNumber}
            onChange={e => void setIdNumber(e.target.value)}
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
            value={contactPhone}
            onChange={e => void setContactPhone(e.target.value)}
            fullWidth
            required
          />

          <FormControl fullWidth>
            <InputLabel id="home-province-picker">户籍地 省份</InputLabel>
            <Select
              labelId="home-province-picker"
              value={provinceId}
              label="户籍地 省份"
              onChange={e => void setProvinceId(e.target.value)}
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
                value={cityId}
                label="城市"
                placeholder="选择户籍地城市"
                onChange={e => void setCityId(e.target.value)}
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

          {cityId ? (
            <TextField
              id="home-form__7"
              label="详细地址"
              variant="outlined"
              inputProps={{
                enterKeyHint: 'done',
                onKeyDown: blurCurrent,
              }}
              value={addressDetail}
              onChange={e => void setAddressDetail(e.target.value)}
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
                  checked={isSukangCodeOK}
                  onChange={e => void setIsSukangCodeOK(e.target.checked)}
                />
              }
            />

            <FormControlLabel
              label="行程码"
              control={
                <Checkbox
                  color="success"
                  checked={isXingchengCodeOK}
                  onChange={e => void setIsXingchengCodeOK(e.target.checked)}
                />
              }
            />

            <FormControlLabel
              label="密接码"
              control={
                <Checkbox
                  color="success"
                  checked={isMijieCodeOK}
                  onChange={e => void setIsMijieCodeOK(e.target.checked)}
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
                  checked={isWuyiqujiechu}
                  onChange={e => void setIsWuyiqujiechu(e.target.checked)}
                />
              }
              style={{ marginTop: '10px' }}
            />

            <FormControlLabel
              label="近期无咳嗽发热等症状"
              control={
                <Checkbox
                  color="success"
                  checked={isWuzhengzhuang}
                  onChange={e => void setIsWuzhengzhuang(e.target.checked)}
                />
              }
            />
          </FormGroup>

          <MobileDatePicker
            label="核酸检测日期 (24小时内)"
            inputFormat="yyyy年 M月 d日"
            value={hesuanDate}
            onChange={newDate => void setHesuanDate(newDate!)}
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
                  checked={isHesuanYinxing}
                  onChange={e => void setIsHesuanYinxing(e.target.checked)}
                />
              }
            />

            <FormControlLabel
              label="是苏州外市"
              control={
                <Checkbox
                  color="success"
                  checked={isOutSuzhou}
                  onChange={e => void setIsOutSuzhou(e.target.checked)}
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
              value={morningTemperature}
              onChange={e => void setMorningTemperature(e.target.value)}
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
              value={afternoonTemperature}
              onChange={e => void setAfternoonTemperature(e.target.value)}
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
