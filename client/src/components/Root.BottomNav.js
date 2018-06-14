import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HelpIcon from '@material-ui/icons/Help'
import PersonIcon from '@material-ui/icons/PersonPin'

const styles = theme => ({
  root: {},
  icon: {},
  nav: {}
})

const BottomNav = ({ value, handleBottomNav, classes }) => (
  <BottomNavigation
    value={value}
    onChange={handleBottomNav}
    showLabels
    classes={{
      root: classes.root
    }}
  >
    <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
    <BottomNavigationAction
      label="Catalog"
      value="/catalog"
      icon={<SearchIcon className={classes.icon} />}
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
    <BottomNavigationAction label="Help" value="/help" icon={<HelpIcon />} />
  </BottomNavigation>
)

export default withStyles(styles)(BottomNav)
