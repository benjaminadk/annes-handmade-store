import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'react-apollo'
import Button from '@material-ui/core/Button'

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
  },
  button: {
    display: 'flex',
    justifyContent: 'center'
  }
})

class Home extends Component {
  render() {
    const { addHomescreenButton, handleAddToHomescreen, classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.logoContainer}>
          <img
            src="https://di213806f07x5.cloudfront.net/logo-500x500.svg"
            alt="logo"
            className={classes.logo}
          />
        </div>
        <div className={classes.button}>
          {addHomescreenButton && (
            <Button
              variant="raised"
              color="primary"
              size="large"
              onClick={handleAddToHomescreen}
            >
              Add Anne's Handmade To Your Homescreen
            </Button>
          )}
        </div>
      </div>
    )
  }
}

export default compose(withStyles(styles))(Home)
