import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as userActions } from 'ACTIONS/user'
// import { Segment } from 'semantic-ui-react'
// import { isSending } from 'UTILS/loaderHelper'
// import ToastCreator from 'containers/ToastCreator/ToastCreator'
import PortalSideBar from 'COMPONENTS/PortalSideBar/PortalSideBar'
import PortalHeader from 'COMPONENTS/PortalHeader/PortalHeader'
import styles from './Portal.less'

export const SHOULD_DISPLAY_LOADER_FOR = [
  'users.sending',
  // 'projects.sending',
  'clients.sending',
  'context.sending',
  'dashboard.chartData.sending',
  'dashboard.currentstate.sending',
]

export class Portal extends React.Component {
  render () {
    // const { sidebarIsCollapsed = true, children, portalSideBarActive = true, selectedItem } = this.props
    const { sidebarIsCollapsed, portalSideBarActive = true, selectedItem } = this.props
    return (
      <div>
        <PortalSideBar
          portalSideBarActive={ portalSideBarActive }
          selectedItem={ selectedItem }
          dispatch={ this.props.dispatch }
        />
        <div className={ sidebarIsCollapsed ? styles.portalContentExpanded : styles.portalContent }>
          <PortalHeader />
          {/*
          <ToastCreator />
          <Segment attached='bottom' className={ styles.portalContentSegment } children={ children } />
          {/* {isSending(this.props.state, SHOULD_DISPLAY_LOADER_FOR) && (
            <Dimmer inverted active>
              <Loader inverted />
            </Dimmer>
          )}
          */ }
        </div>
      </div>
    )
  }
}

// Portal.propTypes = {
//   dispatch: PropTypes.func,
//   user: PropTypes.object,
//   selectedItem: PropTypes.func,
//   portalSideBarActive: PropTypes.string,
//   sidebarIsCollapsed: PropTypes.bool.isRequired,
// }

const mapStateToProps = state => ({
  sidebarIsCollapsed: state.portal.sidebarIsCollapsed,
  user: state.user,
  state,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  getAvatar: userActions.getAvatar(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Portal)
