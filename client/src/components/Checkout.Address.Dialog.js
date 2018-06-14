import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import names from 'datasets-us-states-names'

const styles = theme => ({
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white'
  },
  content: {
    overflowX: 'hidden',
    marginTop: '2vh'
  },
  splitInputs: {
    display: 'flex',
    width: '40vw',
    marginBottom: '2.5vh'
  },
  titleInput: {
    width: '19.5vw',
    marginRight: '1vw'
  },
  emailInput: {
    width: '19.5vw'
  },
  firstInput: {
    width: '19.5vw',
    marginRight: '1vw'
  },
  lastInput: {
    width: '19.5vw'
  },
  cityInput: {
    width: '18vw'
  },
  stateInput: {
    width: '12vw',
    marginLeft: '1vw',
    marginRight: '1vw'
  },
  zipInput: {
    width: '8vw'
  },
  inputs: {
    width: '40vw',
    marginBottom: '2.5vh'
  },
  required: {
    color: 'red',
    marginRight: '20vw'
  }
})

const AddressDialog = ({
  open,
  handleChange,
  closeAddressDialog,
  saveAddress,
  addressType,
  title,
  email,
  firstName,
  lastName,
  street1,
  street2,
  city,
  state,
  zip,
  notes,
  classes
}) => {
  return (
    <Dialog open={open} onClose={closeAddressDialog}>
      <DialogTitle disableTypography className={classes.title}>
        {addressType === 'ship' ? 'Shipping' : 'Billing'} Address
      </DialogTitle>
      <DialogContent className={classes.content}>
        <div className={classes.splitInputs}>
          <TextField
            name="title"
            label="Title"
            onChange={handleChange}
            value={title}
            helperText="Home, Work, School, etc"
            required
            className={classes.titleInput}
          />
          <TextField
            type="email"
            name="email"
            label="Email Address"
            onChange={handleChange}
            value={email}
            helperText="Email to confirm and track order only"
            required
            className={classes.emailInput}
          />
        </div>
        <div className={classes.splitInputs}>
          <TextField
            name="firstName"
            label="First Name"
            onChange={handleChange}
            value={firstName}
            required
            className={classes.firstInput}
          />
          <TextField
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            value={lastName}
            required
            className={classes.lastInput}
          />
        </div>
        <TextField
          name="street1"
          label="Address Line One"
          onChange={handleChange}
          value={street1}
          helperText="Street Address"
          required
          className={classes.inputs}
        />
        <br />
        <TextField
          name="street2"
          label="Address Line Two (optional)"
          onChange={handleChange}
          value={street2}
          helperText="Apartment, Suite, Unit, Floor, Etc"
          className={classes.inputs}
        />
        <div className={classes.splitInputs}>
          <TextField
            name="city"
            label="City"
            onChange={handleChange}
            value={city}
            required
            className={classes.cityInput}
          />
          <FormControl className={classes.stateInput}>
            <InputLabel>State *</InputLabel>
            <Select
              input={<Input name="state" />}
              onChange={handleChange}
              value={state}
            >
              {names.map((n, i) => (
                <MenuItem key={`state-${i}`} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="zip"
            label="Zip Code"
            onChange={handleChange}
            value={zip}
            required
            className={classes.zipInput}
          />
        </div>
        {addressType === 'ship' && (
          <TextField
            name="notes"
            label="Delivery Notes (optional)"
            onChange={handleChange}
            value={notes}
            multiline={true}
            rows={3}
            rowsMax={3}
            helperText="Any special instructions for delivery drivers"
            className={classes.inputs}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Typography variant="body2" className={classes.required}>
          * required field
        </Typography>
        <Button variant="raised" onClick={closeAddressDialog}>
          Cancel
        </Button>
        <Button
          variant="raised"
          color="primary"
          disabled={
            !title ||
            !email ||
            !firstName ||
            !lastName ||
            !street1 ||
            !city ||
            !state ||
            !zip
          }
          onClick={saveAddress}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(AddressDialog)
