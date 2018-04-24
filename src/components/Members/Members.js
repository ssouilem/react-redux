import React from 'react'
import { Image, Table, Select, Button } from 'semantic-ui-react'
import styles from './Members.less'

class Members extends React.Component {
  _handleRoleChange (userId, event, data) {
    this.props.setMemberRole(
      this.props.context.contextPath,
      userId,
      data.value,
      this.props.context.contextType
    )
  }
  _currentUserCanManageMember (member) {
    const { contextType, currentMemberAccessLevel } = this.props.context
    return !member.inhereted && (currentMemberAccessLevel === 50 || member.access_level !== 50) &&
      !member.isCurrentUser &&
      ((contextType === 'project' && currentMemberAccessLevel === 40) || currentMemberAccessLevel === 50)
  }

  _handleDeleteMember (userId, event) {
    this.props.deleteMember(
      this.props.context.contextPath,
      userId,
      this.props.context.contextType
    )
  }

  render () {
    const { members, currentMemberAccessLevel } = this.props.context
    const ROLES = [
      { key: 50, value: 50, text: 'Owner' },
      { key: 40, value: 40, text: 'Scrum Master' },
      { key: 30, value: 30, text: 'Developper' },
      { key: 10, value: 10, text: 'Guest' },
    ]
    return (
      <div className={ styles.memberAssign }>
        <div> Members List : </div>
        <Table sortable celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(members && members.length > 0 && members.map(member => {
              return (<Table.Row key={ member.id }>
                <Table.Cell><Image avatar src={ member.avatar_url } />{ member.name }</Table.Cell>
                <Table.Cell>{ member.username }</Table.Cell>
                { (this._currentUserCanManageMember(member) &&
                <Table.Cell>
                  <Select
                    value={ member.access_level }
                    selectOnBlur={ false }
                    onChange={ this._handleRoleChange.bind(this, member.id) }
                    options={ currentMemberAccessLevel === 50 ? ROLES : ROLES.filter(role => (role.value !== 50)) } />
                  <Button
                    icon='user delete'
                    color='red'
                    onClick={ this._handleDeleteMember.bind(this, member.id) }
                    floated='right' />
                </Table.Cell>) ||
                <Table.Cell>
                  { ROLES.find(role => role.value === member.access_level).text }
                  { member.isCurrentUser && !member.inhereted && <Button
                    icon='sign out'
                    content='leave'
                    color='red'
                    onClick={ this._handleDeleteMember.bind(this, member.id) }
                    floated='right' />}
                </Table.Cell>
                }
              </Table.Row>)
            })) ||
              <Table.Row>
                <Table.HeaderCell textAlign='center' colSpan='3'>
                  There's no members for selected entity, Or you don't have enought permissions
                  You can try using the form "Add user" to add new users
                </Table.HeaderCell>
              </Table.Row>}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='3' />
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    )
  }
}

export default Members
