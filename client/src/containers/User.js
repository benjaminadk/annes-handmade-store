import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
import { GET_USER_BY_ID_QUERY } from '../queries/getUserById'
import { SET_AVATAR_MUTATION } from '../mutations/setAvatar'
import { S3_SIGN_MUTATION } from '../mutations/s3Sign'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import UserDropzone from '../components/User.Dropzone'
import UserSales from '../components/User.Sales'
import Loading from '../components/Loading'
import axios from 'axios'
import { formatFilename } from '../utils/formatFilename'

const styles = theme => ({
  root: {
    paddingLeft: '5vw',
    paddingRight: '5vw'
  }
})

class User extends Component {
  state = {
    file: null,
    progress: 0,
    avatar: ''
  }

  componentDidMount() {
    if (localStorage.getItem('AVATAR')) {
      this.setState({ avatar: localStorage.getItem('AVATAR') })
    }
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

  onDrop = files => this.setState({ file: files[0] })

  render() {
    const {
      classes,
      data: { getUserById, loading }
    } = this.props
    if (loading) return <Loading />
    return (
      <div className={classes.root}>
        <UserDropzone
          file={this.state.file}
          onDrop={this.onDrop}
          handleUploadAvatar={this.handleUploadAvatar}
          avatar={this.state.avatar}
          progress={this.state.progress}
        />
        <Divider />
        <Hidden smDown>
          <UserSales sales={getUserById.sales} />
        </Hidden>
        <Divider />
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
