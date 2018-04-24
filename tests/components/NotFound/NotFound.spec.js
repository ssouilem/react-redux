/* eslint no-unused-expressions: 0 */
import React from 'react'

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import NotFound from 'COMPONENTS/NotFound/NotFoundPage'
import { renderIntoDocument } from 'TESTS/testHelpers'
import { sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

class SomeChildren extends React.Component {
  render () {
    return (<div />)
  }
}

describe('(containers) NotFound', () => {
  beforeEach(() => {
    sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should display NavigationBar and children', () => {
    const container = getContainer()
    const link = TestUtils.findRenderedComponentWithType(container, Link)
    expect(link).to.not.be.undefined
    const message = TestUtils.findRenderedComponentWithType(link, FormattedMessage)
    expect(message.props.id).to.equal('notfound.button.back')
  })

  const getContainer = () => {
    return renderIntoDocument(<NotFound children={ <SomeChildren /> } />)
  }
})
