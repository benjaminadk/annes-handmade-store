import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  root: {
    marginTop: '3vh',
    marginBottom: '3vh',
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    marginBottom: '1vh'
  },
  addresses: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  list: {
    width: '25vw',
    border: '1px solid',
    padding: '1vw'
  }
})

const UserAddress = ({ ships, bills, openAddressDialog, classes }) => (
  <div className={classes.root}>
    <div className={classes.addresses}>
      <Typography variant="display1" className={classes.title}>
        Addresses
      </Typography>
      <Typography variant="body2" align="justify">
        You are able to edit or delete your saved Shipping and Billing
        Addresses. Click on either the edit or delete button that corresponds to
        the address you wish to alter.
      </Typography>
    </div>
    <div>
      <List className={classes.list}>
        <ListSubheader>Shipping Addresses</ListSubheader>
        <Divider />
        {ships &&
          ships.map(s => (
            <ListItem
              key={s.id}
              button
              onClick={() => openAddressDialog('ship', s)}
            >
              <ListItemText primary={s.title} />
              <ListItemSecondaryAction>
                <Tooltip title="edit" placement="top">
                  <IconButton onClick={() => openAddressDialog('ship', s)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="delete" placement="top">
                  <IconButton onClick={() => console.log('delete')}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        <ListSubheader>Billing Addresses</ListSubheader>
        <Divider />
        {bills &&
          bills.map(b => (
            <ListItem
              key={b.id}
              button
              onClick={() => openAddressDialog('bill', b)}
            >
              <ListItemText primary={b.title} />
              <ListItemSecondaryAction>
                <Tooltip title="edit" placement="top">
                  <IconButton onClick={() => openAddressDialog('bill', b)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="delete" placement="top">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  </div>
)

export default withStyles(styles)(UserAddress)
