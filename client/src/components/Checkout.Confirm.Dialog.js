import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  content: {
    fontFamily: 'Roboto',
    marginTop: '2vh'
  }
})

const CheckoutConfirmDialog = ({ open, onClose, toRemove, classes }) => (
  <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
    <DialogTitle disableTypography>Remove From Cart ?</DialogTitle>
    <DialogContent
      className={classes.content}
    >{`Remove ${toRemove} from your Cart ?`}</DialogContent>
    <DialogActions>
      <Button variant="raised" color="primary" onClick={() => onClose(true)}>
        Ok
      </Button>
      <Button variant="raised" onClick={() => onClose(false)}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
)

export default withStyles(styles)(CheckoutConfirmDialog)
