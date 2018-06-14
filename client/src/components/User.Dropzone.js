import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dropzone from 'react-dropzone'

const styles = theme => ({
  dropzone: {
    cursor: 'pointer',
    height: '20vh',
    width: '20vh',
    border: '2px dashed black',
    borderRadius: '5px'
  }
})

const UserDropzone = ({ file, onDrop, handleUploadAvatar, classes }) => (
  <div>
    <Dropzone
      accept='image/*'
      multiple={false}
      onDrop={onDrop}
      className={classes.dropzone}
    >
      { file && <img src={file.preview} style={{ height: '20vh', width: '20vh'}} alt='preview' /> }
    </Dropzone>
    <Button
      variant='raised'
      color='primary'
      onClick={handleUploadAvatar}
      disabled={!file}
    >
      Set new avatar
    </Button>
  </div>
  )

export default withStyles(styles)(UserDropzone)