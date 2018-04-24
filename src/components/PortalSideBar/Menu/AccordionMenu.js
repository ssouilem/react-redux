import { Link } from 'react-router'
import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, Icon } from 'semantic-ui-react'
import { push } from 'react-router-redux'
import MenuArray from './config/Menu.json'
import styles from './AccordionMenu.less'

class AccordionMenu extends React.Component {
  state = { activeIndex: 0 }
  _createIcon = (iconName, isActive) => {
    if (typeof iconName === 'string') {
      return <Icon name={ iconName } size='large' color={ isActive ? 'yellow' : 'grey' } />
    } else if (typeof iconName === 'object') {
      return (
        <Icon.Group size='large' className='block'>
          <Icon size='large' name={ iconName[0] } color={ isActive ? 'yellow' : 'grey' } />
          <Icon
            size='small' className={ styles.smallIcon } name={ iconName[1] } color={ isActive ? 'yellow' : 'grey' } />
        </Icon.Group>
      )
    }
  }
  _handleItemClick = (e, titleProps) => {
    const { name, to } = titleProps
    console.log('Accordion :', titleProps)
    this.setState({ activeIndex: name })
    this.props.dispatch(push(to))
    this.props.selectedItem({ portalSideBarActive: name })
  }
  render () {
    // const { activeIndex } = this.state
    // const { portalSideBarActive } = this.props
    return (
      <Accordion className={ styles.accordionMenu } color='yellow' inverted>
        {MenuArray.map((item, index) => {
          return (
            <div className='menuItem' key={ index }>
              <Accordion.Title
                active={
                  (item.submenus && this.props.location.indexOf(item.route) !== -1) ||
                  (this.props.location.charAt(0) === '/'
                    ? this.props.location === item.route
                    : this.props.location === item.name)
                }
                index={ index }
                className='link item'
                to={ item.route || '' }
                onClick={ this._handleItemClick }
              >
                {this._createIcon(
                  item.icon,
                  (item.submenus && this.props.location.indexOf(item.route) !== -1) ||
                    (this.props.location.charAt(0) === '/'
                      ? this.props.location === item.route
                      : this.props.location === item.name)
                )}
                {item.title}
              </Accordion.Title>
              {item.submenus && (
                <Accordion.Content active={ this.props.location === item.route } className='transition'>
                  {item.submenus.map((subItem, subIndex) => (
                    <Link
                      key={ item.index + '0' + subIndex }
                      className='item'
                      to={ subItem.route }
                      active={ this.props.location === subItem.route }
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </Accordion.Content>
              )}
            </div>
          )
        })}
      </Accordion>
    )
  }
}

AccordionMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default AccordionMenu
