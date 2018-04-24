import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as portalActions } from 'ACTIONS/portal'
import AccordionMenu from './Menu/AccordionMenu'
import DropdownMenu from './Menu/DropdownMenu'
import { Sidebar, Menu, Button, Icon } from 'semantic-ui-react'
import styles from './PortalSideBar.less'

class PortalSideBar extends React.Component {
  _handleSidebarButton = () => {
    const { sidebarIsCollapsed } = this.props
    this.props.changeSidebarState({ sidebarIsCollapsed: !sidebarIsCollapsed })
  }
  componentWillMount = () => {
    console.log('#################################################################################')
    console.log(this.props.location)
    console.log(this.props)
    console.log('#################################################################################')
  }
  render () {
    const { sidebarIsCollapsed, displayIsMobile, dispatch, portalSideBarActive, selectedItem, location } = this.props
    return (
      <Sidebar
        as={ Menu }
        width={ sidebarIsCollapsed ? 'very thin' : 'thin' }
        icon
        visible
        vertical
        direction='left'
        color='black'
        inverted
        className={ styles.portalSideBar }
      >
        <Button
          className={ styles.portalSideBarButton }
          disabled={ displayIsMobile }
          active={ false }
          basic
          onClick={ this._handleSidebarButton }
          color='black'
          icon={ <Icon name='content' size='big' color='grey' /> }
        />
        {sidebarIsCollapsed ? (
          <DropdownMenu
            dispatch={ dispatch }
            portalSideBarActive={ portalSideBarActive }
            location={ location }
            selectedItem={ selectedItem }
          />
        ) : (
          <AccordionMenu
            dispatch={ dispatch }
            portalSideBarActive={ portalSideBarActive }
            location={ location }
            selectedItem={ selectedItem }
          />
        )}
      </Sidebar>
    )
  }
}

PortalSideBar.propTypes = {
  sidebarIsCollapsed: PropTypes.bool.isRequired,
  changeSidebarState: PropTypes.func.isRequired,
  location: PropTypes.string,
  selectedItem: PropTypes.func,
  portalSideBarActive: PropTypes.string,
}

const mapStateToProps = state => ({
  sidebarIsCollapsed: state.portal.sidebarIsCollapsed,
  displayIsMobile: state.portal.displayIsMobile,
  location: state.router.locationBeforeTransitions.pathname,
  state,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  changeSidebarState: portalActions.changeSidebarState(dispatch),
})

export { PortalSideBar }
export default connect(mapStateToProps, mapDispatchToProps)(PortalSideBar)
