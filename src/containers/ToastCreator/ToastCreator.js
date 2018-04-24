import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as actionToaster } from 'ACTIONS/toaster'
import { FormattedMessage } from 'react-intl'

const errors = {
  signIn: {
    error: <FormattedMessage
      id='signIn.toast.title.error'
      description='SignIn toast error title'
      defaultMessage='Erreur interne' />,
  },
  avatarCreate: {
    error: <FormattedMessage
      id='avatarCreate.toast.title.error'
      description='Avatar Create toast error'
      defaultMessage='Erreur interne' />,
    success: <FormattedMessage
      id='avatarCreate.toast.title.succes'
      description='Avatar Create toast success'
      defaultMessage='Votre avatar a bien été enregistré' />,
  },
  avatarUpdate: {
    error: <FormattedMessage
      id='avatarUpdate.toast.title.error'
      description='Avatar update toast error'
      defaultMessage='Erreur interne' />,
    success: <FormattedMessage
      id='avatarUpdate.toast.title.success'
      description='Avatar update toast success'
      defaultMessage='Votre avatar a bien ete modifie' />,
  },
  avatarFetch: {
    error: <FormattedMessage
      id='avatarUpdate.toast.title.error'
      description='Avatar update toast error'
      defaultMessage='Erreur interne' />,
  },
}

class ToastCreator extends React.Component {
  _shouldOpenToast = (nextProps, propsName, messages) => {
    if (this.props[propsName].error === undefined && nextProps[propsName].error !== undefined) {
      let error = nextProps[propsName].error
      let message = error.response ? error.response.data.message : error.message
      return { error: true, message, title: messages.error }
    }
    if (messages.success) {
      if (this.props[propsName].data === undefined && nextProps[propsName].data !== undefined) {
        return { error: false, title: messages.success }
      }
      if (!this.props[propsName].succeeded && nextProps[propsName].succeeded) {
        return { error: false, title: messages.success }
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    _.forEach(errors, (messages, propsName) => {
      let data = this._shouldOpenToast(nextProps, propsName, messages)
      if (data) {
        this.props.openToast(data)
      }
    })
  }
  render () {
    return <div />
  }
}

ToastCreator.propTypes = {
  openToast: PropTypes.func,
}

const mapStateToProps = ({
  user: { signIn },
}) => ({
  signIn,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  openToast: actionToaster.toasterRequest(dispatch).open,
})

export { errors, ToastCreator }
export default connect(mapStateToProps, mapDispatchToProps)(ToastCreator)
