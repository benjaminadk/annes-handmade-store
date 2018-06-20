import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { graphql, compose } from 'react-apollo'
import { GET_USER_BY_ID_QUERY } from '../queries/getUserById'
import { SET_AVATAR_MUTATION } from '../mutations/setAvatar'
import { S3_SIGN_MUTATION } from '../mutations/s3Sign'
import { EDIT_SHIPPING } from '../mutations/editShipping'
import { EDIT_BILLING } from '../mutations/editBilling'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import UserDropzone from '../components/User.Dropzone'
import UserSales from '../components/User.Sales'
import UserAddress from '../components/User.Address'
import UserAddressDialog from '../components/Checkout.Address.Dialog'
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
    avatar: '',
    addressDialog: false,
    addressType: 'ship',
    id: '',
    title: '',
    email: '',
    firstName: '',
    lastName: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    notes: ''
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.getUserById.avatar && this.props.getUserById.avatar) {
      this.setState({ avatar: this.props.getUserById.avatar })
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  openAddressDialog = (addressType, address) => {
    const {
      id,
      title,
      email,
      firstName,
      lastName,
      street1,
      street2,
      city,
      state,
      zip
    } = address
    const notes = addressType === 'ship' ? address.notes : ''
    this.setState({
      addressDialog: true,
      addressType,
      id,
      title,
      email,
      firstName,
      lastName,
      street1,
      street2,
      city,
      state,
      zip,
      notes
    })
  }

  closeAddressDialog = e => {
    this.setState({ addressDialog: false })
    this.resetAddressForm()
  }

  resetAddressForm = () =>
    this.setState({
      addressDialog: false,
      title: '',
      email: '',
      firstName: '',
      lastName: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      notes: ''
    })

  saveAddress = async () => {
    const {
      id,
      title,
      email,
      firstName,
      lastName,
      street1,
      street2,
      city,
      state,
      zip,
      notes
    } = this.state
    const userId = this.props.match.params.userId
    if (this.state.addressType === 'ship') {
      await this.props.editShipping({
        variables: {
          id,
          input: {
            userId,
            title,
            email,
            firstName,
            lastName,
            street1,
            street2,
            city,
            state,
            zip,
            notes
          }
        },
        refetchQueries: [
          {
            query: GET_USER_BY_ID_QUERY,
            variables: { userId: this.props.match.params.userId }
          }
        ]
      })
    } else if (this.state.addressType === 'bill') {
      await this.props.editBilling({
        variables: {
          id,
          input: {
            userId,
            title,
            email,
            firstName,
            lastName,
            street1,
            street2,
            city,
            state,
            zip
          }
        },
        refetchQueries: [
          {
            query: GET_USER_BY_ID_QUERY,
            variables: { userId: this.props.match.params.userId }
          }
        ]
      })
    }
    this.resetAddressForm()
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
    return [
      <div key="name" className={classes.root}>
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
        <UserAddress
          ships={getUserById.ships}
          bills={getUserById.bills}
          openAddressDialog={this.openAddressDialog}
        />
        <Divider />
      </div>,
      <UserAddressDialog
        key="dialog"
        open={this.state.addressDialog}
        handleChange={this.handleChange}
        closeAddressDialog={this.closeAddressDialog}
        saveAddress={this.saveAddress}
        addressType={this.state.addressType}
        title={this.state.title}
        email={this.state.email}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        street1={this.state.street1}
        street2={this.state.street2}
        city={this.state.city}
        state={this.state.state}
        zip={this.state.zip}
        notes={this.state.notes}
      />
    ]
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
  graphql(S3_SIGN_MUTATION, { name: 's3Sign' }),
  graphql(EDIT_SHIPPING, { name: 'editShipping' }),
  graphql(EDIT_BILLING, { name: 'editBilling' })
)(User)
