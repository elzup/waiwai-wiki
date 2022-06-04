import { AppBar, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { GITHUB_LINK, TWITTER_LINK } from '../config'
import LoginButton from './LoginButton'

const StyledAppBar = styled(AppBar)`
  @media (display-mode: standalone) {
    display: none;
  }
`

type Props = { title: string }

export const Layout = ({ children, title }: PropsWithChildren<Props>) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <StyledAppBar position="static">
      <Toolbar variant="dense">
        <Typography>Waiwai wiki</Typography>
        <div style={{ flexGrow: 1 }} />
        <div>
          <LoginButton />
        </div>
      </Toolbar>
    </StyledAppBar>
    <Main>{children}</Main>
    <Footer>
      <div className="links">
        <div>
          <a href={GITHUB_LINK}>GitHub</a>
        </div>
        <div className="author">
          Made by <a href={TWITTER_LINK}>@anozon</a>
        </div>
      </div>
    </Footer>
  </div>
)
const Main = styled.div`
  min-height: calc(100vh - 80px);
`

const Footer = styled.footer`
  height: 60px;
  bottom: 0;
  padding: 20px 40px 0;
  box-sizing: border-box;
  border-top: solid 1px;
  .links {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`
