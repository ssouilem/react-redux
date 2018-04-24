import React from 'react'
import PropTypes from 'prop-types'

import config from './config/config'

class Mouth extends React.Component {
  render = () => {
    let styles= config.mouth[this.props.style]
    return (
      <div className={ styles.mouthContainer } >
        <div className={ styles.upperLip } style={ { backgroundColor: this.props.color } } />
        <div className={ styles.teeth } />
        <div className={ styles.bottomLip } style={ { backgroundColor: this.props.color } } />
      </div>
    )
  }
}

Mouth.propTypes = {
  color: PropTypes.string,
  style: PropTypes.string,
}

export default Mouth
