import React from 'react'
import { FormattedMessage } from 'react-intl'

export const DEFAULT_AVATAR = {
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
}

export const AVATAR_SHAPE_SHARED_COMPONENTS = [
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
]
