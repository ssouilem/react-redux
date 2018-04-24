import React from 'react'
import { Form } from 'semantic-ui-react'
import styles from './Context.less'

class Context extends React.Component {
  _handleSelectChange (contextElements, previousSelectedElement, event, data) {
    if (this.props.context.contextPath === data.value) {
      return
    }
    const selectedGroup = this._getGroupByFullPath(data.value)
    const permission = selectedGroup ? selectedGroup.permission : true
    const alternativePage = selectedGroup && permission === null && this._getAlternativePage(data.value)
    this.props.setContextPath(data.value, permission, alternativePage)
  }
  _createSelectComponent (selectedElement, data, label, parentFullPath, index) {
    data = parentFullPath ? [{ text: 'All', key: 0, value: parentFullPath }, ...data] : data
    return <Form.Select
      label={ label + ' : ' }
      options={ data }
      selectOnBlur={ false }
      key={ index }
      value={ selectedElement || parentFullPath }
      onChange={ this._handleSelectChange.bind(this, label, selectedElement) }
      placeholder={ label } />
  }
  _createLastSelectComponent (selectedElement, data, label, parentFullPath, index) {
    if (!data.length) {
      return
    }
    return <Form.Select
      label={ label + ' : ' }
      key={ index }
      selectOnBlur={ false }
      options={ [{ text: 'All', key: 0, value: parentFullPath }, ...data] }
      value={ selectedElement || parentFullPath }
      onChange={ this._handleSelectChange.bind(this, label, parentFullPath) }
      placeholder={ label } />
  }
  _getAlternativePage (parentFullPath) {
    const clients = (this.props.clients && this.props.clients.data) || []
    const projects = (this.props.projects && this.props.projects.data) || []
    const subProject = projects.find(project => project.path_with_namespace.indexOf(parentFullPath) !== -1)
    const subGroup = clients.find(group =>
      (group.full_path.indexOf(parentFullPath) !== -1 && group.permission !== null))
    return (subGroup && subGroup.full_path) || (subProject && subProject.path_with_namespace)
  }
  _getGroupByFullPath (groupFullPath = this.props.context.contextPath) {
    const filtredGroups = this.props.clients.data && this.props.clients.data.filter(searchedClient =>
      searchedClient.full_path === groupFullPath)
    return filtredGroups && filtredGroups[0]
  }
  _getProjectByFullPath (fullPath = this.props.context.contextPath) {
    const filtredProjects = this.props.projects.data && this.props.projects.data.filter(searchedProject =>
      searchedProject.path_with_namespace === fullPath)
    return filtredProjects && filtredProjects[0]
  }
  _getClients () {
    return this.props.clients.data && this.props.clients.data
      .filter(client => client.parent_id === null)
      .map((client) => ({
        'text': client.name,
        'key': client.id,
        'value': client.full_path,
      }))
  }
  _getSubs (parentFullPath, subsType) {
    const parent = this._getGroupByFullPath(parentFullPath)
    const parentId = parent.id
    const origin = subsType === 'group' ? this.props.clients.data : this.props.projects.data
    const subs = origin && origin
      .filter(sub =>
        ((subsType === 'group' && sub.parent_id === parentId) ||
        (subsType === 'project' && sub.namespace.id === parentId)))
      .map((sub) => ({
        'text': sub.name,
        'key': sub.id,
        'value': subsType === 'group' ? sub.full_path : sub.path_with_namespace,
        'icon': subsType === 'group' ? 'folder' : 'fork',
      }))
    return subs || []
  }
  _getChildren (parentFullPath) {
    const subGroups = this._getSubs(parentFullPath, 'group')
    const subProjects = this._getSubs(parentFullPath, 'project')
    return subGroups.concat(subProjects)
  }

  componentWillMount () {
    if (!this.props.clients.sending && !this.props.clients.data) {
      this.props.fetchClients()
      this.props.fetchProjects()
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.context.sending &&
      (!nextProps.context.members || nextProps.context.contextPath !== this.props.context.contextPath)) {
      if (nextProps.context.contextPath !== '') {
        this.props.fetchMembers(nextProps.context)
      } else if (nextProps.context.members) {
        this.props.resetMembers()
      }
    }
  }

  render () {
    const { context, clients } = this.props
    const contextPath = context.contextPath !== '' && context.contextPath.match(/[^/?]*[^/?]/g)
    let label, data, selectedElement, parentFullPath
    let fullPath = ''
    if (contextPath.length >= 1 && context.contextType === 'group') {
      contextPath.push('')
    }
    return (
      <Form className={ styles.context }>
        <Form.Group widths='equal'>
          { clients && clients.data &&
            contextPath && contextPath.map((path, index, iteratedArray) => {
              fullPath = fullPath + '/' + path
              switch (index) {
                case 0:
                  label = 'client'
                  data = this._getClients()
                  selectedElement = fullPath.substr(1)
                  break
                case 1:
                  label = 'organisation'
                  data = this._getChildren(selectedElement)
                  parentFullPath = selectedElement
                  selectedElement = path === '' ? null : fullPath.substr(1)
                  break
                default:
                  label = 'group/project'
                  data = this._getChildren(selectedElement)
                  parentFullPath = selectedElement
                  selectedElement = path === '' ? null : fullPath.substr(1)
                  break
              }
              return (iteratedArray.length - 1 !== index)
                ? this._createSelectComponent(selectedElement, data, label, parentFullPath, index)
                : this._createLastSelectComponent(
                    selectedElement, data, label, parentFullPath, index)
            })
          }
          { clients && clients.data && !contextPath &&
            <Form.Select
              label='client : '
              options={ this._getClients() }
              onChange={ this._handleSelectChange.bind(this, 'client', '') }
              placeholder='client' />
          }
        </Form.Group>
      </Form>
    )
  }
}

export default Context
