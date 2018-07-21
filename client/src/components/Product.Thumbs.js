import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  thumb: {
    height: '8vh',
    width: '8vh',
    border: '1px solid',
    marginBottom: '1.5vh',
    cursor: 'pointer'
  }
})

const Thumbs = ({ images, activeIndex, handleActiveIndex, classes }) => {
  return (
    <div className={classes.root}>
      {images.map((im, i) => {
        return (
          <div
            key={`thumb-item-${i}`}
            className={classes.thumb}
            onClick={() => handleActiveIndex(i)}
            style={{
              backgroundImage: `url(${im})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              outline: activeIndex === i ? '3px solid #6a936f' : null
            }}
          />
        )
      })}
    </div>
  )
}

export default withStyles(styles)(Thumbs)
