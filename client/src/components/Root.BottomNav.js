import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PersonIcon from '@material-ui/icons/PersonPin'

const styles = theme => ({
  root: {
    marginBottom: '5vh'
  }
})

const BottomNav = ({ value, handleBottomNav, classes }) => (
  <BottomNavigation
    value={value}
    onChange={handleBottomNav}
    showLabels
    className={classes.root}
  >
    <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
    <BottomNavigationAction
      label="Catalog"
      value="/catalog"
      icon={<SearchIcon />}
    />
    <BottomNavigationAction
      label="Checkout"
      value="/checkout"
      className={classes.nav}
      icon={<ShoppingCartIcon />}
    />
    <BottomNavigationAction
      label="About"
      value="/about"
      icon={<PersonIcon />}
    />
  </BottomNavigation>
)

export default withStyles(styles)(BottomNav)
