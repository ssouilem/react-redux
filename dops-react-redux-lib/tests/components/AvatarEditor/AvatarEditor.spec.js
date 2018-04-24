/* eslint no-unused-expressions: 0 */
import React from 'react'
import { CirclePicker } from 'react-color'
import AvatarEditor, { ClickableLabel, Arrow } from '../../../src/components/AvatarEditor/AvatarEditor'
import AvatarViewer from '../../../src/components/AvatarViewer/AvatarViewer'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import { DEFAULT_AVATAR } from 'SHARED_COMPONENTS/AvatarEditor/config/utils'
import Button from 'SHARED_COMPONENTS/Buttons/Button'
import { FormattedMessage } from 'react-intl'
import TestUtils from 'react-addons-test-utils'
import { assert, sandbox } from 'sinon'

describe('(componenent) AvatarEditor', () => {
  let _props, _create, _update

  beforeEach(() => {
    sandbox.create()
    _create = sandbox.spy()
    _update = sandbox.spy()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should display AvatarEditor content', () => {
    const container = getContainer()
    let avatarViewer = TestUtils.findRenderedComponentWithType(container, AvatarViewer)
    let circlePicker = TestUtils.findRenderedComponentWithType(container, CirclePicker)
    let buttons = TestUtils.scryRenderedComponentsWithType(container, Button)
    let formattedMessage = TestUtils.scryRenderedComponentsWithType(container, FormattedMessage)
    let clickableLabels = TestUtils.scryRenderedComponentsWithType(container, ClickableLabel)
    expect(avatarViewer).to.not.be.undefined
    expect(circlePicker).to.not.be.undefined
    expect(buttons).to.have.length(2)
    expect(clickableLabels).to.have.length(5)
    expect(formattedMessage).to.have.length(9)
  })

  it('Should do _handlePartClick on click.', () => {
    const container = getContainer()
    let setStateStub = sandbox.stub(AvatarEditor.prototype, 'setState')
    let clickableLabel = TestUtils.scryRenderedComponentsWithType(container, ClickableLabel)
    let div = TestUtils.findRenderedDOMComponentWithTag(clickableLabel[0], 'div')
    expect(clickableLabel).to.have.length(5)
    TestUtils.Simulate.click(div)
    assert.calledWithExactly(setStateStub, { selectedPart: 'face' })
  })

  it('Should call setState with the right argument when avatar props is set', () => {
    const container = getContainer()
    let setStateStub = sandbox.stub(AvatarEditor.prototype, 'setState')
    let circlePicker = TestUtils.findRenderedComponentWithType(container, CirclePicker)
    expect(circlePicker).to.not.be.undefined
    circlePicker.props.onChangeComplete({ hex: '#SSS' })
    assert.calledWith(setStateStub, {
      avatar: {
        face: { style: 'squareFace', color: '#SSS' },
        hair: { style: 'zigzagHair', color: '#cddc39' },
        eyes: { style: 'retinaStar', color: '#8bc34a' },
        mouth: { style: 'homerMouth', color: '#cddc39' },
        nose: { style: 'crossNose', color: '#cddc39' },
      },
    })
  })

  it('Should call left arrow function when clicked on it', () => {
    const container = getContainer()
    let setStateStub = sandbox.stub(AvatarEditor.prototype, 'setState')
    let arrows = TestUtils.scryRenderedComponentsWithType(container, Arrow)
    expect(arrows).to.have.length(2)
    let event = { preventDefault: sandbox.spy() }
    arrows[0].props.handleClick(event)
    assert.calledOnce(event.preventDefault)
    assert.calledWithExactly(setStateStub, {
      selectedStyle: 4,
      avatar: {
        face: { color: '#8bc34a', style: 'bevelFace' },
        eyes: { color: '#8bc34a', style: 'retinaStar' },
        hair: { color: '#cddc39', style: 'zigzagHair' },
        mouth: { color: '#cddc39', style: 'homerMouth' },
        nose: { color: '#cddc39', style: 'crossNose' },
      },
    })
  })

  it('Should call left arrow function when clicked on it and not negative selectedStyle', () => {
    const container = getContainer()
    let arrows = TestUtils.scryRenderedComponentsWithType(container, Arrow)
    expect(arrows).to.have.length(2)
    let event = { preventDefault: sandbox.spy() }
    arrows[0].props.handleClick(event)
    let setStateStub = sandbox.stub(AvatarEditor.prototype, 'setState')
    arrows[0].props.handleClick(event)
    assert.calledTwice(event.preventDefault)
    assert.calledWithExactly(setStateStub, {
      selectedStyle: 3,
      avatar: {
        face: { color: '#8bc34a', style: 'triangleFace' },
        eyes: { color: '#8bc34a', style: 'retinaStar' },
        hair: { color: '#cddc39', style: 'zigzagHair' },
        mouth: { color: '#cddc39', style: 'homerMouth' },
        nose: { color: '#cddc39', style: 'crossNose' },
      },
    })
  })

  it('Should call right arrow function when clicked on it', () => {
    const container = getContainer()
    let setStateStub = sandbox.stub(AvatarEditor.prototype, 'setState')
    let arrows = TestUtils.scryRenderedComponentsWithType(container, Arrow)
    expect(arrows).to.have.length(2)
    let event = { preventDefault: sandbox.spy() }
    arrows[1].props.handleClick(event)
    assert.calledOnce(event.preventDefault)
    assert.calledWithExactly(setStateStub, {
      selectedStyle: 1,
      avatar: {
        eyes: { color: '#8bc34a', style: 'retinaStar' },
        face: { color: '#8bc34a', style: 'polygoneFace' },
        hair: { color: '#cddc39', style: 'zigzagHair' },
        mouth: { color: '#cddc39', style: 'homerMouth' },
        nose: { color: '#cddc39', style: 'crossNose' },
      },
    })
  })

  it('Should call _handleSubmit and create', () => {
    const container = getContainer()
    let button = TestUtils.scryRenderedComponentsWithType(container, Button)
    expect(button[0]).to.not.be.undefined
    button[0].props.handleClick()
    assert.calledOnce(_create)
    assert.notCalled(_update)
  })

  it('Should call _handleSubmit and update', () => {
    const container = getContainer(DEFAULT_AVATAR)
    let buttons = TestUtils.scryRenderedComponentsWithType(container, Button)
    expect(buttons[0]).to.not.be.undefined
    buttons[0].props.handleClick()
    assert.calledOnce(_update)
    assert.notCalled(_create)
  })

  it('Should call _handleRandom and update', () => {
    const container = getContainer(DEFAULT_AVATAR)
    let setStateStub = sandbox.stub(AvatarEditor.prototype, 'setState')
    let buttons = TestUtils.scryRenderedComponentsWithType(container, Button)
    expect(buttons[1]).to.not.be.undefined
    buttons[1].props.handleClick()
    assert.calledOnce(setStateStub)
  })

  const getContainer = (avatar = undefined) => {
    _props = {
      create: _create,
      update: _update,
      avatar,
    }
    return renderIntoDocument(
      <AvatarEditor { ..._props } />
    )
  }
})
