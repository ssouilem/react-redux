import React from 'react'
import { FormattedMessage } from 'react-intl'
import validator from 'validator'

export default (data) => {
  const errors = {}
  if (!data.email) {
    errors.email = <FormattedMessage
      id='authentication.field.required'
      description='Required error'
      defaultMessage='Requis' />
  } else if (!validator.isEmail(data.email)) {
    errors.email = <FormattedMessage
      id='authentication.field.emailinvalid'
      description='Invalid Email error'
      defaultMessage='Saisissez un email valide' />
  }
  if (!data.password) {
    errors.password = <FormattedMessage
      id='authentication.field.required'
      description='Required error'
      defaultMessage='Requis' />
  }
  return errors
}
