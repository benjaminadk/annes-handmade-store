import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import { BEADS } from '../utils/beads'
import { TYPES } from '../utils/types'

const styles = theme => ({
  cardsContainer: {
    marginTop: '5vh',
    display: 'grid',
    gridTemplateColumns: '25% 75%'
  },
  typesContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  type: {
    width: '20vh',
    height: '30vh',
    marginRight: '5vw',
    marginBottom: '5vh',
    cursor: 'pointer'
  },
  typeMedia: {
    height: '20vh',
    width: '20vh'
  },
  typeContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  beadsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: '10vh'
  },
  bead: {
    width: '20vh',
    height: '30vh',
    marginRight: '5vw',
    marginBottom: '5vh',
    cursor: 'pointer'
  },
  beadMedia: {
    height: '20vh',
    width: '20vh'
  },
  beadContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const CatalogOuter = ({ classes, outerCardClick }) => (
  <div className={classes.cardsContainer}>
    <div />
    <div>
      <div className={classes.typesContainer}>
        {TYPES.map((t, i) => (
          <Card key={t.name} raised className={classes.type}>
            <CardMedia
              image={t.src}
              className={classes.typeMedia}
              onClick={() => outerCardClick(true, i + 1)}
            />
            <CardContent className={classes.typeContent}>
              <Typography variant="button" align="center">
                {t.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Card raised className={classes.type}>
          <CardMedia
            src={''}
            className={classes.typeMedia}
            onClick={() => outerCardClick(true, null)}
          />
          <CardContent className={classes.typeContent}>
            <Typography variant="button" align="center">
              All Jewelry
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className={classes.beadsContainer}>
        {BEADS.map((b, i) => (
          <Card key={b.name} raised className={classes.bead}>
            <CardMedia
              image={b.src}
              className={classes.beadMedia}
              onClick={() => outerCardClick(false, i + 1)}
            />
            <CardContent className={classes.beadContent}>
              <Typography variant="button" align="center">
                {b.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
)

export default withStyles(styles)(CatalogOuter)
