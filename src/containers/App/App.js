import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as searchActions } from 'ACTIONS/search'
import { actions as portalActions } from 'ACTIONS/portal'
import { actions as contextActions } from 'ACTIONS/context'
import { Icon } from 'semantic-ui-react'
import Portal from 'COMPONENTS/Portal/Portal'
// import base64 from 'base-64'
import styles from './App.less'

export const SHOULD_DISPLAY_LOADER_FOR = ['user.signIn.sending', 'redmine.projects.sending']

class App extends React.Component {
  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.location.pathname !== this.props.location.pathname) {
  //     window.scrollTo(0, 0)
  //   }
  // }
  // componentWillMount = () => {
  //   if (
  //     /connexion/.test(this.props.location.pathname) &&
  //     this.props.location.query.user &&
  //     this.props.location.query.token
  //   ) {
  //     let userString = base64.decode(this.props.location.query.user)
  //     let user = JSON.parse(userString)
  //     this.props.signIn(user, this.props.location.query.token)
  //     this.props.dispatch(push('/'))
  //   }
  // }
  render () {
    const { portalIsOpen, children, portalSideBarActive, selectedItem } = this.props
    return (
      <div>
        <div className={ styles.floatingMenu }>
          <Portal
            sidebarIsCollapsed={ portalSideBarActive }
            portalSideBarActive={ portalSideBarActive }
            selectedItem={ selectedItem }
            open={ !portalIsOpen }
            closeIcon={ <Icon name='window close' /> }
            size='fullscreen'
            children={ children }
            closeOnDimmerClick={ false }
          />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  portalIsOpen: PropTypes.bool,
}

const mapStateToProps = state => ({
  portalSideBarActive: state.portal.portalSideBarActive,
  // portalSideBarUrl: state.portal.sideBarUrl,
  portalIsOpen: state.portal.portalIsOpen,
  state,
  user: state.user.signIn.data,
  context: state.context,
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  search: searchActions.searchRequest(dispatch),
  getContextPath: contextActions.getContextPath(dispatch),
  resetMembers: contextActions.resetMembers(dispatch),
  selectedItem: portalActions.selectedItem(dispatch),
})

export { App }
export default connect(mapStateToProps, mapDispatchToProps)(App)
