import React from 'react'
import PropTypes from 'prop-types'
import { actions as avatarActions } from 'SHARED_REDUX/modules/avatar'
import AvatarEditor from 'SHARED_COMPONENTS/AvatarEditor/AvatarEditor'

import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import styles from './MyAccount.less'

export class MyAccount extends React.Component {
  state={ avatar: undefined }
  _forceUpdate (avatar) {
    this.setState({ avatar })
  }
  componentWillMount () {
    this._forceUpdate(this.props.avatar.data)
  }
  componentWillReceiveProps (nextProps) {
    this._forceUpdate(nextProps.avatar.data)
  }
  render = () => {
    return (
      <div className={ styles.page }>
        <div className={ styles.pageTitle }>
          <FormattedMessage
            id='avatarEditorPage.title.text'
            description='Avatar Editor Page Title'
            defaultMessage='Avatar Editor'
          />
        </div>
        <div className={ `${ styles.pageContainer } ${ styles.row } ${ styles.centerContent }` }>
          <AvatarEditor
            email={ this.props.user && this.props.user._id }
            avatar={ this.state.avatar }
            update={ this.props.update }
            create={ this.props.create }
          />
        </div>
      </div>)
  }
}

MyAccount.propTypes = {
  user: PropTypes.object,
  avatar: PropTypes.object,
  create: PropTypes.func,
  update: PropTypes.func,
}

const mapStateToProps = (state) => ({
  avatar: state.avatar.avatar,
  user: state.user.signIn.data,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  create: avatarActions.avatarRequest(dispatch).create,
  update: avatarActions.avatarRequest(dispatch).update,
})

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)
