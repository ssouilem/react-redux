import React from 'react'
import PropTypes from 'prop-types'
import styles from './TextFieldInput.less'

class TextFieldInput extends React.Component {
  render () {
    let input = {
      ...this.props.input,
      value: this.props.input.value || '',
    }
    let isErroneous = !this.props.meta.valid && (this.props.forceError || this.props.meta.touched)
    return (
      <div className={ styles.inputContainer }>
        <div className={ styles.inputGroup }>
          { this.props.fieldName && input.value === '' &&
            <div className={ styles.labelStyle } >
              { this.props.fieldName }
            </div>
          }
          { this.props.fieldHint && input.value === '' &&
            <div className={ styles.hintStyle } >
              { this.props.fieldHint }
            </div>
          }
          <input
            className={ isErroneous ? `${ styles.inputStyle } ${ styles.inputStyleError }` : styles.inputStyle }
            type={ this.props.type || 'text' }
            disabled={ this.props.disabled }
            { ...input }
          />
        </div>
        <div className={ styles.errorStyle } >
          { isErroneous ? this.props.meta.error : '' }
        </div>
      </div>
    )
  }
}

TextFieldInput.propTypes = {
  disabled: PropTypes.bool,
  fieldName: PropTypes.any,
  fieldHint: PropTypes.object,
  forceError: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string,
}

export default TextFieldInput
