import React from 'react'
import { AVATAR_SHAPE_SHARED_COMPONENTS, DEFAULT_AVATAR } from 'SHARED_COMPONENTS/AvatarEditor/config/utils'
import { FormattedMessage } from 'react-intl'

describe('(Config) Avatar Editor utils file', () => {
  it('should import AVATAR_SHAPE_SHARED_COMPONENTS spec', () => {
    expect(AVATAR_SHAPE_SHARED_COMPONENTS).to.deep.equal([
      {
        id: 'face',
        displayedName: <FormattedMessage
          id='avatareditor.faceselector.label'
          description='Face Selector'
          defaultMessage='Visage' />,
      },
      {
        id: 'hair',
        displayedName: <FormattedMessage
          id='avatareditor.hairselector.label'
          description='Hair Selector'
          defaultMessage='Cheveux' />,
      },
      {
        id: 'eyes',
        displayedName: <FormattedMessage
          id='avatareditor.eyesselector.label'
          description='Eyes Selector'
          defaultMessage='Yeux' />,
      },
      {
        id: 'nose',
        displayedName: <FormattedMessage
          id='avatareditor.noseselector.label'
          description='Nose Selector'
          defaultMessage='Nez' />,
      },
      {
        id: 'mouth',
        displayedName: <FormattedMessage
          id='avatareditor.mouthselector.label'
          description='Mouth Selector'
          defaultMessage='Bouche' />,
      },
    ])
  })
  it('should import DEFAULT_AVATAR spec', () => {
    expect(DEFAULT_AVATAR).to.deep.equal({
      face: {
        style: 'squareFace',
        color: '#8bc34a',
      },
      hair: {
        style: 'zigzagHair',
        color: '#cddc39',
      },
      eyes: {
        style: 'retinaStar',
        color: '#8bc34a',
      },
      mouth: {
        style: 'homerMouth',
        color: '#cddc39',
      },
      nose: {
        style: 'crossNose',
        color: '#cddc39',
      },
    })
  })
})
