import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  images: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  image: {
    height: '40vw',
    width: '40vw'
  }
})

class About extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <h1>Testing Cloud Front</h1>
        <div className={classes.images} />
      </div>
    )
  }
}

export default withStyles(styles)(About)
