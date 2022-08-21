import { CssBaseline, ThemeProvider } from '@mui/material'
import { withConsole } from '@storybook/addon-console'
import { GlobalStyle, theme } from '../src/utils/theme'

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <CssBaseline />
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
  (storyFn, context) => withConsole()(storyFn)(context),
]
