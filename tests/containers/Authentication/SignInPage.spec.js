/* eslint no-unused-expressions: 0 */
import React from 'react'
import { push } from 'react-router-redux'
import ConnectedSignInPage, { SignInPage } from 'containers/Authentication/SignInPage'
import SignInForm from 'containers/Authentication/Forms/SignInForm'
import { actions } from 'ACTIONS/user'
import { Provider } from 'react-redux'
import { createMockStore, renderIntoDocument, stateToPropsComponent } from 'TESTS/testHelpers'
import { assert, sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe.skip('(containers) SignIn', () => {
  let _state, _store
  it('should display sign-in form', () => {
    const signIn = sandbox.stub()
    sandbox.stub(actions, 'signIn').returns(signIn)
    const container = getContainer()
    const signInForm = TestUtils.findRenderedComponentWithType(container, SignInForm)
    expect(signInForm).to.not.be.undefined
    signInForm.props.handleSubmit('someValues')
    assert.calledWithExactly(signIn, 'someValues')
  })

  const getContainer = () => {
    _state = { form: { signInForm: {} }, user: { signIn: {} } }
    _store = createMockStore(_state)
    return renderIntoDocument(<Provider store={ _store }><ConnectedSignInPage /></Provider>)
  }

  it('should push to / page', () => {
    const props = {
      location: { query: {} },
      userSignIn: { sending: true },
      dispatch: sandbox.spy(),
    }
    const Parent = stateToPropsComponent({ initialProps: props, component: SignInPage })
    const parent = TestUtils.findRenderedComponentWithType(
      renderIntoDocument(<Provider store={ _store }><Parent { ...props } /></Provider>),
      Parent)
    sandbox.assert.notCalled(props.dispatch)
    let nextProps = {
      userSignIn: { sending: false },
    }
    parent.setState(nextProps)
    sandbox.assert.calledWithExactly(props.dispatch, push('/'))
  })

  it('should push to redirect page if present in URL when user signed', () => {
    const props = {
      location: { query: { redirect: '/redirectPage' } },
      userSignIn: { sending: true },
      dispatch: sandbox.spy(),
    }
    const Parent = stateToPropsComponent({ initialProps: props, component: SignInPage })
    const parent = TestUtils.findRenderedComponentWithType(
      renderIntoDocument(<Provider store={ _store }><Parent { ...props } /></Provider>),
      Parent)
    sandbox.assert.notCalled(props.dispatch)
    let nextProps = {
      userSignIn: { sending: false },
    }
    parent.setState(nextProps)
    sandbox.assert.calledWithExactly(props.dispatch, push('/redirectPage'))
  })

  it('should not push to home page when user is signing', () => {
    const props = {
      userSignIn: { sending: false },
      dispatch: sandbox.spy(),
    }
    const Parent = stateToPropsComponent({ initialProps: props, component: SignInPage })
    const parent = TestUtils.findRenderedComponentWithType(
      renderIntoDocument(<Provider store={ _store }><Parent { ...props } /></Provider>),
      Parent)
    sandbox.assert.notCalled(props.dispatch)
    let nextProps = {
      userSignIn: { sending: true },
    }
    parent.setState(nextProps)
    sandbox.assert.notCalled(props.dispatch)
  })

  it('should not push to home page when user signing fails', () => {
    const props = {
      userSignIn: { sending: false },
      dispatch: sandbox.spy(),
    }
    const Parent = stateToPropsComponent({ initialProps: props, component: SignInPage })
    const parent = TestUtils.findRenderedComponentWithType(
      renderIntoDocument(<Provider store={ _store }><Parent { ...props } /></Provider>),
      Parent)
    sandbox.assert.notCalled(props.dispatch)
    let nextProps = {
      userSignIn: { error: 'some error' },
    }
    parent.setState(nextProps)
    sandbox.assert.notCalled(props.dispatch)
  })
})
