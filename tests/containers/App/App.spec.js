/* eslint no-unused-expressions: 0 */
import React from 'react'
import { Provider } from 'react-redux'
import { actions as burgerActions } from 'ACTIONS/burger'
import { actions as avatarActions } from 'ACTIONS/avatar'
import { Loader } from 'semantic-ui-react'
import ToastCreator from 'containers/ToastCreator/ToastCreator'
import ConnectedApp, { App } from 'containers/App/App'
import { sandbox } from 'sinon'
import { createMockStore, renderIntoDocument, stateToPropsComponent } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'

class SomeChildren extends React.Component {
  render = () => <div />
}

describe('(containers) App', () => {
  let _state, _store, _onBurgerStateChangeSpy

  beforeEach(() => {
    sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should find ToastCreator and children', () => {
    const container = getContainer()

    expect(TestUtils.findRenderedComponentWithType(container, ToastCreator)).to.not.be.undefined
    expect(TestUtils.scryRenderedComponentsWithType(container, Loader)).to.have.length(0)
  })

  it('should find Loader when sending', () => {
    let container = getContainer(true)
    expect(TestUtils.findRenderedComponentWithType(container, Loader)).to.not.be.undefined
  })

  const getContainer = sending => {
    _onBurgerStateChangeSpy = sandbox.spy()
    sandbox.stub(burgerActions, 'onBurgerStateChange').returns(_onBurgerStateChangeSpy)
    _state = {
      redmine: {
        projects: { data: undefined, sending: false, error: undefined },
        project: { data: undefined, sending: false, error: undefined },
      },
      burger: { isOpen: false },
      form: { searchForm: {} },
      user: { signIn: { sending, data: { _id: 777 } } },
      avatar: { avatar: { data: undefined, sending: false, error: undefined } },
    }
    _store = createMockStore(_state)
    return renderIntoDocument(
      <Provider store={ _store }>
        <ConnectedApp children={ <SomeChildren /> } />
      </Provider>
    )
  }

  describe('ComponentWillReceiveProps', () => {
    let scrollToStub, _fetch
    beforeEach(() => {
      sandbox.create()
      sandbox.stub(avatarActions, 'avatarRequest').returns(_fetch)
      scrollToStub = sandbox.stub(window, 'scrollTo')
      _store = createMockStore(state)
    })

    afterEach(() => {
      sandbox.restore()
    })

    const initialProps = {
      children: <SomeChildren />,
      location: { pathname: 'foo' },
      state: {
        redmine: {
          projects: { data: undefined, sending: false, error: undefined },
          project: { data: undefined, sending: false, error: undefined },
        },
        user: { signIn: { data: { _id: 666 }, sending: false } },
        avatar: { avatar: { data: undefined, sending: false, error: undefined } },
        form: { searchForm: {} },
      },
      avatar: { avatar: { data: undefined, sending: false, error: undefined } },
      user: { _id: 666 },
      form: { searchForm: {} },
      fetch: sinon.spy(),
    }

    const state = {
      user: {
        user: { signIn: { data: { _id: 666 }, sending: false } },
      },
      avatar: { avatar: { data: undefined, sending: false } },
      form: { searchForm: {} },
    }

    it('should do nothing if props change is irrelevant', () => {
      let props = initialProps
      const Parent = stateToPropsComponent({ initialProps: props, component: App })
      const parent = TestUtils.findRenderedComponentWithType(
        renderIntoDocument(
          <Provider store={ _store }>
            <Parent { ...props } />
          </Provider>
        ),
        Parent
      )
      sinon.assert.notCalled(scrollToStub)
      parent.setState({
        ...props,
        whatever: 'whatever',
      })
      sinon.assert.notCalled(scrollToStub)
    })

    it('should do scroll to top if location change', () => {
      let props = initialProps
      const Parent = stateToPropsComponent({ initialProps: props, component: App })
      const parent = TestUtils.findRenderedComponentWithType(
        renderIntoDocument(
          <Provider store={ _store }>
            <Parent { ...props } />
          </Provider>
        ),
        Parent
      )
      sinon.assert.notCalled(scrollToStub)
      parent.setState({
        ...props,
        location: { pathname: 'machin' },
      })
      sinon.assert.calledWithExactly(scrollToStub, 0, 0)
    })

    it('should do scroll to top if location change (avatar sending true)', () => {
      let props = { ...initialProps, avatar: { sending: true } }
      const Parent = stateToPropsComponent({ initialProps: props, component: App })
      const parent = TestUtils.findRenderedComponentWithType(
        renderIntoDocument(
          <Provider store={ _store }>
            <Parent { ...props } />
          </Provider>
        ),
        Parent
      )
      sinon.assert.notCalled(scrollToStub)
      parent.setState({
        ...props,
        location: { pathname: 'machin' },
      })
      sinon.assert.calledWithExactly(scrollToStub, 0, 0)
    })

    it('should do scroll to top if location change (avatar error defined)', () => {
      let props = { ...initialProps, avatar: { error: 'true' } }
      const Parent = stateToPropsComponent({ initialProps: props, component: App })
      const parent = TestUtils.findRenderedComponentWithType(
        renderIntoDocument(
          <Provider store={ _store }>
            <Parent { ...props } />
          </Provider>
        ),
        Parent
      )
      sinon.assert.notCalled(scrollToStub)
      parent.setState({
        ...props,
        location: { pathname: 'machin' },
      })
      sinon.assert.calledWithExactly(scrollToStub, 0, 0)
    })

    it('should do scroll to top if location change (user undefined)', () => {
      let props = { ...initialProps, user: undefined }
      const Parent = stateToPropsComponent({ initialProps: props, component: App })
      const parent = TestUtils.findRenderedComponentWithType(
        renderIntoDocument(
          <Provider store={ _store }>
            <Parent { ...props } />
          </Provider>
        ),
        Parent
      )
      sinon.assert.notCalled(scrollToStub)
      parent.setState({
        ...props,
        location: { pathname: 'machin' },
      })
      sinon.assert.calledWithExactly(scrollToStub, 0, 0)
    })
  })
})
