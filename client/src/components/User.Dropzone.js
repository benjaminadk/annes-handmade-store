import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dropzone from 'react-dropzone'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    marginTop: '10vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3vh',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  profileAvatar: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  dropzoneContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2vh'
    }
  },
  dropzone: {
    cursor: 'pointer',
    height: '20vh',
    width: '20vh',
    border: '2px dashed black',
    borderRadius: '5px',
    marginBottom: '2vh'
  }
})

const UserDropzone = ({
  file,
  avatar,
  progress,
  onDrop,
  handleUploadAvatar,
  classes
}) => (
  <div className={classes.root}>
    <div className={classes.profileAvatar}>
      <Typography variant="display1">Profile Avatar</Typography>
      <Typography variant="body2" align="justify">
        Click the image or drap a new image over it to preview a new avatar.
        Click the Change Avatar Button to set your new avatar. This avatar will
        appear in your reviews in the top bar when you are logged in.
      </Typography>
    </div>
    <div className={classes.dropzoneContainer}>
      <Dropzone
        accept="image/*"
        multiple={false}
        onDrop={onDrop}
        className={classes.dropzone}
      >
        {file && (
          <img
            src={file.preview}
            style={{ height: '20vh', width: '20vh' }}
            alt="preview"
          />
        )}
        {!file &&
          avatar && (
            <img
              src={avatar}
              style={{ height: '20vh', width: '20vh' }}
              alt="preview"
            />
          )}
      </Dropzone>
      <Button
        variant="raised"
        color="primary"
        onClick={handleUploadAvatar}
        disabled={!file}
      >
        {progress === 100
          ? 'Avatar Uploaded'
          : progress > 0
            ? `${progress} %`
            : 'Change Avatar'}
      </Button>
    </div>
  </div>
)

export default withStyles(styles)(UserDropzone)
