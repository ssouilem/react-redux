import React from 'react'
import { renderIntoDocument } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'
import ProjectCard from 'COMPONENTS/Projects/ProjectCard'
import { Link } from 'react-router'

describe('(component) ProjectCard', () => {
  let _props

  it('should display a card with react link', () => {
    let component = getComponent({ name: 'hello', identifier: 'identifier' })
    let link = TestUtils.scryRenderedComponentsWithType(component, Link)
    expect(link).to.have.length(1)
    let divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
    expect(divs[1].innerHTML).to.equal('hello')
    expect(link[0].props.to).to.equal('https://erebor.dops.open.global/projects/identifier')
  })

  const getComponent = (item) => {
    _props = { item }
    return renderIntoDocument(<ProjectCard { ..._props } />)
  }
})
