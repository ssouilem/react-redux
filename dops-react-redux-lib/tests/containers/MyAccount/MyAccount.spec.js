/* eslint no-unused-expressions: 0 */
import React from 'react'
import { Provider } from 'react-redux'
import { createMockStore, renderIntoDocument, stateToPropsComponent } from 'SHARED_TESTS/testHelpers'
import { sandbox } from 'sinon'
import MyAccount, { MyAccount as NotConnectedMyAccount } from 'SHARED_CONTAINERS/MyAccount/MyAccount'
import AvatarEditor from 'SHARED_COMPONENTS/AvatarEditor/AvatarEditor'
import { FormattedMessage } from 'react-intl'
import TestUtils from 'react-addons-test-utils'

describe('(containers) MyAccount', () => {
  let _state, _store, _props, _create, _update
  beforeEach(() => {
    sandbox.create()
    _create = sandbox.spy()
    _update = sandbox.spy()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should contain AvatarEditor component', () => {
    const container = getContainer()
    let avatarEditorComponent = TestUtils.findRenderedComponentWithType(container, AvatarEditor)
    expect(avatarEditorComponent).to.not.be.undefined
  })

  it('should contain a title', () => {
    const container = getContainer()
    let formattedMessage = TestUtils.scryRenderedComponentsWithType(container, FormattedMessage)[0]
    expect(formattedMessage.props.id).to.equal('avatarEditorPage.title.text')
  })

  describe('ComponentWillReceiveProps', () => {
    beforeEach(() => {
      sandbox.create()
      _store = createMockStore(state)
    })

    afterEach(() => {
      sandbox.restore()
    })

    const initialProps = {
      create: _create,
      update: _update,
      user: { _id: 666 },
      avatar: { avatar: { data: undefined, sending: false, error: undefined } },
    }

    const state = {
      user: {
        user: { signIn: { data: { _id: 666 }, sending: false } },
      },
      avatar: { avatar: { data: undefined, sending: false } },
    }

    it('should do scroll to top if update props at each update', () => {
      let props = initialProps
      const Parent = stateToPropsComponent({ initialProps: props, component: NotConnectedMyAccount })
      const parent = TestUtils.findRenderedComponentWithType(
        renderIntoDocument(<Provider store={ _store }><Parent { ...props } /></Provider>),
        Parent
      )
      parent.setState({
        ...props,
        avatar: { error: 'hello' },
      })
    })
  })

  const getContainer = (avatar = undefined) => {
    _state = {
      avatar: { avatar: { data: avatar } },
      user: { signIn: { data: { _id: 666 } } },
    }
    _props = {
      _create,
      _update,
    }
    _store = createMockStore(_state)
    return renderIntoDocument(
      <Provider store={ _store }>
        <MyAccount { ..._props } />
      </Provider>)
  }
})
