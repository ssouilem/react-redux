import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu, Segment, Responsive, Image } from 'semantic-ui-react'
// import { push } from 'react-router-redux'
import styles from './PortalHeader.less'

class PortalHeader extends React.Component {
  // _handleClick (path) {
  //   this.props.dispatch(push(path))
  // }
  _handleOnUpdate (minWidth, event, data) {
    const { width } = data
    const displayIsMobile = width < minWidth
    this.props.updateIsMobile({ displayIsMobile: displayIsMobile })
  }
  componentWillMount () {
    // const { user } = this.props
    // if (user && !user.signIn.sending && !user.signIn.data.avatar) {
    //   this.props.getAvatar()
    // }
  }
  render () {
    // const { userData } = this.props
    // const userAvatar = userData.avatar || require('FRONT_THEME/assets/images/avatars/no-avatar.png')
    return (
      <Menu attached='top' className={ styles.portalHeader }>
        <Image className={ styles.headerLogo } src={ require('FRONT_THEME/assets/images/logo.png') } spaced='left' />
        <Menu.Menu position='right'>
          <div className='ui right aligned category search item'>
            <div className='ui transparent icon input'>
              <input className='prompt' type='text' placeholder='Boost search...' />
              <i className='search link icon' />
            </div>
            <div className='results' />
          </div>
        </Menu.Menu>
        <Responsive
          as={ Segment }
          basic
          fireOnMount
          className={ styles.headerAvatar }
          minWidth={ Responsive.onlyTablet.minWidth }
        />
        {/* <Image src={ userAvatar } avatar />
          <span> {`${ userData.first_name } ${ userData.last_name }`} </span>
        </Responsive> */}
        {/* <Responsive
          as={ Dropdown }
          onUpdate={ this._handleOnUpdate.bind(this, Responsive.onlyTablet.minWidth) }
          fireOnMount
          pointing={ displayIsMobile ? 'top right' : false }
          icon={ displayIsMobile ? <Image src={ userAvatar } avatar /> : 'setting' }
          className={ displayIsMobile ? 'DropdownOnMobile' : '' }
          item
        >
          <Dropdown.Menu>
            {displayIsMobile && (
              <Dropdown.Item disabled>{`${ userData.first_name } ${ userData.last_name }`}</Dropdown.Item>
            )}
            {displayIsMobile && (
              <Dropdown.Item disabled>{`@${ userData.first_name }.${ userData.last_name }`}</Dropdown.Item>
            )}
            {displayIsMobile && <Dropdown.Divider />}
            <Dropdown.Item onClick={ this._handleClick.bind(this, 'profile') }>Profile</Dropdown.Item>
            <Dropdown.Item onClick={ this._handleClick.bind(this, 'settings') }>Settings</Dropdown.Item>
            <Dropdown.Item onClick={ this._handleClick.bind(this, 'help') }>Help</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={ this._handleClick.bind(this, 'logout') }>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Responsive> */}
      </Menu>
    )
  }
}

PortalHeader.propTypes = {
  updateIsMobile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  state,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  // updateIsMobile: portalActions.updateIsMobile(dispatch),
})

export { PortalHeader }
export default connect(mapStateToProps, mapDispatchToProps)(PortalHeader)
