/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'
import ServiceGrid from 'COMPONENTS/Services/ServiceGrid'
import ServiceCard from 'COMPONENTS/Services/ServiceCard'

describe('(component) ServiceGrid', () => {
  let _props

  it('should display a card with react link', () => {
    let component = getComponent()
    expect(TestUtils.scryRenderedComponentsWithType(component, ServiceCard)).to.have.length(4)
  })

  const getComponent = () => {
    _props = { }
    return renderIntoDocument(<ServiceGrid { ..._props } />)
  }
})
