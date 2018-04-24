/* eslint no-unused-expressions: 0 */
import React from 'react'
import { default as Pagination } from 'COMPONENTS/Pagination/Pagination'
import { renderIntoDocument } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'
import { assert, sandbox } from 'sinon'

describe('(component) Pagination', () => {
  beforeEach(() => {
    sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should display of numbers from 0 to page count when page count is less than or equal to 10 ', () => {
    checkNumbersDisplayed(1, 7, ['1', '2', '3', '4', '5', '6', '7'])
    checkNumbersDisplayed(4, 7, ['1', '2', '3', '4', '5', '6', '7'])
    checkNumbersDisplayed(7, 7, ['1', '2', '3', '4', '5', '6', '7'])
  })

  it('should display numbers when page count is greater than 10 ', () => {
    checkNumbersDisplayed(1, 12, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
    checkNumbersDisplayed(6, 12, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
    checkNumbersDisplayed(7, 12, ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11'])
    checkNumbersDisplayed(11, 12, ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
    checkNumbersDisplayed(12, 12, ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
    checkNumbersDisplayed(12, 22, ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16'])
  })

  const checkNumbersDisplayed = (currentPage, pageCount, expectedNumbers) => {
    let props = { currentPage: currentPage, pageCount: pageCount, handleClick: sandbox.spy() }
    const component = getComponent(props)
    let divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
    const texts = divs.map((div) => (div.innerHTML)).slice(2, divs.length - 1)
    expect(texts).to.deep.equal(expectedNumbers)
  }

  it('should not have no number displayed when only one page count', () => {
    let props = { currentPage: 1, pageCount: 1, handleClick: sandbox.spy() }
    const component = getComponent(props)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')).to.have.length(0)
  })

  it('should have a previous and next button', () => {
    let props = { currentPage: 2, pageCount: 8, handleClick: sandbox.spy() }
    const component = getComponent(props)
    let buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    expect(buttons).to.have.length(2)
    expect(buttons[0].innerHTML).to.match(/PRÉCÉDENT/)
    expect(buttons[1].innerHTML).to.match(/SUIVANT/)
  })

  it('should not have a previous and next button when only one page count', () => {
    let props = { currentPage: 1, pageCount: 1, handleClick: sandbox.spy() }
    const component = getComponent(props)
    let buttons = TestUtils.scryRenderedComponentsWithType(component, 'button')
    expect(buttons).to.have.length(0)
  })

  it('should have a list of clickable div for all numbers except for the current page ', () => {
    checkClickablesDivs(3, 7)
    checkClickablesDivs(3, 12)
    checkClickablesDivs(11, 11)
    checkClickablesDivs(11, 22)
  })

  it('should have clickable previous and next button', () => {
    let props = { currentPage: 2, pageCount: 8, handleClick: sandbox.spy() }
    const component = getComponent(props)
    let buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    let previous = buttons[0]
    expect(previous).not.to.be.disabled
    TestUtils.Simulate.click(previous)
    assert.calledWithExactly(props.handleClick, 1, sinon.match.any)
    let next = buttons[1]
    expect(next).not.to.be.disabled
    TestUtils.Simulate.click(next)
    assert.calledWithExactly(props.handleClick, 3, sinon.match.any)
  })

  it('should have a not clickable previous button when current page is 1', () => {
    let props = { currentPage: 1, pageCount: 8, handleClick: sandbox.spy() }
    const component = getComponent(props)
    let buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    let previous = buttons[0]
    expect(previous).to.be.disabled
    let next = buttons[1]
    expect(next).not.to.be.disabled
  })

  it('should have a not clickable next button when current page is page count', () => {
    let props = { currentPage: 8, pageCount: 8, handleClick: sandbox.spy() }
    const component = getComponent(props)
    let buttons = TestUtils.scryRenderedDOMComponentsWithTag(component, 'button')
    let previous = buttons[0]
    expect(previous).not.to.be.disabled
    let next = buttons[1]
    expect(next).to.be.disabled
  })

  const checkClickablesDivs = (currentPage, pageCount) => {
    let props = { currentPage: currentPage, pageCount: pageCount, handleClick: sandbox.spy() }
    const component = getComponent(props)
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
    expect(divs.length).to.not.equal(0)
    divs.map((div, index) => {
      if (index > 1 && index < divs.length - 1) {
        TestUtils.Simulate.click(div)
        let pageNumber = parseInt(div.innerHTML, 10)
        if (pageNumber !== props.currentPage) {
          assert.calledWithExactly(props.handleClick, pageNumber, sinon.match.any)
        }
      }
    })
    expect(props.handleClick.callCount).to.equal(Math.min(9, pageCount - 1))
  }

  const getComponent = (props) => {
    return renderIntoDocument(<Pagination { ...props } />)
  }
})
