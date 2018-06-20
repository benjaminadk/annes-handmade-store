import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    height: '10vh',
    backgroundColor: theme.palette.primary.main
  },
  container: {
    height: '10vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  link: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    color: 'white',
    textDecoration: 'none'
  }
})

const Footer = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.container}>
      <Link to="/privacy" className={classes.link}>
        Privacy Policy
      </Link>
      <Link to="/shipping" className={classes.link}>
        Shipping
      </Link>
      <a
        href="mailto:annelikesbeads@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        Contact Us
      </a>
      <div>
        <a
          href="https://www.facebook.com/Annes-Handmade-2103949726516793"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://di213806f07x5.cloudfront.net/fb-con-50x50.svg"
            alt="facebook link"
          />
        </a>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(Footer)
