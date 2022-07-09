import { defaultTheme } from './../styles/themes/default'

import 'styled-components'

type defaultThemeTypes = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends defaultThemeTypes {}
}
