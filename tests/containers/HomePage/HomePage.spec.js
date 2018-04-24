/* eslint no-unused-expressions: 0 */
import React from 'react'
import axios from 'axios'
import { Provider } from 'react-redux'
import ConnectedHomePage from 'containers/HomePage/HomePage'
import { actions as searchActions } from 'ACTIONS/search'
import Pagination from 'COMPONENTS/Pagination/Pagination'
import SearchResult from 'COMPONENTS/SearchResult/SearchResult'
import ServiceGrid from 'COMPONENTS/Services/ServiceGrid'
import { assert, sandbox } from 'sinon'
import { createMockStore, renderIntoDocument } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'

const SEARCH_RESULTS = [
  { 'preview': 'preview Foo', 'title': 'Foo', 'url': 'http://some.where/foo' },
  { 'preview': 'preview Bar', 'title': 'Bar', 'url': 'http://some.where/bar' },
]

describe('(containers) HomePage', () => {
  let _state, _store, _fetchSearch
  beforeEach(() => {
    sandbox.create()
    _fetchSearch = sandbox.stub()
    sandbox.stub(searchActions, 'searchRequest').returns(_fetchSearch)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should display home page content with Services and no SearchResult', () => {
    let container = getContainer()
    let divs = TestUtils.scryRenderedDOMComponentsWithTag(container, 'div')
    expect(divs[1].innerHTML).to.equal('Services')
    expect(TestUtils.scryRenderedComponentsWithType(container, ServiceGrid)).to.have.length(1)
  })

  it('should contain SearchResult', () => {
    const container = getContainer({ result: SEARCH_RESULTS, from: 0, total: 5 }, false, 'search bar')
    let searchResult = TestUtils.findRenderedComponentWithType(container, SearchResult)
    expect(searchResult.props.data).to.deep.equal(SEARCH_RESULTS)
  })

  it('should not contain SearchResult if query.q is not defined', () => {
    const container = getContainer({ result: SEARCH_RESULTS, from: 0, total: 5 }, false)
    expect(TestUtils.scryRenderedComponentsWithType(container, SearchResult)).to.have.length(0)
  })

  it('should contain Pagination components when SEARCH_RESULTS is defined', () => {
    const container = getContainer({ result: SEARCH_RESULTS, from: 0, total: 5 }, false, 'search qux')
    let pagination = TestUtils.findRenderedComponentWithType(container, Pagination)
    expect(pagination.props.currentPage).to.equal(1)
    expect(pagination.props.pageCount).to.equal(1)
    expect(pagination.props.handleClick).to.not.be.undefined
  })

  it('should not contain Pagination if query.q is not defined', () => {
    const container = getContainer({ result: SEARCH_RESULTS, from: 0, total: 5 }, false)
    expect(TestUtils.scryRenderedComponentsWithType(container, Pagination)).to.have.length(0)
  })

  it('should handle Pagination click', () => {
    const container = getContainer({ result: SEARCH_RESULTS, from: 10, total: 22 }, false, 'search foo')
    _fetchSearch.reset()
    let pagination = TestUtils.findRenderedComponentWithType(container, Pagination)
    expect(pagination.props.currentPage).to.equal(2)
    expect(pagination.props.pageCount).to.equal(3)
    expect(pagination.props.handleClick).to.not.be.undefined
    sandbox.stub(axios, 'get').returns(Promise.resolve(
      { data: { result: ['search 1', 'search 2'], from: 0, total: 10 } }))
    pagination.props.handleClick(2)
    assert.notCalled(_fetchSearch)
    pagination.props.handleClick(3)
    assert.calledWithExactly(_fetchSearch, 'search foo', 10, 20)
    pagination.props.handleClick(1)
    assert.calledWithExactly(_fetchSearch, 'search foo', 10, 0)
  })

  it('should not fetch search when already fetching', () => {
    getContainer(undefined, true)
    assert.notCalled(_fetchSearch)
  })

  it('should not fetch search if query.q is undefined', () => {
    getContainer(undefined, false)
    assert.notCalled(_fetchSearch)
  })

  it('should fetch search even when search already fetched', () => {
    getContainer({ result: SEARCH_RESULTS, from: 20, total: 42 }, false, 'search quux')
    assert.calledWithExactly(_fetchSearch, 'search quux', 10, 0)
  })

  const getContainer = (data, sending, q) => {
    _state = {
      search: { data, sending },
    }
    _store = createMockStore(_state)
    let props = {
      location: { query: { q } },
    }
    return renderIntoDocument(<Provider store={ _store }><ConnectedHomePage { ...props } /></Provider>)
  }
})
