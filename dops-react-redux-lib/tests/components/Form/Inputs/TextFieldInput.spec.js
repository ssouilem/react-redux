/* eslint no-unused-expressions: 0 */
import React from 'react'
import { renderIntoDocument } from 'SHARED_TESTS/testHelpers'
import TestUtils from 'react-addons-test-utils'
import TextFieldInput from 'SHARED_COMPONENTS/Form/Inputs/TextFieldInput'

describe('(component) TextFieldInput', () => {
  let _props

  it('should contain other elements when no props', () => {
    const textFieldInput = getComponent({})
    const divs = TestUtils.scryRenderedDOMComponentsWithTag(textFieldInput, 'div')
    expect(divs).to.have.length(4)
  })

  describe('fieldName div', () => {
    it('should contain name and have default style', () => {
      const textFieldInput = getComponent({})
      const divs = TestUtils.scryRenderedDOMComponentsWithTag(textFieldInput, 'div')
      expect(divs[2].innerHTML).to.equal('aFieldName')
      const matchResult = divs[2].className.match(new RegExp('labelStyle'))
      expect(matchResult).not.to.be.null
      expect(matchResult).to.have.length(1)
    })
  })

  describe('hint div', () => {
    it('should contain div, hint and have default style', () => {
      const textFieldInput = getComponent({
        fieldHint: 'iAmAHint',
        input: { value: '' },
      })
      const divs = TestUtils.scryRenderedDOMComponentsWithTag(textFieldInput, 'div')
      expect(divs).to.have.length(5)
      expect(divs[3].innerHTML).to.equal('iAmAHint')
      const matchResult = divs[3].className.match(new RegExp('hintStyle'))
      expect(matchResult).not.to.be.null
      expect(matchResult).to.have.length(1)
    })
  })

  describe('error div', () => {
    it('should contain error', () => {
      const textFieldInput = getComponent({
        meta: { valid: false, touched: true, error: 'anError' },
      })
      const divs = TestUtils.scryRenderedDOMComponentsWithTag(textFieldInput, 'div')
      expect(divs[3].innerHTML).to.equal('anError')
      const matchResult = divs[3].className.match(new RegExp('errorStyle'))
      expect(matchResult).not.to.be.null
      expect(matchResult).to.have.length(1)
    })
  })

  describe('input', () => {
    it('should have default props', () => {
      const textFieldInput = getComponent({})
      const input = TestUtils.findRenderedDOMComponentWithTag(textFieldInput, 'input')
      expect(input.style.color).to.equal('')
      expect(input.type).to.equal('text')
      expect(input.disabled).to.be.false
      const matchResult = input.className.match(new RegExp('inputStyle'))
      expect(matchResult).not.to.be.null
      expect(matchResult).to.have.length(1)
    })

    it('should have custom props', () => {
      const textFieldInput = getComponent({
        disabled: true,
        input: { value: 'someValue' },
        type: 'password',
      })
      const input = TestUtils.findRenderedDOMComponentWithTag(textFieldInput, 'input')
      expect(input.disabled).to.be.true
      expect(input.type).to.equal('password')
      expect(input.value).to.equal('someValue')
    })
  })

  const getComponent = ({ disabled, fieldHint, fieldName='aFieldName', input={}, meta={}, type }) => {
    _props = {
      disabled,
      fieldHint,
      fieldName,
      input,
      meta,
      type,
    }
    return renderIntoDocument(<TextFieldInput { ..._props } />)
  }
})
