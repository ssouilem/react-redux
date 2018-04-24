import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as contextActions } from 'ACTIONS/context'
import { actions as clientsActions } from 'ACTIONS/clients'
import { actions as projectsActions } from 'ACTIONS/projects'
import { actions as usersActions } from 'ACTIONS/users'
import Context from 'COMPONENTS/Context/Context'
import MemberAssign from 'COMPONENTS/MemberAssign/MemberAssign'
import Members from 'COMPONENTS/Members/Members'
import styles from './MembersPage.less'

class MembersPage extends React.Component {
  render () {
    return (
      <div className={ styles.membersPage }>
        <Context
          context={ this.props.context }
          clients={ this.props.clients }
          setContextPath={ this.props.setContextPath }
          fetchClients={ this.props.fetchClients }
          projects={ this.props.projects }
          fetchProjects={ this.props.fetchProjects }
          fetchMembers={ this.props.fetchMembers }
          resetMembers={ this.props.resetMembers }
        />
        { this.props.context.currentMemberAccessLevel >= 40 &&
        <MemberAssign
          contextIsSending={ this.props.context.sending }
          usersIsSending={ this.props.users.sending }
          users={ this.props.users }
          context={ this.props.context }
          getUsers={ this.props.getUsers }
          setSelectedUser={ this.props.setSelectedUser }
          setSelectedRole={ this.props.setSelectedRole }
          fetchMembers={ this.props.fetchMembers }
          addMember={ this.props.addMember }
          state={ this.props.state }
        />
        }
        <Members
          context={ this.props.context }
          projects={ this.props.projects }
          deleteMember={ this.props.deleteMember }
          fetchMembers={ this.props.fetchMembers }
          currentUser={ this.props.currentUser }
          setMemberRole={ this.props.setMemberRole } />
      </div>
    )
  }
}

MembersPage.propTypes = {
  setSelectedUser: PropTypes.func,
  setSelectedRole: PropTypes.func,
  fetchClients: PropTypes.func,
  fetchProjects: PropTypes.func,
  addMember: PropTypes.func,
  setMemberRole: PropTypes.func,
  deleteMember: PropTypes.func,
  fetchMembers: PropTypes.func,
  context: PropTypes.object,
  clients: PropTypes.object,
  projects: PropTypes.object,
  getUsers: PropTypes.func,
  resetMembers: PropTypes.func,
  currentUser: PropTypes.object,
  users: PropTypes.object,
}

const mapStateToProps = (state) => ({
  context: state.context,
  clients: state.clients,
  projects: state.projects,
  users: state.users,
  currentUser: state.user.signIn.data,
  state,
})

const mapDispatchToProps = (dispatch) => ({
  fetchClients: clientsActions.fetchClients(dispatch),
  fetchProjects: projectsActions.fetchProjects(dispatch),
  fetchMembers: contextActions.fetchMembers(dispatch),
  getContextPath: contextActions.getContextPath(dispatch),
  setSelectedUser: contextActions.setSelectedUser(dispatch),
  setSelectedRole: contextActions.setSelectedRole(dispatch),
  addMember: contextActions.addMember(dispatch),
  deleteMember: contextActions.deleteMember(dispatch),
  setMemberRole: contextActions.setMemberRole(dispatch),
  setContextPath: contextActions.setContextPath(dispatch),
  getUsers: usersActions.getUsers(dispatch),
  resetMembers: contextActions.resetMembers(dispatch),
  dispatch,
})

export { MembersPage }
export default connect(mapStateToProps, mapDispatchToProps)(MembersPage)
