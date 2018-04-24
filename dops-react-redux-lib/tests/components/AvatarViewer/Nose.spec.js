/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import Nose from 'SHARED_COMPONENTS/AvatarViewer/Nose'
import styles from 'SHARED_COMPONENTS/AvatarViewer/AvatarViewer.less'
import { sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe('(component) Nose', () => {
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
    expect(div.className).to.equal(styles.nose)
  })

  const getComponent = () => {
    _props = {
      style: 'stylename',
      color: 'blue',
    }
    return renderIntoDocument(<Nose { ..._props } />)
  }
})
