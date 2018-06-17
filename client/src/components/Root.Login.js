import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  inputs: {
    width: '25vw',
    marginTop: '1vh'
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '3vh'
  },
  error: {
    color: 'red'
  },
  toggleButton: {
    marginLeft: '1vw',
    border: `2px solid ${theme.palette.secondary.main}`,
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  button: {
    cursor: 'pointer'
  }
})

const LoginDialog = ({
  open,
  loginMode,
  username,
  password,
  errorMessage,
  closeLoginDialog,
  toggleLoginMode,
  handleChange,
  handleLoginSignup,
  classes
}) => {
  return (
    <Dialog open={open} onClose={closeLoginDialog}>
      <DialogTitle disableTypography>
        {loginMode ? 'Login' : 'Signup'}
      </DialogTitle>
      <DialogContent>
        <TextField
          type="email"
          name="username"
          label="Email Address"
          onChange={handleChange}
          value={username}
          className={classes.inputs}
        />
        <br />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          value={password}
          className={classes.inputs}
        />
        <div className={classes.text}>
          <Typography variant="body2">
            {loginMode
              ? "Not a member of Anne's Crafts ?"
              : 'Already a member ?'}
          </Typography>
          <Button
            onClick={toggleLoginMode}
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.toggleButton}
          >
            {loginMode ? 'Signup' : 'Login'}
          </Button>
        </div>
        {errorMessage && (
          <div>
            <Typography className={classes.error}>{errorMessage}</Typography>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="raised"
          color="primary"
          onClick={handleLoginSignup}
          className={classes.button}
        >
          {loginMode ? 'Login' : 'Signup'}
        </Button>
        <Button
          variant="raised"
          onClick={closeLoginDialog}
          className={classes.button}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(LoginDialog)
