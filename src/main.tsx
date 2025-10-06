import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ReduxThemeProvider } from './components/ReduxThemeProvider'
import { store } from './store'
import Router from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ReduxThemeProvider>
        <Router />
      </ReduxThemeProvider>
    </Provider>
  </StrictMode>,
)
