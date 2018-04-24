import _ from 'lodash'
import React from 'react'
import { FormattedMessage, IntlProvider } from 'react-intl'
import messages from 'SHARED_INTL/lang/en.json'
import TestUtils from 'react-addons-test-utils'

export const renderIntoDocument = (component) => (
  TestUtils.renderIntoDocument(
    <IntlProvider locale='en' messages={ messages }>
      { component }
    </IntlProvider>)
)

export const createMockStore = (state) => ({
  dispatch: sinon.spy(),
  getState: () => state,
  subscribe: () => sinon.spy(),
})

export const stateToPropsComponent = ({ initialProps, component }) => (
  class A extends React.Component {
    state = initialProps
    render = () => React.createElement(component, this.state, null)
  }
)

export const checkAllMessageIdsArePresent = (container, messageIds) => {
  const messages = TestUtils.scryRenderedComponentsWithType(container, FormattedMessage)
  return _.every(messageIds, (id) => _.find(messages, (message) => message.props.id === id) !== undefined)
}

export const checkAllMessageIdsAreAbsent = (container, messageIds) => {
  const messages = TestUtils.scryRenderedComponentsWithType(container, FormattedMessage)
  return _.every(messageIds, (id) => _.find(messages, (message) => message.props.id === id) === undefined)
}
