import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    marginTop: '10vh',
    marginBottom: '5vh',
    padding: '0 2.5vw',
    minHeight: '70vh',
    display: 'grid',
    gridTemplateColumns: '50% 50%'
  },
  title: {
    marginBottom: '5vh'
  },
  text: {
    marginLeft: '2.5vw'
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '30vw',
    width: '30vw'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
})

class About extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div>
          <Typography variant="display2" className={classes.title}>
            About
          </Typography>
          <div className={classes.text}>
            <Typography variant="body2" align="justify">
              I started beading several years ago. I was a Store Manager in a
              fast paced retail environment with several Assistants and 70 - 90
              Associates working under me. I was stressed and anxious and
              working hard to meet my goals and deadlines.
            </Typography>
            <br />
            <Typography variant="body2" align="justify">
              I discovered a neighborhood bead store in which I found an escape
              from my work world on days off. It was a peaceful and creative
              place. I was a novice and needed a lot of advice and
              encouragement. I made simple things at first, mostly earrings,
              which I sold and donated the money to{' '}
              <a
                href="https://www2.jdrf.org"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                JDRF
              </a>. Then I started making bracelets and necklaces which I gave
              away to friends and family.
            </Typography>
            <br />
            <Typography variant="body2" align="justify">
              Now I am retired and have time on my hands to devote to a business
              venture. My sister Susan was a big fan of my jewelry. I recently
              lost her to a violent crime. Susan was a juvenile diabetic from
              age 2 and was an RN who worked as a diabetic educator for many
              years. If I am successful with Anne's Handmade I will donate 5% of
              my net sales to{' '}
              <a
                href="https://www2.jdrf.org"
                target="_blank"
                rel="noopener noreferrer"
                className={classes.link}
              >
                JDRF
              </a>.
            </Typography>
            <br />
            <Typography variant="body2" align="justify">
              Most of my beaded pieces are "one of a kind". I enjoy working with
              Swolvorski crystal beads and also with many of the Quartz
              gemstones like Aventurine, Carnelion, Amethyst, Pink Quartz,
              Jaspers and Onyx. Most of the charms and hardware I use are
              sterling silver. Most of the gemstones are thought to have healing
              or spiritual qualities.
            </Typography>
            <img
              src="https://s3-us-west-1.amazonaws.com/shopping-site/images/assets/signature.png"
              alt="anne brooke"
              style={{ float: 'right' }}
            />
          </div>
        </div>
        <div className={classes.imageContainer}>
          <img
            src="https://s3-us-west-1.amazonaws.com/shopping-site/avatars/anne-taylor-4"
            alt="portrait"
            className={classes.image}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(About)
