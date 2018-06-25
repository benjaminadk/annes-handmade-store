import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  message: {
    color: 'red',
    marginTop: '2vh'
  }
})

const CatalogDialog = ({ classes, open, message, closeDialog }) => (
  <Dialog open={open} onClose={closeDialog}>
    <DialogTitle disableTypography>Error</DialogTitle>
    <DialogContent>
      <Typography variant="body2" className={classes.message}>
        {message}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button variant="raised" color="primary" onClick={closeDialog}>
        OK
      </Button>
    </DialogActions>
  </Dialog>
)

export default withStyles(styles)(CatalogDialog)
