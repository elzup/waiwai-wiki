import { ThemeProvider, CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import createEmotionCache from '../utils/createEmotionCache'
import { GlobalStyle, theme } from '../utils/theme'

const clientSideEmotionCache = createEmotionCache()

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache?: EmotionCache }) => (
  <CacheProvider value={emotionCache}>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="shortcut icon" href="/images/icon.png" />
      <link
        rel="icon"
        type="image/png"
        href="/images/icon-4x.png"
        sizes="192x192"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* @ts-ignore */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap"
        rel="stylesheet"
      />

      <link rel="manifest" href="/manifest.json" />
      <link href="https://unpkg.com/sanitize.css/forms.css" rel="stylesheet" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
)

export default App
