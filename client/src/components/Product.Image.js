import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReactImageMagnify from 'react-image-magnify'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '3vh'
    }
  }
})

const Image = ({ classes, images, activeIndex }) => {
  return (
    <div className={classes.root}>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'product',
            src: images[activeIndex],
            height: 300,
            width: 300
          },
          largeImage: {
            alt: '',
            src: images[activeIndex],
            height: 500,
            width: 500
          },
          enlargedImageContainerStyle: { zIndex: 100000 }
        }}
      />
      <br />
      <Typography variant="button">Hover/Touch image to zoom</Typography>
    </div>
  )
}

export default withStyles(styles)(Image)
