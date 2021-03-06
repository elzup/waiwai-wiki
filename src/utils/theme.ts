import { createMuiTheme } from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
`

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3E3E3E',
    },
    secondary: orange,
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiButton: {
      variant: 'contained',
    },
  },
})
