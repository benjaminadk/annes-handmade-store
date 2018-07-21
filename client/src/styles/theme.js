import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  palette: {
    primary: {
      main: '#6a936f'
    },
    secondary: {
      main: '#ae7bc4'
    }
  },
  overrides: {
    MuiDialogTitle: {
      root: {
        backgroundColor: '#6a936f',
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 25
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#6a936f',
        color: 'white'
      }
    }
  }
})
