import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'react-apollo'

const styles = theme => ({
  root: {
    minHeight: '80vh',
    [theme.breakpoints.down('sm')]: {
      minHeight: '10vh'
    }
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1vh'
  },
  logo: {
    width: '35vw',
    height: '35vw',
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
      height: '80vw'
    }
  }
})

class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.logoContainer}>
          <img
            src="https://s3-us-west-1.amazonaws.com/shopping-site/assets/logo-500x500.svg"
            alt="logo"
            className={classes.logo}
          />
        </div>
      </div>
    )
  }
}

export default compose(withStyles(styles))(Home)
