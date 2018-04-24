import React from 'react'
import { renderIntoDocument } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'
import SearchResult, { SearchItem } from 'COMPONENTS/SearchResult/SearchResult'

describe('(component) SearchResult', () => {
  let _props

  it('should display no result', () => {
    let component = getComponent()
    expect(TestUtils.scryRenderedComponentsWithType(component, SearchItem)).to.have.length(0)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[1].innerHTML).to.equal('Pas de résultats')
  })

  it('should contain list of result', () => {
    let component = getComponent([
      { 'preview': 'preview Foo', 'title': 'Foo', 'url': 'http://some.where/foo' },
      { 'preview': 'preview Bar', 'title': 'Bar', 'url': 'http://some.where/bar' },
    ])
    let items = TestUtils.scryRenderedComponentsWithType(component, SearchItem)
    expect(items.length).to.equal(2)
    checkSearchItem(items[0], 'Foo', 'http://some.where/foo', 'preview Foo')
    checkSearchItem(items[1], 'Bar', 'http://some.where/bar', 'preview Bar')
  })

  const checkSearchItem = (item, expectedTitle, expectedUrl, expectedPreview) => {
    let link = TestUtils.findRenderedDOMComponentWithTag(item, 'a')
    expect(link.href).to.equal(expectedUrl)
    expect(link.innerHTML).to.equal(expectedUrl)
    let divs = TestUtils.scryRenderedDOMComponentsWithTag(item, 'div')
    expect(divs[1].innerHTML).to.equal(expectedTitle)
    expect(divs[2].innerHTML).to.equal(expectedPreview)
  }

  const getComponent = (data) => {
    _props = { data }
    return renderIntoDocument(<SearchResult { ..._props } />)
  }
})
