import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import BurgerMenu from 'SHARED_COMPONENTS/BurgerMenu/BurgerMenu'
import SearchForm from 'SHARED_CONTAINERS/SearchForm/SearchForm'
import styles from './NavigationBar.less'

class NavigationBar extends React.Component {
  _handleUserClick = (event) => {
    event.preventDefault()
    this.props.handleUserClick()
  }
  render () {
    return (
      <div className={ styles.navigationBar }>
        <Link to={ this.props.logoLink }>
          <img className={ styles.home } src={ require('../icons/logo.png') } />
        </Link>
        <div className={ styles.rightSide }>
          <div className={ styles.links }>
            { this.props.links.map((link, index) =>
              <Link key={ `link-${ index }` } to={ link.to }>{ link.text }</Link>) }
            {this.props.user &&
              <SearchForm
                handleSubmit={ this.props.handleSearchClick }
              />
            }
          </div>
          <div className={ styles.signIn }>
            { this.props.user ? (
              <div className={ styles.connectedBar }>
                <div
                  className={ this.props.handleUserClick && styles.userPointer }
                  onClick={ this.props.handleUserClick && this._handleUserClick }>
                  <div className={ styles.avatar }>{ this.props.avatar }</div>
                  { this.props.user }
                </div>
                <img
                  className={ styles.connexionIcon }
                  src={ require('../icons/blue_logout.svg') }
                  onClick={ this.props.signOut } />
              </div>
            ) : (
              <Link to={ this.props.loginLink }>
                <FormattedMessage
                  id='navigationBar.title.connect'
                  description='User login in message'
                  defaultMessage='Se Connecter'
                />
              </Link>
            )}
          </div>
          { this.props.additionalComponent &&
            <div className={ styles.additionalComponent }>
              { this.props.additionalComponent }
            </div>
          }
          <div className={ styles.burgerMenu }>
            <BurgerMenu
              searchBar={ <SearchForm
                handleSubmit={ this.props.handleSearchClick }
              /> }
              handleBurgerClick={ this.props.handleBurgerClick }
              isOpen={ this.props.isOpen }
              links={ this.props.links }
              onBurgerStateChange={ this.props.onBurgerStateChange } />
          </div>
        </div>
      </div>
    )
  }
}

NavigationBar.propTypes = {
  additionalComponent: PropTypes.object,
  avatar: PropTypes.element,
  handleBurgerClick: PropTypes.func.isRequired,
  handleUserClick: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  links: PropTypes.array.isRequired,
  loginLink: PropTypes.string,
  logoLink: PropTypes.string,
  onBurgerStateChange: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.string,
}

export default NavigationBar
