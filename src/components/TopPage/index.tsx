import { AppBar, Toolbar, Typography } from '@material-ui/core'
import styled from 'styled-components'
import LoginButton from '../LoginButton'

const StyledAppBar = styled(AppBar)`
  @media (display-mode: standalone) {
    display: none;
  }
`

const TopPage = () => {
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar variant="dense">
          <Typography>WaiWai wiki</Typography>
          <div style={{ flexGrow: 1 }} />
          <div>
            <LoginButton />
          </div>
        </Toolbar>
      </StyledAppBar>
      <div style={{ margin: '8px' }}>waiwai wiki top</div>
    </>
  )
}

export default TopPage
