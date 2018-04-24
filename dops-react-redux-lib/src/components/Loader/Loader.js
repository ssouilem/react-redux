import React from 'react'
import styles from './Loader.less'
import Spinner from 'react-spinkit'

class Loader extends React.Component {
  render = () =>
    <div className={ styles.loaderContainer }>
      <Spinner name='folding-cube' />
    </div>
}

export default Loader
