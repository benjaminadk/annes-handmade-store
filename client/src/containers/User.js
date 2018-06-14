import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
import { GET_USER_BY_ID_QUERY } from '../queries/getUserById'
import { SET_AVATAR_MUTATION } from '../mutations/setAvatar'
import { S3_SIGN_MUTATION } from '../mutations/s3Sign'
import UserDropzone from '../components/User.Dropzone'
import axios from 'axios'
import { formatFilename } from '../utils/formatFilename'

const styles = theme => ({})

class User extends Component {
  state = {
    file: null,
    progress: 0,
    avatar: ''
  }

  uploadToS3 = async (file, requestUrl) => {
    const options = {
      headers: {
        'Content-Type': file.type
      },
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        this.setState({ progress: percentCompleted })
      }
    }
    await axios.put(requestUrl, file, options)
  }

  handleUploadAvatar = async () => {
    const userId = this.props.match.params.userId
    const { file } = this.state
    const filename = formatFilename(file.name, 'avatars')
    const filetype = file.type
    const response = await this.props.s3Sign({
      variables: { filename, filetype }
    })
    const { requestUrl, imageUrl } = response.data.s3Sign
    await this.uploadToS3(file, requestUrl)
    await this.props.setAvatar({
      variables: { userId, avatar: imageUrl }
    })
    await this.props.setRootAvatar(imageUrl)
    await this.setState({ avatar: imageUrl })
  }

  onDrop = files => {
    console.log(files)
    this.setState({ file: files[0] })
  }

  render() {
    const {
      loading,
      data: { getUserById }
    } = this.props
    console.log(getUserById)
    if (loading) return null
    return (
      <div>
        <UserDropzone
          file={this.state.file}
          onDrop={this.onDrop}
          handleUploadAvatar={this.handleUploadAvatar}
        />
        {this.state.avatar && (
          <img src={this.state.avatar} alt="avatar" height={200} width={200} />
        )}
        <h1>Progress: {this.state.progress}</h1>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(GET_USER_BY_ID_QUERY, {
    options: props => ({
      variables: { userId: localStorage.getItem('USER_ID') }
    })
  }),
  graphql(SET_AVATAR_MUTATION, { name: 'setAvatar' }),
  graphql(S3_SIGN_MUTATION, { name: 's3Sign' })
)(User)
