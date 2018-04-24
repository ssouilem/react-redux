import React from 'react'
import { Provider } from 'react-redux'
import { createMockStore, renderIntoDocument, stateToPropsComponent } from 'TESTS/testHelpers'
import { sandbox } from 'sinon'
import { default as ConnectedToastCreator, errors, ToastCreator } from 'containers/ToastCreator/ToastCreator'
import TestUtils from 'react-addons-test-utils'

describe('(containers) ToastCreator', () => {
  let _store, _state
  beforeEach(() => {
    sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should display nothing', () => {
    const container = getContainer()
    const div = TestUtils.findRenderedDOMComponentWithTag(container, 'div')
    expect(div.innerHTML).to.equal('')
  })

  const getContainer = () => {
    _state = {
      user: {
        signIn: { error: 'signInError' },
      },
      avatar: {
        avatar: { error: 'error' },
        create: { error: 'createError' },
        update: { error: 'saveError' },
      },
    }
    _store = createMockStore(_state)
    return renderIntoDocument(<Provider store={ _store }><ConnectedToastCreator /></Provider>)
  }

  describe('ComponentWillReceiveProps', () => {
    let _parent, _props

    beforeEach(() => {
      _props = {
        openToast: sandbox.spy(),
        signIn: {
          error: undefined,
          data: undefined,
        },
        avatarCreate: {
          error: undefined,
          data: undefined,
        },
        avatarUpdate: {
          error: undefined,
          data: undefined,
        },
        avatarFetch: {
          error: undefined,
        },
      }
      const Parent = stateToPropsComponent({ initialProps: _props, component: ToastCreator })
      _parent = TestUtils.findRenderedComponentWithType(renderIntoDocument(<Parent />), Parent)
      sandbox.assert.notCalled(_props.openToast)
    })

    it('should do nothing if props change is irrelevant', () => {
      _parent.setState({
        ..._props,
        someUselessProps: 'useless',
      })
      sandbox.assert.notCalled(_props.openToast)
    })

    it('should openToast on signIn error', () => {
      _parent.setState({
        ..._props,
        signIn: { error: { response: { data: { message: 'someErrorMessage' } } } },
      })
      sandbox.assert.calledWithExactly(_props.openToast, {
        error: true,
        message: 'someErrorMessage',
        title: errors.signIn.error,
      })
    })

    it('should openToast on signIn error', () => {
      _parent.setState({
        ..._props,
        signIn: { error: { message: 'someErrorMessage' } },
      })
      sandbox.assert.calledWithExactly(_props.openToast, {
        error: true,
        message: 'someErrorMessage',
        title: errors.signIn.error,
      })
    })

    it('should not openToast on signIn succeed', () => {
      _parent.setState({
        ..._props,
        signIn: { data: 'some data' },
      })
      sandbox.assert.notCalled(_props.openToast)
    })

    it('should openToast on create error', () => {
      _parent.setState({
        ..._props,
        avatarCreate: { data: 'some data' },
      })
      sandbox.assert.calledWithExactly(_props.openToast, {
        error: false,
        title: errors.avatarCreate.success,
      })
    })

    it('should openToast on update error', () => {
      _parent.setState({
        ..._props,
        avatarUpdate: { data: 'some data' },
      })
      sandbox.assert.calledWithExactly(_props.openToast, {
        error: false,
        title: errors.avatarUpdate.success,
      })
    })

    it('should openToast on create success', () => {
      _parent.setState({
        ..._props,
        avatarCreate: { succeeded: 'foo' },
      })
      sandbox.assert.calledWithExactly(_props.openToast, {
        error: false,
        title: errors.avatarCreate.success,
      })
    })

    it('should openToast on update success', () => {
      _parent.setState({
        ..._props,
        avatarUpdate: { succeeded: 'foo' },
      })
      sandbox.assert.calledWithExactly(_props.openToast, {
        error: false,
        title: errors.avatarUpdate.success,
      })
    })
  })
})
