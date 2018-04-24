/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import { slide as Menu } from 'react-burger-menu'
import { sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

import { default as BurgerMenu } from 'SHARED_COMPONENTS/BurgerMenu/BurgerMenu'

describe('(component) BurgerMenu', () => {
  let _props
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should contain slider burger menu component', () => {
    let component = getComponent()
    let menu = TestUtils.findRenderedComponentWithType(component, Menu)
    expect(menu.props.onStateChange).to.equal(_props.onBurgerStateChange)
    expect(menu.props.isOpen).to.be.false
  })

  it('should contain an opened slider burger menu component', () => {
    let component = getComponent(true)
    let menu = TestUtils.findRenderedComponentWithType(component, Menu)
    expect(menu.props.isOpen).to.be.true
  })

  const getComponent = (isOpen=false) => {
    _props = {
      handleBurgerClick: sandbox.spy(),
      searchBar: <p>element</p>,
      isOpen,
      links: [{ to: 'link1', text: 'Foo' }, { to: 'link2', text: 'Bar' }],
      onBurgerStateChange: sandbox.spy(),
    }
    return renderIntoDocument(<BurgerMenu { ..._props } />)
  }
})
