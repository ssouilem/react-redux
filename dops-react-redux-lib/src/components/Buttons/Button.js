import React from 'react'
import PropTypes from 'prop-types'
import styles from 'SHARED_STYLES/buttons.less'

class Button extends React.Component {
  render () {
    return (
      <button
        className={
          `${ styles.button }
          ${ (this.props.disabled && styles.buttonDisabled) ||
             (this.props.primary && styles.buttonPrimary) ||
             (this.props.secondary && styles.buttonSecondary) ||
             (this.props.destructive && styles.buttonDestructive) ||
             styles.buttonDefault }
          ${ this.props.className }`
        }
        onClick={ this.props.handleClick }
        disabled={ this.props.disabled }
        type={ this.props.buttonType || 'button' }>
        <div>
          { this.props.leftArrow &&
            <img
              className={ styles.buttonArrowLeft }
              src={ require(`../icons/${ this.props.disabled ? 'grey' : 'white' }-arrow.svg`) } />
          }
          { this.props.text }
          { !this.props.leftArrow &&
            <img
              className={ styles.buttonArrowRight }
              src={ require(`../icons/${ this.props.disabled ? 'grey' : 'white' }-arrow.svg`) } />
          }
        </div>
      </button>
    )
  }
}

Button.propTypes = {
  buttonType: PropTypes.string,
  className: PropTypes.string,
  destructive: PropTypes.bool,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  leftArrow: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  text: PropTypes.any,
}

export default Button
