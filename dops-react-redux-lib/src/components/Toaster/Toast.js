import React from 'react'
import styles from './Toast.less'

class Toast extends React.Component {
  static propTypes = {
    handleClose: React.PropTypes.func,
    item: React.PropTypes.object,
  }
  _handleClose = (event) => {
    event.preventDefault()
    this.props.handleClose()
  }
  render () {
    return (
      <div className={
        `${ styles.toast }
        ${ this.props.item && styles.toastOpen }
        ${ this.props.item && this.props.item.error && styles.toastError }` }>
        { this.props.item && this.props.item.title &&
          <div className={ styles.title }>{ this.props.item.title }</div> }
        { this.props.item && this.props.item.message &&
          <div className={ styles.message }>{ this.props.item.message }</div> }
        <img className={ styles.close } src={ require('../icons/close.svg') } onClick={ this._handleClose } />
      </div>
    )
  }
}

export default Toast
