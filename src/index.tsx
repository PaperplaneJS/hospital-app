import zhCNDateFns from 'date-fns/locale/zh-CN'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { zhCN } from '@mui/material/locale'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider, zhCN as zhCNXDateLocal } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import '@/global/app.scss'
import '@/global/normalize.scss'

import RouterEntry from './router'

const theme = createTheme(zhCN)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={zhCNDateFns}
      localeText={zhCNXDateLocal.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <ThemeProvider theme={theme}>
        <RouterEntry />
      </ThemeProvider>
    </LocalizationProvider>
  </React.StrictMode>
)
