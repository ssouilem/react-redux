import styles from '../AvatarViewer.less'

export default {
  face: {
    'squareFace': styles.squareFace,
    'polygoneFace': styles.polygoneFace,
    'roundFace': styles.roundFace,
    'triangleFace': styles.triangleFace,
    'bevelFace': styles.bevelFace,
  },
  hair: {
    'squareHair': styles.squareHair,
    'zigzagHair': styles.zigzagHair,
    'sylvainHair': styles.sylvainHair,
    'neymarHair': styles.neymarHair,
  },
  eyes: {
    'simpleEyes': {
      eyes: styles.simpleEyes,
      eyeContainer: styles.simpleEyeContainer,
      eyeRetina: styles.simpleEyeRetina,
    },
    'strangeEyes': {
      eyes: styles.strangeEyes,
      eyeContainer: styles.strangeEyeContainer,
      eyeRetina: styles.strangeEyeRetina,
    },
    'ellipseEyes': {
      eyes: styles.ellipseEyes,
      eyeContainer: styles.ellipseEyeContainer,
      eyeRetina: styles.ellipseEyeRetina,
    },
    'retinaStar': {
      eyes: styles.simpleEyes,
      eyeContainer: styles.simpleEyeContainer,
      eyeRetina: styles.starEyeRetina,
    },
    'crossEyes': {
      eyes: styles.simpleEyes,
      eyeContainer: styles.crossEyeContainer,
      eyeRetina: styles.simpleEyeRetina,
    },
    'eyeBallStar': {
      eyes: styles.simpleEyes,
      eyeContainer: styles.starEyeContainer,
      eyeRetina: styles.simpleEyeRetina,
    },
    'rectangleEyes': {
      eyes: styles.simpleEyes,
      eyeContainer: styles.rectangleEyeContainer,
      eyeRetina: styles.simpleEyeRetina,
    },
  },
  mouth: {
    'stylename': {
      mouthContainer: styles.mouthContainer,
      upperLip: styles.upperLip,
      bottomLip: styles.bottomLip,
      teeth: styles.teeth,
    },
    'homerMouth': {
      mouthContainer: styles.mouthContainer,
      upperLip: styles.homerUpperLip,
      bottomLip: styles.homerBottomLip,
      teeth: styles.homerTeeth,
    },
    'deadMouth': {
      mouthContainer: styles.deadMouthContainer,
      upperLip: styles.deadUpperLip,
      bottomLip: styles.deadBottomLip,
      teeth: styles.deadTeeth,
    },
    'smilingMouth': {
      mouthContainer: styles.smilingMouthContainer,
      upperLip: styles.smilingUpperLip,
      bottomLip: styles.smilingBottomLip,
      teeth: styles.smilingTeeth,
    },
    'halloweenMouth': {
      mouthContainer: styles.halloweenMouthContainer,
      upperLip: styles.halloweenUpperLip,
      bottomLip: styles.halloweenBottomLip,
      teeth: styles.smilingTeeth,
    },
    'halloweenMouth2': {
      mouthContainer: styles.halloweenMouth2Container,
      upperLip: styles.halloween2UpperLip,
      bottomLip: styles.halloween2BottomLip,
      teeth: styles.smilingTeeth,
    },
  },
  nose: {
    'stylename': styles.nose,
    'pigNose': styles.pigNose,
    'ovalNose': styles.ovalNose,
    'crossNose': styles.crossNose,
  },
}
