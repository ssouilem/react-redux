import React from 'react'
import PropTypes from 'prop-types'

import config from './config/config'

class Nose extends React.Component {
  render = () =>
    <div className={ config.nose[this.props.style] } style={ { backgroundColor: this.props.color } } />
}

Nose.propTypes = {
  color: PropTypes.string,
  style: PropTypes.string,
}

export default Nose
