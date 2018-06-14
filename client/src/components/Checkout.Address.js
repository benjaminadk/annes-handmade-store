import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Checkbox from '@material-ui/core/Checkbox'
import NextIcon from '@material-ui/icons/ArrowForward'
import PrevIcon from '@material-ui/icons/ArrowBack'

const styles = theme => ({
  header: {
    marginTop: '5vh'
  },
  root: {
    marginLeft: '5vw',
    marginRight: '5vw',
    display: 'grid',
    gridTemplateColumns: '70% 30%'
  },
  buttons: {
    marginTop: '3vh',
    display: 'flex',
    flexDirection: 'column'
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '5vh'
  },
  card: {
    width: '25vw',
    marginRight: '2.5vw',
    marginBottom: '2.5vw',
    cursor: 'pointer'
  },
  cardTitle: {
    marginLeft: '2vw'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  noAddress: {
    marginTop: '5vh'
  },
  noAddressButton: {
    width: '20vw',
    marginLeft: '40vw',
    marginTop: '5vh'
  }
})

const Address = ({
  openAddressDialog,
  ships,
  shipsIndex,
  selectShippingAddress,
  selectShippingAddress2,
  handleIndex,
  backIndex,
  classes
}) => {
  const hasAddress = ships.length > 0
  if (hasAddress) {
    return (
      <div>
        <Typography
          variant="display1"
          align="center"
          className={classes.header}
        >
          Choose a Shipping Address
        </Typography>
        <Typography variant="body2" align="center">
          Check existing address, or click button to create a new address
        </Typography>
        <div className={classes.root}>
          <div className={classes.cardContainer}>
            {ships &&
              ships.map((s, i) => (
                <Card
                  key={`shipping-address-${i}`}
                  className={classes.card}
                  raised
                  style={
                    shipsIndex === i ? { border: '3px solid #3f51b5' } : null
                  }
                  onClick={() => selectShippingAddress2(i)}
                >
                  <div className={classes.cardHeader}>
                    <Typography variant="title" className={classes.cardTitle}>
                      {s.title}
                    </Typography>
                    <Checkbox
                      checked={shipsIndex === i}
                      value={i.toString()}
                      onChange={selectShippingAddress}
                    />
                  </div>
                  <CardContent>
                    <Typography variant="body2">
                      {s.firstName} {s.lastName}
                    </Typography>
                    <Typography variant="body2">{s.street1}</Typography>
                    {s.street2 && (
                      <Typography variant="body2">{s.street2}</Typography>
                    )}
                    <Typography variant="body2">
                      {s.city}, {s.state}
                    </Typography>
                    <Typography variant="body2">{s.zip}</Typography>
                    <Typography variant="caption">{s.notes}</Typography>
                  </CardContent>
                </Card>
              ))}
          </div>
          <div className={classes.buttons}>
            <Button
              variant="raised"
              color="secondary"
              onClick={() => handleIndex(2)}
            >
              Continue &nbsp;&nbsp; <NextIcon />
            </Button>
            <br />
            <br />
            <Button
              variant="raised"
              color="secondary"
              onClick={() => openAddressDialog('ship')}
            >
              Add New Address
            </Button>
            <br />
            <br />
            <Button
              variant="raised"
              color="secondary"
              onClick={() => backIndex(0)}
            >
              <PrevIcon /> &nbsp;&nbsp; Back One Step
            </Button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={classes.noAddress}>
        <Typography variant="display2" align="center">
          Please provide a Shipping Address
        </Typography>
        <Button
          variant="raised"
          color="secondary"
          size="large"
          onClick={() => openAddressDialog('ship')}
          className={classes.noAddressButton}
        >
          Add New Address
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Address)
