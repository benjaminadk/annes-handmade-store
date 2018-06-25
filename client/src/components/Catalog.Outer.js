import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { BEADS } from '../utils/beads'
import { TYPES } from '../utils/types'
import CatalogBeadInfo from './Catalog.BeadInfo'

const styles = theme => ({
  text: {
    marginRight: '2vw'
  },
  nav: {
    marginLeft: '2vw'
  },
  cardsContainer: {
    marginTop: '5vh',
    marginBottom: '5vh',
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
    cursor: 'pointer',
    '&:hover': {
      outline: `2px solid ${theme.palette.primary.main}`
    }
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
    flexWrap: 'wrap'
  },
  bead: {
    width: '20vh',
    height: '30vh',
    marginRight: '5vw',
    marginBottom: '5vh',
    cursor: 'pointer',
    '&:hover': {
      outline: `2px solid ${theme.palette.primary.main}`
    }
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

const CatalogOuter = ({ classes, bead, handleCollapse, outerCardClick }) => (
  <div className={classes.cardsContainer}>
    <CatalogBeadInfo bead={bead} handleCollapse={handleCollapse} />
    <div className={classes.nav}>
      <div className={classes.typesContainer}>
        <Card raised className={classes.type}>
          <CardMedia
            image="https://s3-us-west-1.amazonaws.com/shopping-site/images/assets/infinity.jpg"
            className={classes.typeMedia}
            onClick={() => outerCardClick(true, null)}
          />
          <CardContent className={classes.typeContent}>
            <Typography variant="button" align="center">
              All Jewelry
            </Typography>
          </CardContent>
        </Card>
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
