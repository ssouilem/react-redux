import React from 'react'
import PropTypes from 'prop-types'
import { slide as SlidingMenu } from 'react-burger-menu'
import styles from './BurgerMenu.less'

let menuStyles = {
  bmBurgerButton: {
    position: 'relative',
    width: '30px',
    height: '30px',
  },
  bmCrossButton: {
    height: '16px',
    width: '16px',
    paddingRight: '18px',
  },
  bmMenu: {
    background: 'white',
    marginTop: '-16px',
    border: '0.5px solid green',
    borderRadius: '1%',
  },
  bmMenuWrap: {
    width: '95%',
    height: '400px',
  },
}

class BurgerMenu extends React.Component {
  _handleClick = (event, to) => {
    event.preventDefault()
    this.props.handleBurgerClick(to)
  }
  render () {
    return (
      <SlidingMenu
        customBurgerIcon={ <img src={ require('../icons/open-burger.svg') } /> }
        customCrossIcon={ <img src={ require('../icons/close-croix.svg') } /> }
        isOpen={ this.props.isOpen }
        onStateChange={ this.props.onBurgerStateChange }
        styles={ menuStyles }
        width={ 400 }
        right
        noOverlay>
        <div className={ styles.content }>
          { this.props.children }
        </div>
      </SlidingMenu>
    )
  }
}

BurgerMenu.propTypes = {
  handleBurgerClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  children: PropTypes.element.isRequired,
  onBurgerStateChange: PropTypes.func.isRequired,
}

export default BurgerMenu
