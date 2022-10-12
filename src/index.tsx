import React from 'react'
import ReactDOM from 'react-dom/client'

import RouterEntry from './router'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterEntry />
  </React.StrictMode>
)
