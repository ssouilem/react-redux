import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Button, Form } from 'semantic-ui-react'
import styles from './SignInForm.less'
import validator from 'utils/signInValidator'

class SignInForm extends React.Component {
  _handleSubmit = event => {
    event.preventDefault()
    this.props.handleSubmit(this.props.values)
  }
  render () {
    const errors = this.props.syncErrors
    const TextFieldInput = Form.Input
    return (
      <form className={ styles.signInForm }>
        <Field
          component={ TextFieldInput }
          name='email'
          fieldName={
            <FormattedMessage
              id='signin.email.fieldname'
              description='Sign-In email fieldname'
              defaultMessage='Votre adresse email'
            />
          }
        />
        <Field
          component={ TextFieldInput }
          name='password'
          fieldName={
            <FormattedMessage
              id='signin.password.fieldname'
              description='Sign-In password fieldname'
              defaultMessage='Votre mot de passe'
            />
          }
          type='password'
        />
        <div className={ styles.formButton }>
          <Button
            text={
              <FormattedMessage id='signin.button.submit' description='Sign In label' defaultMessage='Je me connecte' />
            }
            primary
            buttonType={ 'submit' }
            disabled={ errors !== undefined && (errors.email !== undefined || errors.password !== undefined) }
            handleClick={ this._handleSubmit }
          />
        </div>
      </form>
    )
  }
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func,
  syncErrors: PropTypes.object,
  values: PropTypes.object,
}

const mapStateToProps = ({ form: { signInForm } }) => ({
  values: signInForm.values,
  syncErrors: signInForm.syncErrors,
})

export default reduxForm({
  form: 'signInForm',
  validate: validator,
})(connect(mapStateToProps)(SignInForm))
