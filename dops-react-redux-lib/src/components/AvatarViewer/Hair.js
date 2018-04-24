import React from 'react'
import PropTypes from 'prop-types'
import config from './config/config'

class Hair extends React.Component {
  render = () =>
    <div className={ config.hair[this.props.style] } style={ { backgroundColor: this.props.color } } />
}

Hair.propTypes = {
  color: PropTypes.string,
  style: PropTypes.string,
}

export default Hair
