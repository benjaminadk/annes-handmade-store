import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import orange from '@material-ui/core/colors/orange'

const styles = theme => ({
  inputs: {
    width: '30vw',
    marginTop: '1vh'
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '3vh'
  },
  errorContainer: {
    marginTop: '3vh',
    maxHeight: '5vh',
    height: '5vh'
  },
  error: {
    color: 'red',
    width: '25vw',
    textAlign: 'center'
  },
  toggleButton: {
    marginLeft: '1vw',
    border: `2px solid ${orange[500]}`,
    color: orange[500],
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: orange[100]
    }
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
  passwordError,
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
          helperText={!loginMode && 'Must be valid email'}
        />
        <br />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          value={password}
          className={classes.inputs}
          helperText={
            !loginMode &&
            'Must be 8 characters & contain 1 uppercase, 1 lowercase & 1 number'
          }
          error={passwordError}
        />
        <div className={classes.errorContainer}>
          {errorMessage && (
            <Typography className={classes.error}>{errorMessage}</Typography>
          )}
        </div>
        <div className={classes.text}>
          <Typography variant="body2">
            {loginMode
              ? "Not a member of Anne's Crafts ?"
              : 'Already a member ?'}
          </Typography>
          <Button
            onClick={toggleLoginMode}
            variant="outlined"
            size="small"
            className={classes.toggleButton}
          >
            {loginMode ? 'Signup' : 'Login'}
          </Button>
        </div>
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
