import React from 'react'
import PropTypes from 'prop-types'

import config from './config/config'

class Eyes extends React.Component {
  render = () => {
    let styles = config.eyes[this.props.style]
    return (
      <div className={ styles.eyes } >
        <div className={ styles.eyeContainer } >
          <div className={ styles.eyeRetina } style={ { backgroundColor: this.props.color } } />
        </div>
        <div className={ styles.eyeContainer } >
          <div className={ styles.eyeRetina } style={ { backgroundColor: this.props.color } } />
        </div>
      </div>
    )
  }
}

Eyes.propTypes = {
  color: PropTypes.string,
  style: PropTypes.string,
}

export default Eyes
