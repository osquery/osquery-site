import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import 'react-select/dist/react-select.css'

import './index.css'

import Router from 'Router'

ReactDOM.render(<Router />, document.getElementById('root'))
registerServiceWorker()
