/* eslint no-unused-expressions: 0 */
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Field } from 'redux-form'
import { assert } from 'sinon'
import { Provider } from 'react-redux'
import { createMockStore, renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import SearchForm from 'SHARED_CONTAINERS/SearchForm/SearchForm'
import TestUtils from 'react-addons-test-utils'

describe('(container) SearchForm', () => {
  let _props, _state, _store, _handleSubmit
  it('Should have a form.', () => {
    const container = getContainer()
    expect(TestUtils.scryRenderedDOMComponentsWithTag(container, 'form')).to.have.length(1)
  })

  it('should contain Fields, FormattedMessage', () => {
    const container = getContainer(undefined)
    const formattedMessages = TestUtils.scryRenderedComponentsWithType(container, FormattedMessage)
    expect(formattedMessages.map((formattedMessage) => formattedMessage.props.id)).to.deep.equal([
      'navbar.search.field',
    ])
    const fields = TestUtils.scryRenderedComponentsWithType(container, Field)
    expect(fields.length).to.equal(1)
    expect(fields[0].props.name).to.equal('search')
  })

  it('should call handleSubmit on submit', () => {
    const container = getContainer({ search: 'fieldValue' })
    const form = TestUtils.findRenderedDOMComponentWithTag(container, 'form')
    TestUtils.Simulate.submit(form)
    assert.calledWithExactly(_handleSubmit, 'fieldValue')
  })

  it('should not call handleSubmit on submit', () => {
    const container = getContainer({})
    const form = TestUtils.findRenderedDOMComponentWithTag(container, 'form')
    TestUtils.Simulate.submit(form)
    assert.notCalled(_handleSubmit)
  })

  const getContainer = (values) => {
    _handleSubmit = sinon.spy()
    _state = { form: { searchForm: { values } } }
    _props = {
      handleSubmit: _handleSubmit,
    }
    _store = createMockStore(_state)

    return renderIntoDocument(
      <Provider store={ _store }>
        <SearchForm { ..._props } />
      </Provider>
    )
  }
})
