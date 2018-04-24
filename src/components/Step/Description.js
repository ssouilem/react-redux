import React from 'react'
import { Form, Input, Label, Dropdown, Grid, Message, TextArea } from 'semantic-ui-react'

class Description extends React.Component {
  constructor (props) {
    super(props)
    this._handleChangeInput = this._handleChangeInput.bind(this)
    this._handleChangeSelect = this._handleChangeSelect.bind(this)
    this._handleChangeVarsInput = this._handleChangeVarsInput.bind(this)
  }

  componentWillMount () {
    if (!this.props.clients.sending && !this.props.clients.data) {
      this.props.fetchClients()
    }
  }

  _handleChangeInput (event) {
    console.log('Description : _handleChangeInput ', this)
    // console.log(event.target.value)
    const { name, value } = event.target
    this.props.setWizardProps({ [name]: value })
  }

  _handleChangeVarsInput (event) {
    console.log('Variables : _handleChangeInput ', this)
    const { name, value } = event.target
    this.props.setWizardVarsProps({ key: name, value })
  }

  _handleChangeSelect (event, { name, value }) {
    console.log('Description : _handleChangeSelect ', this)
    console.log(name, value)
    this.props.setWizardProps({ [name]: value })
  }

  // @TODO validation de formulaire && regex

  render () {
    const { clients } = this.props
    clients.data &&
      !clients.data.find(org => org.id === 'Groups') &&
      clients.data.unshift({ id: 'Groups', name: '/', full_path: 'Groups', disabled: true, labled: false })
    return (
      <Grid columns={ 2 } as={ Form } container>
        <Grid.Row>
          <Grid.Column width={ 8 }>
            <Form.Field>
              <label>PROJECT PATH</label>
              <Input labelPosition='left' content='' action>
                <Label>{ window.origin }</Label>
                {clients.data && ( // @TODO Ajouter l'utilisateur encours && title group disabled + Header
                  <Dropdown
                    selectOnNavigation={ false }
                    selection
                    fluid
                    name='slug'
                    value={ this.props.wizard.slug }
                    options={ clients.data.map(client => ({
                      key: client.id,
                      value: client.id,
                      text: client.full_path,
                      disabled: client.disabled,
                    })) }
                    onChange={ this._handleChangeSelect }
                  />
                )}
              </Input>
            </Form.Field>
            {/* <p className='wizard-description'>
              To house dependent projects under the same namespace?&nbsp;
              <a href='/groups/new'>Create a group</a>
            </p> */}
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <Form.Field>
              <label>PROJECT NAME</label>
              <Input
                placeholder='my project'
                name='name'
                defaultValue={ this.props.wizard.name }
                onBlur={ this._handleChangeInput }
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 8 } >
            <Form.Field
              control={ TextArea }
              rows={ 5 }
              label='PROJECT DESCRIPTION '
              placeholder='Description format'
              name='description'
              defaultValue={ this.props.wizard.description }
              onBlur={ this._handleChangeInput }
            />
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <Form.Field
              control={ Input }
              label='APPLICATION DOMAIN (URL)'
              placeholder='example.org'
              name='APPDOMAIN'
              onChange={ this._handleChangeVarsInput }
              defaultValue={
                this.props.wizard.VARS.find(v => v.key === 'APPDOMAIN') &&
                this.props.wizard.VARS.find(v => v.key === 'APPDOMAIN').value
              }
            />
            <Form.Field
              control={ Input }
              label='APPLICATION NAME'
              placeholder='my-app'
              name='APP'
              onChange={ this._handleChangeVarsInput }
              defaultValue={
                this.props.wizard.VARS.find(v => v.key === 'APP') &&
                this.props.wizard.VARS.find(v => v.key === 'APP').value
              }
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={ 16 }>
            <Message info>
              <p>
                The final URL of your application will be
                <b>
                  {' '}
                  {this.props.wizard.VARS.find(v => v.key === 'APP').value || 'my-app'}.{this.props.wizard.VARS.find(
                    v => v.key === 'APPDOMAIN'
                  ).value || 'example.org'}
                </b>
              </p>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
export { Description }
