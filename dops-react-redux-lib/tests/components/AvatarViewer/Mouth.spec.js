/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import Mouth from 'SHARED_COMPONENTS/AvatarViewer/Mouth'
import styles from 'SHARED_COMPONENTS/AvatarViewer/AvatarViewer.less'
import { sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe('(component) Mouth', () => {
  let _props
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should contain 2 lips and 1 teeth block', () => {
    let component = getComponent()
    let divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
    expect(divs).to.have.length(4)
    let upperLip = divs[1]
    let teeth = divs[2]
    let bottomLip = divs[3]
    expect(upperLip.className).to.equal(styles.upperLip)
    expect(bottomLip.className).to.equal(styles.bottomLip)
    expect(teeth.className).to.equal(styles.teeth)
  })

  const getComponent = () => {
    _props = {
      style: 'stylename',
      color: 'blue',
    }
    return renderIntoDocument(<Mouth { ..._props } />)
  }
})
