import React from 'react'
import Toast from 'COMPONENTS/Toaster/Toast'
import { renderIntoDocument } from 'TESTS/testHelpers'
import { assert, sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe('(component) Toast', () => {
  let _props
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should render title and message', () => {
    const component = getComponent({ message: 'a message', title: 'a title' })
    let divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
    expect(divs[1].innerHTML).to.equal('a title')
    expect(divs[2].innerHTML).to.equal('a message')
  })

  it('should render a not opened Toast with no error className', () => {
    const component = getComponent()
    let div = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
    expect(div.className).to.match(/Toast__toast/)
    expect(div.className).to.not.match(/Toast__toastOpen/)
    expect(div.className).to.not.match(/Toast__toastError/)
  })

  it('should render an opened Toast with no error className', () => {
    const component = getComponent({})
    let div = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
    expect(div.className).to.match(/Toast__toast/)
    expect(div.className).to.match(/Toast__toastOpen/)
    expect(div.className).to.not.match(/Toast__toastError/)
  })

  it('should render an opened Toast with error className', () => {
    const component = getComponent({ error: true })
    let div = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')[0]
    expect(div.className).to.match(/Toast__toast/)
    expect(div.className).to.match(/Toast__toastOpen/)
    expect(div.className).to.match(/Toast__toastError/)
  })

  it('should handle close', () => {
    const component = getComponent({ error: true })
    let img = TestUtils.findRenderedDOMComponentWithTag(component, 'img')
    assert.notCalled(_props.handleClose)
    TestUtils.Simulate.click(img)
    assert.calledOnce(_props.handleClose)
    assert.calledWithExactly(_props.handleClose)
  })

  const getComponent = (data) => {
    _props = { handleClose: sandbox.spy(), item: data }
    return renderIntoDocument(<Toast { ..._props } />)
  }
})
