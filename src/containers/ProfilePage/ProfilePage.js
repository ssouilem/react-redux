import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AvatarProfile from 'COMPONENTS/Profile/AvatarProfile'
import { actions as userActions } from 'ACTIONS/user'
import SideNav from 'COMPONENTS/SideNav/SideNav'
import { FormattedMessage } from 'react-intl'

export class ProfilePage extends React.Component {
  state={ avatar: undefined, profile: undefined }
  _forceUpdate (avatar) {
    this.setState({ avatar })
  }
  // componentWillReceiveProps (nextProps) {
  //   this._forceUpdate(nextProps.avatar.data)
  //   if (this.props.profile && !this.props.profile.data && !this.props.profile.sending) {
  //     this.props.fetchProfile()
  //   }
  // }
  render () {
    // @TODO recuperation de context
    const routes = [
      { path: '/', pathname: 'Home', active: false },
      { path: '/setting', pathname: 'Setting', active: false },
      { path: '/setting/profile', pathname: 'Profile', active: true },
    ]
    return (
      <div>
        <SideNav
          routes={ routes } />
        <div >
          <FormattedMessage
            id='UserEditorPage.title.text'
            description='User Editor Page Title'
            defaultMessage='User Informations'
          />
        </div>
        <div >
          <AvatarProfile
            // fetch={ this.props.fetchProfile }
            user={ this.props.user }
            avatar={ this.state.avatar }
            update={ this.props.updateAvatar }
            create={ this.props.createAvatar }
            updateProfile={ this.props.updateProfile }
            getProfile={ this.props.getProfile }
          />
        </div>
      </div>)
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  getProfile: PropTypes.func,
  updateProfile: PropTypes.func,
//  profile: PropTypes.object,
}

const mapStateToProps = function (state) {
  return {
    avatar: state.avatar.avatar,
    user: state.user,
    // profile: state.profile,
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getProfile: userActions.getProfile(dispatch),
  updateProfile: userActions.updateProfile(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
