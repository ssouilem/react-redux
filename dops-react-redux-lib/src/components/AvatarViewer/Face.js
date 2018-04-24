import React from 'react'
import PropTypes from 'prop-types'
import { DEFAULT_AVATAR } from 'SHARED_COMPONENTS/AvatarEditor/config/utils'
import config from './config/config'
import Hair from './Hair'
import Eyes from './Eyes'
import Nose from './Nose'
import Mouth from './Mouth'

let defaultAvatar = { ...DEFAULT_AVATAR }

class Face extends React.Component {
  render = () => {
    return (
      <div
        className={ config.face[this.props.face ? this.props.face.style : defaultAvatar.face.style] }
        style={ { backgroundColor: this.props.face ? this.props.face.color : defaultAvatar.face.color } }>
        <Hair
          style={ this.props.hair ? this.props.hair.style : defaultAvatar.hair.style }
          color={ this.props.hair ? this.props.hair.color : defaultAvatar.hair.color } />
        <Eyes
          style={ this.props.eyes ? this.props.eyes.style : defaultAvatar.eyes.style }
          color={ this.props.eyes ? this.props.eyes.color : defaultAvatar.eyes.color }
        />
        <Nose
          style={ this.props.nose ? this.props.nose.style : defaultAvatar.nose.style }
          color={ this.props.nose ? this.props.nose.color : defaultAvatar.nose.color } />
        <Mouth
          style={ this.props.mouth ? this.props.mouth.style : defaultAvatar.mouth.style }
          color={ this.props.mouth ?this.props.mouth.color : defaultAvatar.mouth.color } />
      </div>
    )
  }
}

Face.propTypes = {
  face: PropTypes.object,
  hair: PropTypes.object,
  eyes: PropTypes.object,
  nose: PropTypes.object,
  mouth: PropTypes.object,
}

export default Face
