import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import { BEADS } from '../utils/beads'

const styles = theme => ({
  direction: {
    marginTop: '10vh'
  },
  gemProperties: {
    marginTop: '20vh'
  },
  title: {
    textAlign: 'center',
    paddingTop: '2.5vh',
    paddingBottom: '2vh',
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  },
  beadInfoContainer: {
    '&:hover': {
      backgroundColor: '#edeaea'
    }
  },
  beadInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer'
  },
  beadInfoTitle: {
    marginLeft: '1vw'
  },
  beadInfoRight: {
    width: '30%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  thumbnail: {
    height: '5vh',
    width: '5vh'
  },
  beadInfoCollapse: {
    paddingLeft: '1vw',
    paddingRight: '1vw',
    paddingBottom: '2vh'
  },
  beadInfoQuality: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
})

const CatalogBeadInfo = ({ classes, bead, handleCollapse }) => (
  <div className={classes.leftColumn}>
    <Typography variant="button" align="center" className={classes.direction}>
      Click a tile to browse a category
    </Typography>
    <Paper className={classes.gemProperties}>
      <Typography variant="title" className={classes.title}>
        Gem Properties
      </Typography>
      <Divider />
      {BEADS.map((b, i) => (
        <div key={i} className={classes.beadInfoContainer}>
          <div
            className={classes.beadInfo}
            onClick={() => handleCollapse(b.name)}
          >
            <Typography variant="button" className={classes.beadInfoTitle}>
              {b.name}
            </Typography>
            <div className={classes.beadInfoRight}>
              <img src={b.src} alt={b.name} className={classes.thumbnail} />
              <IconButton
                onClick={() => handleCollapse(b.name)}
                disableRipple
                className={classes.iconButton}
              >
                {bead === b.name ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </div>
          </div>
          <Collapse in={bead === b.name}>
            <div className={classes.beadInfoCollapse}>
              <div className={classes.beadInfoQuality}>
                <Typography variant="caption">Spiritual Quality: </Typography>
                <Typography variant="body2">{b.quality}</Typography>
              </div>
              <Typography variant="body1" align="justify">
                {b.description}
              </Typography>
            </div>
          </Collapse>
          <Divider />
        </div>
      ))}
    </Paper>
  </div>
)

export default withStyles(styles)(CatalogBeadInfo)
