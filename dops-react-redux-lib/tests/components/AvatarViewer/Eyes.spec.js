/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import Eyes from 'SHARED_COMPONENTS/AvatarViewer/Eyes'
import styles from 'SHARED_COMPONENTS/AvatarViewer/AvatarViewer.less'
import { sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe('(component) Eyes', () => {
  let _props
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should contain one eyeContainer and two eyeRetina', () => {
    let component = getComponent()
    let divs = TestUtils.scryRenderedDOMComponentsWithTag(component, 'div')
    expect(divs).to.have.length(5)
    let eyeContainer = divs[1]
    let eyeRetina = divs[2]
    expect(eyeContainer.className).to.equal(styles.simpleEyeContainer)
    expect(eyeRetina.className).to.equal(styles.simpleEyeRetina)
  })

  const getComponent = () => {
    _props = {
      style: 'simpleEyes',
      color: 'blue',
    }
    return renderIntoDocument(<Eyes { ..._props } />)
  }
})
