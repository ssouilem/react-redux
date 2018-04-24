import React from 'react'
import { renderIntoDocument } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'
import ServiceCard from 'COMPONENTS/Services/ServiceCard'
import { Link } from 'react-router'

describe('(component) ServiceCard', () => {
  let _props

  it('should display a card with external link', () => {
    let component = getComponent({ title: 'hello', url: 'url', logo: 'jenkins.svg' })
    expect(TestUtils.scryRenderedComponentsWithType(component, Link)).to.have.length(0)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'img')).to.have.length(1)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'a')).to.have.length(1)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')).to.have.length(2)
  })

  it('should display a card with react link', () => {
    let component = getComponent({ title: 'hello', to: '/to', logo: 'jenkins.svg' })
    expect(TestUtils.scryRenderedComponentsWithType(component, Link)).to.have.length(1)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'img')).to.have.length(1)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')).to.have.length(2)
  })

  const getComponent = (item) => {
    _props = { item }
    return renderIntoDocument(<ServiceCard { ..._props } />)
  }
})
