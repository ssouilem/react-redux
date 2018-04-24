/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import { DEFAULT_AVATAR } from 'SHARED_COMPONENTS/AvatarEditor/config/utils'
import Eyes from 'SHARED_COMPONENTS/AvatarViewer/Eyes'
import Mouth from 'SHARED_COMPONENTS/AvatarViewer/Mouth'
import Hair from 'SHARED_COMPONENTS/AvatarViewer/Hair'
import Nose from 'SHARED_COMPONENTS/AvatarViewer/Nose'
import Face from 'SHARED_COMPONENTS/AvatarViewer/Face'
import { sandbox } from 'sinon'

import TestUtils from 'react-addons-test-utils'

import AvatarViewer from 'SHARED_COMPONENTS/AvatarViewer/AvatarViewer'

const ANOTHER_AVATAR = {
  face: {
    style: 'squareHair',
    color: '#FFFF',
  },
  hair: {
    style: 'squareHair',
    color: 'black',
  },
  eyes: {
    style: 'simpleEyes',
    color: 'blue',
  },
  mouth: {
    style: 'stylename',
    color: 'black',
  },
  nose: {
    style: 'stylename',
    color: 'red',
  },
}

describe('(component) AvatarViewer', () => {
  let _props
  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('should contain other react components and pass props', () => {
    let component = getComponent()
    let face = TestUtils.findRenderedComponentWithType(component, Face)
    let eyes = TestUtils.findRenderedComponentWithType(component, Eyes)
    let nose = TestUtils.findRenderedComponentWithType(component, Nose)
    let mouth = TestUtils.findRenderedComponentWithType(component, Mouth)
    let hair = TestUtils.findRenderedComponentWithType(component, Hair)
    expect(face.props).to.deep.equal({})
    expect(eyes.props).to.deep.equal(DEFAULT_AVATAR.eyes)
    expect(mouth.props).to.deep.equal(DEFAULT_AVATAR.mouth)
    expect(hair.props).to.deep.equal(DEFAULT_AVATAR.hair)
    expect(nose.props).to.deep.equal(DEFAULT_AVATAR.nose)
  })

  it('should render the given avatar', () => {
    let component = getComponent(ANOTHER_AVATAR)
    let face = TestUtils.findRenderedComponentWithType(component, Face)
    let eyes = TestUtils.findRenderedComponentWithType(component, Eyes)
    let nose = TestUtils.findRenderedComponentWithType(component, Nose)
    let mouth = TestUtils.findRenderedComponentWithType(component, Mouth)
    let hair = TestUtils.findRenderedComponentWithType(component, Hair)
    expect(face.props).to.deep.equal(ANOTHER_AVATAR)
    expect(eyes.props).to.deep.equal(ANOTHER_AVATAR.eyes)
    expect(mouth.props).to.deep.equal(ANOTHER_AVATAR.mouth)
    expect(hair.props).to.deep.equal(ANOTHER_AVATAR.hair)
    expect(nose.props).to.deep.equal(ANOTHER_AVATAR.nose)
  })
  const getComponent = (avatar = undefined) => {
    _props = {
      avatar: avatar,
    }
    return renderIntoDocument(<AvatarViewer { ..._props } />)
  }
})
