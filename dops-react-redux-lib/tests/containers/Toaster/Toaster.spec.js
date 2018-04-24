/* eslint no-unused-expressions: 0 */
import React from 'react'
import { Provider } from 'react-redux'
import { createMockStore, renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import { sandbox } from 'sinon'
import Toast from 'SHARED_COMPONENTS/Toaster/Toast'
import Toaster from 'SHARED_CONTAINERS/Toaster/Toaster'
import TestUtils from 'react-addons-test-utils'

describe('(containers) Toaster', () => {
  let _state, _store
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should not contain toast if no data', () => {
    const containerProvider = getContainer()
    const toast = TestUtils.findRenderedComponentWithType(containerProvider, Toast)
    expect(toast.props.handleClose).to.be.a('function')
    expect(toast.props.item).to.be.undefined
  })

  it('should not contain toast and pass props if data', () => {
    const containerProvider = getContainer('someData')
    const toast = TestUtils.findRenderedComponentWithType(containerProvider, Toast)
    expect(toast.props.handleClose).to.be.a('function')
    expect(toast.props.item).to.equal('someData')
  })

  const getContainer = (data=undefined) => {
    _state = { toaster: { data } }
    _store = createMockStore(_state)
    return renderIntoDocument(<Provider store={ _store }><Toaster /></Provider>)
  }
})
