/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'
import ProjectGrid from 'COMPONENTS/Projects/ProjectGrid'
import ProjectCard from 'COMPONENTS/Projects/ProjectCard'

describe('(component) ProjectGrid', () => {
  let _props

  it('should display a card with react link', () => {
    let component = getComponent()
    expect(TestUtils.scryRenderedComponentsWithType(component, ProjectCard)).to.have.length(2)
  })

  const getComponent = () => {
    _props = {
      projects: [
        { name: 'hello', identifier: 'identifier' },
        { name: 'hello2', identifier: 'identifier2' },
      ],
    }
    return renderIntoDocument(<ProjectGrid { ..._props } />)
  }
})
