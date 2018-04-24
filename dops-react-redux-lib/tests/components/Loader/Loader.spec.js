/* eslint no-unused-expressions: 0 */
import React from 'react'
import Loader from 'SHARED_COMPONENTS/Loader/Loader'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import Spinner from 'react-spinkit'
import TestUtils from 'react-addons-test-utils'

describe('(component) Loader', () => {
  it('should render two divs', () => {
    const component = getComponent()
    let loader = TestUtils.findRenderedComponentWithType(component, Spinner)
    expect(loader).to.not.be.undefined
  })

  const getComponent = (data) => {
    return renderIntoDocument(<Loader />)
  }
})
