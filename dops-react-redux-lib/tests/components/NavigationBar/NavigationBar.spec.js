/* eslint no-unused-expressions: 0 */
import React from 'react'

import { Link } from 'react-router'

import { renderIntoDocument, createMockStore } from 'SHARED_TESTS/testHelpers'
import { assert, sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'
import { Provider } from 'react-redux'
import BurgerMenu from 'SHARED_COMPONENTS/BurgerMenu/BurgerMenu'
import NavigationBar from 'SHARED_COMPONENTS/NavigationBar/NavigationBar'

class SomeChildren extends React.Component {
  render () {
    return (<div />)
  }
}

describe('(component) NavigationBar', () => {
  let _props, _state, _store
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should display Links and connection when user is undefined', () => {
    let component = getComponent()
    const links = TestUtils.scryRenderedComponentsWithType(component, Link)
    expect(links).to.have.length(4)
    expect(links[0].props.to).to.equal('/')
    expect(links[1].props.to).to.equal('link1')
    expect(links[2].props.to).to.equal('link2')
    expect(links[3].props.to).to.equal('/connexion')
    expect(TestUtils.findRenderedDOMComponentWithTag(links[1], 'a').innerHTML).to.equal('Foo')
    expect(TestUtils.findRenderedDOMComponentWithTag(links[2], 'a').innerHTML).to.equal('Bar')
    expect(TestUtils.findRenderedDOMComponentWithTag(links[3], 'span').innerHTML).to.match(/Se Connecter/)
  })

  it('should display Links and deconnection when user is defined', () => {
    let component = getComponent({ user: 'someone' })
    const links = TestUtils.scryRenderedComponentsWithType(component, Link)
    expect(links).to.have.length(3)
    expect(links[0].props.to).to.equal('/')
    expect(links[1].props.to).to.equal('link1')
    expect(links[2].props.to).to.equal('link2')
    expect(TestUtils.findRenderedDOMComponentWithTag(links[1], 'a').innerHTML).to.equal('Foo')
    expect(TestUtils.findRenderedDOMComponentWithTag(links[2], 'a').innerHTML).to.equal('Bar')
  })

  it('should invoke signOut when clicking on deconnection', () => {
    let component = getComponent({ user: 'someone' })
    const imgs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'img')
    TestUtils.Simulate.click(imgs[1])
    sinon.assert.calledWithExactly(_props.signOut, sinon.match.any)
  })

  it('should display user', () => {
    let component = getComponent({ user: 'this is the user' })
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
    expect(divs[9].innerHTML).to.match(/this is the user/)
  })

  it('should display search bar', () => {
    let component = getComponent({ user: 'this is the user' })
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')
    expect(inputs[0]).to.not.be.undefined
  })

  it('should handle click on user', () => {
    let handleUserClick = sandbox.spy()
    let component = getComponent({ user: 'this is the user', handleUserClick })
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
    TestUtils.Simulate.click(divs[10])
    assert.calledWithExactly(handleUserClick)
  })

  it('should contain an additionalComponent if any', () => {
    let component = getComponent({ additionalComponent: <SomeChildren /> })
    expect(TestUtils.findRenderedComponentWithType(component, SomeChildren)).to.not.be.undefined
  })

  it('should contain burger menu', () => {
    let component = getComponent({ isOpen: true })
    const menu = TestUtils.findRenderedComponentWithType(component, BurgerMenu)
    expect(menu.props.isOpen).to.be.true
    expect(menu.props.links).to.equal(_props.links)
    menu.props.handleBurgerClick()
    assert.calledWithExactly(_props.handleBurgerClick)
    menu.props.onBurgerStateChange()
    assert.calledWithExactly(_props.onBurgerStateChange)
  })

  const getComponent = (props) => {
    _props = {
      ...props,
      handleBurgerClick: sandbox.spy(),
      links: [{ to: 'link1', text: 'Foo' }, { to: 'link2', text: 'Bar' }],
      onBurgerStateChange: sandbox.spy(),
      signOut: sandbox.spy(),
      loginLink: '/connexion',
      logoLink: '/',
    }
    _state = { form: { searchForm: {} } }
    _store = createMockStore(_state)
    return renderIntoDocument(
      <Provider store={ _store }>
        <NavigationBar { ..._props } />
      </Provider>)
  }
})
