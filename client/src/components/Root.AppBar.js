import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import Tooltip from '@material-ui/core/Tooltip'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const styles = theme => ({
  anne: {
    flex: 1,
    textDecoration: 'none',
    color: 'black'
  },
  logo: {
    backgroundImage:
      'url(https://s3-us-west-1.amazonaws.com/shopping-site/assets/logo-200x200.jpeg)',
    backgroundSize: 'contain',
    height: '50px',
    width: '50px',
    marginRight: '20px',
    marginLeft: '5px'
  },
  toolRight: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: 'lightgrey',
    border: '2px solid white',
    marginRight: '2vw',
    marginLeft: '2vw'
  },
  loginButton: {
    marginRight: '2vw'
  },
  title: {
    color: 'white'
  },
  cartIcon: {
    transform: 'scale(1.25)',
    padding: `0 ${theme.spacing.unit * 0.75}px`
  }
})

const RootAppBar = ({
  handleCartClick,
  handleLoginClick,
  handleBottomNav,
  cartSize,
  avatar,
  loggedIn,
  classes
}) => (
  <AppBar position="sticky" style={{ zIndex: 100 }}>
    <Toolbar disableGutters>
      <Link to="/">
        <div
          onClick={() => handleBottomNav(null, '/')}
          className={classes.logo}
        />
      </Link>
      <Link
        to="/catalog"
        className={classes.anne}
        onClick={() => handleBottomNav(null, '/catalog')}
      >
        <Typography variant="headline" className={classes.title}>
          Anne's Handmade
        </Typography>
      </Link>
      <div className={classes.toolRight}>
        <Tooltip title="Click to view Cart" enterDelay={500}>
          <IconButton onClick={handleCartClick} color="inherit">
            <Badge badgeContent={cartSize}>
              <ShoppingCartIcon className={classes.cartIcon} />
            </Badge>
          </IconButton>
        </Tooltip>
        {loggedIn && (
          <Tooltip title="User Profile" enterDelay={500}>
            <Link to={`/user/${localStorage.getItem('USER_ID')}`}>
              <Avatar className={classes.avatar} src={avatar || null} />
            </Link>
          </Tooltip>
        )}
        <Button
          variant="flat"
          color="inherit"
          onClick={handleLoginClick}
          size="small"
          className={classes.loginButton}
        >
          {loggedIn ? 'Logout' : 'Login'}
        </Button>
      </div>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(RootAppBar)
