import { KeyboardEvent, useMemo, useState } from 'react'

import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers'

import { provincesAndCities, provinces } from '@/utils/ChinaDivision'

import './index.scss'

export default function Home(): RC {
  const [enterDate, setEnterDate] = useState(() => new Date())
  const [hesuanDate, setHesuanDate] = useState(() => new Date())
  const [provinceId, setProvinceId] = useState<string>('')
  const [cityId, setCityId] = useState<string>('')

  const currentProvince = useMemo(
    () => provincesAndCities.find(item => item.code === provinceId),
    [provinceId]
  )

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
              minRows={2}
              maxRows={3}
              multiline
              fullWidth
              required
            />
          ) : null}

          <FormGroup row>
            <FormControlLabel control={<Checkbox color="success" />} label="苏康码" />
            <FormControlLabel control={<Checkbox color="success" />} label="行程码" />
            <FormControlLabel control={<Checkbox color="success" />} label="密接码" />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              style={{ marginTop: '10px' }}
              control={<Checkbox color="success" />}
              label="无疫区接触史"
            />
            <FormControlLabel control={<Checkbox color="success" />} label="近期无咳嗽发热等症状" />
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
            <FormControlLabel control={<Checkbox color="success" />} label="核酸结果为阴性" />
            <FormControlLabel control={<Checkbox color="success" />} label="是苏州外市" />
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
              fullWidth
            />
          </Stack>

          <Button variant="contained" size="large">
            提交
          </Button>
        </Stack>
      </form>
    </Container>
  )
}
