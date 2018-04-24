import React from 'react'
import PropTypes from 'prop-types'
import Face from './Face'

import styles from './AvatarViewer.less'

class AvatarViewer extends React.Component {
  render = () => {
    return (
      <div className={ styles.container }>
        <Face { ...this.props.avatar } />
      </div>
    )
  }
}

AvatarViewer.propTypes = {
  avatar: PropTypes.object,
}

export default AvatarViewer
