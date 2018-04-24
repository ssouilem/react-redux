/* eslint no-unused-expressions: 0 */
import _ from 'lodash'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field } from 'redux-form'
import { assert } from 'sinon'
import { Provider } from 'react-redux'
import { createMockStore, renderIntoDocument } from 'TESTS/testHelpers'
import SignInForm from 'containers/Authentication/Forms/SignInForm'
import { Button } from 'semantic-ui-react'
import TestUtils from 'react-addons-test-utils'

describe.skip('(container) SignInForm', () => {
  let _props, _state, _store, _handleSubmit
  it('Should have a form.', () => {
    const container = getContainer()
    expect(TestUtils.scryRenderedDOMComponentsWithTag(container, 'form')).to.have.length(1)
  })

  it('should contain Fields, FormattedMessage and submit button', () => {
    const container = getContainer({})
    const formattedMessages = TestUtils.scryRenderedComponentsWithType(container, FormattedMessage)
    expect(formattedMessages.map(formattedMessage => formattedMessage.props.id)).to.deep.equal([
      'signin.email.fieldname',
      'signin.password.fieldname',
      'signin.button.submit',
    ])
    const fields = TestUtils.scryRenderedComponentsWithType(container, Field)
    expect(fields.length).to.equal(2)
    expect(fields[0].props.name).to.equal('email')
    expect(fields[1].props.name).to.equal('password')
    const button = TestUtils.findRenderedComponentWithType(container, Button)
    expect(button.props.primary).to.be.true
    expect(button.props.buttonType).to.equal('submit')
  })

  _.each(
    [
      { errors: { email: undefined, password: undefined }, disabled: false },
      { errors: undefined, disabled: false },
      { errors: { email: undefined, password: 'error' }, disabled: true },
      { errors: { email: 'error', password: undefined }, disabled: true },
    ],
    ({ errors, disabled }) => {
      it(`should ${ disabled ? 'disable' : 'enable' } (errors: ${ JSON.stringify(errors) })`, () => {
        const container = getContainer({}, errors)
        const button = TestUtils.findRenderedComponentWithType(container, Button)
        expect(button.props.disabled).to.equal(disabled)
      })
    }
  )

  it('should call handleSubmit on click', () => {
    const container = getContainer({ fieldKey: 'fieldValue' })
    const button = TestUtils.findRenderedComponentWithType(container, Button)
    const event = { preventDefault: sinon.spy() }
    button.props.handleClick(event)
    assert.calledWithExactly(event.preventDefault)
    assert.calledWithExactly(_handleSubmit, {
      fieldKey: 'fieldValue',
    })
  })

  const getContainer = (fields = {}, errors = {}) => {
    _handleSubmit = sinon.spy()
    _state = { form: { signInForm: { values: fields } } }
    if (errors) {
      _state.form.signInForm.syncErrors = errors
    }
    _props = {
      handleSubmit: _handleSubmit,
    }
    _store = createMockStore(_state)

    return renderIntoDocument(
      <Provider store={ _store }>
        <SignInForm { ..._props } />
      </Provider>
    )
  }
})
