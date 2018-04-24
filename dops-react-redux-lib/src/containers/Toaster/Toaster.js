import React from 'react'
import { connect } from 'react-redux'
import { actions as actionToaster } from 'SHARED_REDUX/modules/toaster'
import Toast from 'SHARED_COMPONENTS/Toaster/Toast'

class Toaster extends React.Component {
  static propTypes = {
    close: React.PropTypes.func,
    data: React.PropTypes.object,
  }
  render () {
    return (
      <Toast item={ this.props.data } handleClose={ this.props.close } />
    )
  }
}

const mapStateToProps = ({
  toaster: { data },
}) => ({
  data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  close: actionToaster.toasterRequest(dispatch).close,
})

export default connect(mapStateToProps, mapDispatchToProps)(Toaster)
