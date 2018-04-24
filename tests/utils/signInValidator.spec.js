import validate from 'utils/signInValidator'
import { FormattedMessage } from 'react-intl'

describe('(utils) signInValidator', () => {
  describe('SignIn validator', () => {
    it('should set errors if required field is not present', () => {
      const errors = validate({})
      expect(errors.password.type).to.equal(FormattedMessage)
      expect(errors.password.props.id).to.equal('authentication.field.required')
      expect(errors.email.type).to.equal(FormattedMessage)
      expect(errors.email.props.id).to.equal('authentication.field.required')
    })

    it('should set errors if email is not valid', () => {
      const errors = validate({ email: 'malformedemail' })
      expect(errors.email.type).to.equal(FormattedMessage)
      expect(errors.email.props.id).to.equal('authentication.field.emailinvalid')
    })

    it('should not set errors all data are valid', () => {
      const errors = validate({
        password: '12345Aaé',
        email: 'bbb@bb.fr',
      })
      expect(errors).to.deep.equal({})
    })
  })
})
