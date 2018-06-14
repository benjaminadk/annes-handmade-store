import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#384aa5'
    },
    secondary: {
      main: '#768aed'
    }
  },
  overrides: {
    MuiDialogTitle: {
      root: {
        backgroundColor: '#384aa5',
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 25,
        fontWeight: 'bold'
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#384aa5',
        color: 'white'
      }
    }
  }
})
