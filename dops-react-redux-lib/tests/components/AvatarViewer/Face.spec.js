/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import { DEFAULT_AVATAR } from 'SHARED_COMPONENTS/AvatarEditor/config/utils'
import Face from 'SHARED_COMPONENTS/AvatarViewer/Face'
import Eyes from 'SHARED_COMPONENTS/AvatarViewer/Eyes'
import Mouth from 'SHARED_COMPONENTS/AvatarViewer/Mouth'
import Hair from 'SHARED_COMPONENTS/AvatarViewer/Hair'
import Nose from 'SHARED_COMPONENTS/AvatarViewer/Nose'
import { sandbox } from 'sinon'
import TestUtils from 'react-addons-test-utils'

describe('(component) Face', () => {
  let _props
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should render the given avatar', () => {
    let component = getComponent(DEFAULT_AVATAR)
    let face = TestUtils.findRenderedComponentWithType(component, Face)
    let eyes = TestUtils.findRenderedComponentWithType(component, Eyes)
    let nose = TestUtils.findRenderedComponentWithType(component, Nose)
    let mouth = TestUtils.findRenderedComponentWithType(component, Mouth)
    let hair = TestUtils.findRenderedComponentWithType(component, Hair)
    expect(face.props).to.deep.equal(DEFAULT_AVATAR)
    expect(eyes.props).to.deep.equal(DEFAULT_AVATAR.eyes)
    expect(mouth.props).to.deep.equal(DEFAULT_AVATAR.mouth)
    expect(hair.props).to.deep.equal(DEFAULT_AVATAR.hair)
    expect(nose.props).to.deep.equal(DEFAULT_AVATAR.nose)
  })

  const getComponent = (avatar) => {
    _props = {
      hair: avatar.hair,
      eyes: avatar.eyes,
      mouth: avatar.mouth,
      nose: avatar.nose,
      face: avatar.face,
    }
    return renderIntoDocument(<Face { ..._props } />)
  }
})
