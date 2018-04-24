/* eslint no-unused-expressions: 0 */
import _ from 'lodash'

import React from 'react'

import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import { assert, sandbox } from 'sinon'

import TestUtils from 'react-addons-test-utils'

import Button from 'SHARED_COMPONENTS/Buttons/Button'

describe('(component) Button', () => {
  let _props

  beforeEach(() => {
    sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })

  it('should contain button and a right arrow image be default', () => {
    const component = getComponent({})
    const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button')
    expect(button).to.not.be.undefined
    assert.notCalled(_props.handleClick)
    TestUtils.Simulate.click(button)
    assert.calledOnce(_props.handleClick)
    expect(button).to.not.be.undefined
    expect(button.disabled).to.be.false
    expect(button.type).to.equal('button')
    expect(button.innerHTML).to.match(/someText/)
    expect(button.className).to.match(/aClassName/)
    let image = TestUtils.findRenderedDOMComponentWithTag(component, 'img')
    expect(image.className).to.match(/buttonArrowRight/)
  })

  it('should contain button and a left arrow image', () => {
    const component = getComponent({ leftArrow: true })
    const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button')
    expect(button).to.not.be.undefined
    assert.notCalled(_props.handleClick)
    TestUtils.Simulate.click(button)
    assert.calledOnce(_props.handleClick)
    expect(button).to.not.be.undefined
    expect(button.disabled).to.be.false
    expect(button.type).to.equal('button')
    expect(button.innerHTML).to.match(/someText/)
    expect(button.className).to.match(/aClassName/)
    let image = TestUtils.findRenderedDOMComponentWithTag(component, 'img')
    expect(image.className).to.match(/buttonArrowLeft/)
  })

  it('should pass other props (disabled and type)', () => {
    const component = getComponent({
      disabled: true,
      buttonType: 'submit',
    })
    const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button')
    expect(button.disabled).to.be.true
    expect(button.type).to.equal('submit')
  })

  _.each([
    {
      destructive: false,
      disabled: false,
      primary: false,
      secondary: false,
      classNameMatching: /buttons__buttonDefault/,
    },
    {
      destructive: false,
      disabled: true,
      leftArrow: true,
      primary: false,
      secondary: false,
      classNameMatching: /buttons__buttonDisabled/,
    },
    {
      destructive: false,
      disabled: false,
      leftArrow: true,
      primary: true,
      secondary: false,
      classNameMatching: /buttons__buttonPrimary/,
    },
    {
      destructive: false,
      disabled: false,
      primary: false,
      secondary: true,
      classNameMatching: /buttons__buttonSecondary/,
    },
    {
      destructive: false,
      disabled: true,
      primary: true,
      secondary: true,
      classNameMatching: /buttons__buttonDisabled/,
    },
    {
      destructive: false,
      disabled: false,
      leftArrow: true,
      primary: false,
      secondary: false,
      classNameMatching: /buttons__buttonDefault/,
    },
    {
      destructive: false,
      disabled: true,
      leftArrow: true,
      primary: false,
      secondary: false,
      classNameMatching: /buttons__buttonDisabled/,
    },
    {
      destructive: true,
      disabled: false,
      leftArrow: true,
      primary: false,
      secondary: false,
      classNameMatching: /buttons__buttonDestructive/,
    },
  ], ({ destructive, disabled, leftArrow, primary, secondary, classNameMatching }) => {
    it('should build className depending on props', () => {
      const component = getComponent({ destructive, disabled, leftArrow, primary, secondary })
      const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button')
      expect(button.className).to.match(classNameMatching)
    })
  })

  const getComponent = ({ destructive, disabled, primary, leftArrow, secondary, buttonType }) => {
    _props = {
      buttonType,
      className: 'aClassName',
      destructive,
      disabled,
      leftArrow,
      handleClick: sinon.spy(),
      primary,
      secondary,
      text: 'someText',
    }
    return renderIntoDocument(<Button { ..._props } />)
  }
})
