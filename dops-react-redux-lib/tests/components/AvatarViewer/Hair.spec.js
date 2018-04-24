/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import Hair from 'SHARED_COMPONENTS/AvatarViewer/Hair'
import styles from 'SHARED_COMPONENTS/AvatarViewer/AvatarViewer.less'
import { sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe('(component) Hair', () => {
  let _props
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should contain hair div', () => {
    let component = getComponent()
    let div = TestUtils.findRenderedDOMComponentWithTag(component, 'div')
    expect(div.className).to.equal(styles.squareHair)
  })

  const getComponent = () => {
    _props = {
      style: 'squareHair',
      color: 'blue',
    }
    return renderIntoDocument(<Hair { ..._props } />)
  }
})
