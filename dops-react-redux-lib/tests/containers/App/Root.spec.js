/* eslint no-unused-expressions: 0 */
import React from 'react'
import { browserHistory, Route, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { default as Root } from 'SHARED_CONTAINERS/App/Root'
import { createMockStore, renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'
import { assert, sandbox } from 'sinon'

const DumbComponent = () => (
  <div>Dumb Component</div>
)

describe('(containers) Root', () => {
  let _props
  beforeEach(() => {
    sandbox.create()
    let store = createMockStore({ router: {}, toaster: { data: undefined } })
    const history = syncHistoryWithStore(browserHistory, store, {
      selectLocationState: (state) => state.router,
    })
    _props={
      history: history,
      logPageView: sandbox.spy(),
      routerKey: 'a key',
      routes: <Route path='/context.html' component={ DumbComponent } />,
      store: store,
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('Should call logPageView onUpdate', () => {
    renderIntoDocument(<Root { ..._props } />)
    expect(location.pathname).to.equal('/context.html')
    assert.calledOnce(_props.logPageView)
  })

  it('should contain a Provider and Router', () => {
    let container = renderIntoDocument(<Root { ..._props } />)
    let provider = TestUtils.findRenderedComponentWithType(container, Provider)
    expect(provider.props.store).to.equal(_props.store)
    let router = TestUtils.findRenderedComponentWithType(provider, Router)
    expect(router.props.children).to.equal(_props.routes)
    expect(router.props.history).to.equal(_props.history)
    expect(router.props.onUpdate).to.equal(_props.logPageView)
  })
})
