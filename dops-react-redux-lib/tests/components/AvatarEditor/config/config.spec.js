import config from 'SHARED_COMPONENTS/AvatarEditor/config/config'

describe('(Config) Avatar Editor Config file', () => {
  it('should import and map the right colors and shapes', () => {
    expect(config).to.deep.equal({
      face: {
        colors: [ '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
          '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', '#000000',
        ],
        styles: [ 'squareFace', 'polygoneFace', 'roundFace', 'triangleFace', 'bevelFace' ],
      },
      hair: {
        colors: [ '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
          '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', '#000000',
        ],
        styles: [ 'zigzagHair', 'squareHair', 'sylvainHair', 'neymarHair' ],
      },
      eyes: {
        colors: [ '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
          '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', '#000000',
        ],
        styles: [ 'simpleEyes', 'strangeEyes', 'ellipseEyes', 'retinaStar', 'eyeBallStar', 'rectangleEyes', 'crossEyes',
        ],
      },
      nose: {
        colors: [ '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
          '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', '#000000',
        ],
        styles: [ 'stylename', 'pigNose', 'ovalNose', 'crossNose' ],
      },
      mouth: {
        colors: [ '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
          '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', '#000000',
        ],
        styles: [ 'stylename', 'homerMouth', 'deadMouth', 'smilingMouth', 'halloweenMouth', 'halloweenMouth2' ],
      },
    })
  })
})
