import { ThemeProvider } from 'styled-components'

import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'

import { GlobalStyles } from './styles/global'

import { Router } from './Router'
import { NavigationProvider } from './hooks/useNavigation'
import { TimerProvider } from './hooks/useTimer'

export function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <TimerProvider>
          <ThemeProvider theme={defaultTheme}>
            <Router />

            <GlobalStyles />
          </ThemeProvider>
        </TimerProvider>
      </NavigationProvider>
    </BrowserRouter>
  )
}
