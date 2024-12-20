import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store.js'
import { AppProvider } from './components/context.jsx'
import { Provider } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <App />
        <ToastContainer position="top-center" />
      </AppProvider>
    </Provider>
  </React.StrictMode>
)
