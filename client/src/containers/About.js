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
        <div className={classes.images}>
          <img
            src="http://di213806f07x5.cloudfront.net/black-onyx-necklace-buddha-1"
            alt="cloudfront test"
            className={classes.image}
          />
          <img
            src="https://s3-us-west-1.amazonaws.com/shopping-site/images/black-onyx-necklace-buddha-1"
            alt="s3 test"
            className={classes.image}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(About)
