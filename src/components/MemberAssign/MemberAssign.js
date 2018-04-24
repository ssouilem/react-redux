import React from 'react'
import { Accordion, Button, Form, Icon, Header, Image } from 'semantic-ui-react'

import styles from './MemberAssign.less'

class MemberAssign extends React.Component {
  state={ active: false }
  componentWillMount () {
    if (!this.props.users.sending && !this.props.users.data) {
      this.props.getUsers()
    }
  }
  _handleAddMember () {
    this.setState({ active: !this.state.active })
  }
  _handleAddProjectMemember () {
    if (!this.props.contextIsSending) {
      this.props.addMember(
        this.props.context.contextPath,
        this.props.context.selectedUser,
        this.props.context.selectedRole,
        this.props.context.contextType
      )
      this._handleAddMember()
    }
  }
  _handleSelectUser (event, data) {
    this.props.setSelectedUser({ selectedUser: data.value[0] })
  }
  _handleSelectRole (event, data) {
    this.props.setSelectedRole({ selectedRole: data.value })
  }
  render () {
    const { users } = this.props
    return (
      <Accordion className={ styles.memberAssign }>
        <Accordion.Title active={ this.state.active }>
          <Button.Group floated='right'>
            <Button icon onClick={ this._handleAddMember.bind(this) }>
              <Icon name='dropdown' />
              Add user
            </Button>
          </Button.Group>
        </Accordion.Title>
        <Accordion.Content
          as={ Form }
          active={ this.state.active }
          className={ styles.memberAssignStyle }>
          <Form.Group widths='equal'>
            { this.state.active && users.data &&
            <Form.Dropdown placeholder='Select User' fluid multiple search selection
              width='eleven'
              onChange={ this._handleSelectUser.bind(this) }
              options={
                users.data.map(user => ({
                  key: user.id,
                  value: user.id,
                  text: user.name,
                  content: <Header
                    size='tiny'
                    content={ user.name }
                    subheader={ '@' + user.username }
                    icon={ <Image avatar src={ user.avatar_url } /> } />,
                }))
              } />
            }
            <Form.Select
              placeholder='Select Role'
              width='three'
              onChange={ this._handleSelectRole.bind(this) }
              options={ [ { key: 'scrum', value: 'scrum_master', text: 'Scrum Master' },
                { key: 'guest', value: 'guest', text: 'Guest' },
              { key: 'dev', value: 'developper', text: 'Developper' } ] }
            />
            <Button
              icon='add user'
              color='green'
              loading={ this.props.projectIsSending }
              onClick={ this._handleAddProjectMemember.bind(this) } />
          </Form.Group>
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default MemberAssign
