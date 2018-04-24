import React from 'react'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import MenuArray from './config/Menu.json'
import styles from './DropdownMenu.less'

class DropdownMenu extends React.Component {
  state = { activeItem: 0 }
  _handleItemClick = (e, titleProps) => {
    const { name, to } = titleProps
    this.setState({ activeItem: name })
    to && this.props.dispatch(push(to))
    this.props.selectedItem({ portalSideBarActive: name })
  }
  _createIcon = (iconName, isActive, a, b) => {
    if (typeof iconName === 'string') {
      return <Icon name={ iconName } size='large' color={ isActive ? 'yellow' : 'grey' } />
    } else if (typeof iconName === 'object') {
      return (
        <Icon.Group size='large'>
          <Icon size='large' name={ iconName[0] } color={ isActive ? 'yellow' : 'grey' } />
          <Icon
            size='small' className={ styles.smallIcon } name={ iconName[1] } color={ isActive ? 'yellow' : 'grey' } />
        </Icon.Group>
      )
    }
  }
  render () {
    // const { activeItem } = this.state
    return (
      <div className={ styles.dropdownMenu }>
        {MenuArray.map((item, index) => (
          <div className='menuItem' key={ index }>
            {!item.submenus && (
              <Menu.Item
                name={ item.name }
                link
                to={ item.route }
                active={
                  this.props.location.charAt(0) === '/'
                    ? this.props.location === item.route
                    : this.props.location === item.name
                }
                onClick={ this._handleItemClick }
              >
                {this._createIcon(
                  item.icon,
                  this.props.location.charAt(0) === '/'
                    ? this.props.location === item.route
                    : this.props.location === item.name
                )}
              </Menu.Item>
            )}
            {item.submenus && (
              <Dropdown
                key={ item.name }
                name={ item.name }
                item
                icon={ this._createIcon(item.icon, this.props.location.indexOf(item.route) !== -1) }
                onClick={ this._handleItemClick }
                className={ this.props.location.indexOf(item.route) !== -1 ? 'active icon' : 'icon' }
              >
                <Dropdown.Menu>
                  {item.submenus.map((subItem, subIndex) => (
                    <Dropdown.Item
                      active={ this.props.location === subItem.route }
                      to={ subItem.route || '' }
                      key={ item.index + '0' + subIndex }
                      onClick={ this._handleItemClick }
                    >
                      {subItem.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        ))}
      </div>
    )
  }
}
DropdownMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default DropdownMenu
