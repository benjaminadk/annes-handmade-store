import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    marginTop: '10vh',
    marginBottom: '10vh',
    paddingLeft: '5vw',
    paddingRight: '5vw',
    minHeight: '60vh'
  },
  title: {
    marginBottom: '5vh'
  },
  content: {
    width: '50%'
  }
})

const Shipping = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="display2" className={classes.title}>
      Shipping Policy
    </Typography>
    <Typography variant="body2" align="justify" className={classes.content}>
      We offer free shipping to all our customers. At this time we only ship
      within the United States. All orders are shipped within 3 business days
      pending credit card verification. All items are shipped via USPS and
      enclosed in padded packaging.
    </Typography>
  </div>
)

export default withStyles(styles)(Shipping)
