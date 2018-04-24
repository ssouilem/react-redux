import React from 'react'
import { Card, Form, Checkbox, Grid, Select, Input } from 'semantic-ui-react'

class ContinuousDeployment extends React.Component {
  constructor (props) {
    super(props)
    this._handleChangeSelect = this._handleChangeSelect.bind(this)
    this._handleChangeCheckBox = this._handleChangeCheckBox.bind(this)
    this._handleChangeInput = this._handleChangeInput.bind(this)
  }

  _handleChangeSelect (event, { name, value }) {
    console.log('ContinuousDeployment : _handleChangeSelect ', this, name, value)
    this.props.setWizardProps({ [name]: value })
  }

  _handleChangeSelectVars = (event, { name, value }) => {
    this.props.setWizardVarsProps({ key: name, value })
  }

  _handleChangeInput (event) {
    console.log('Variables : _handleChangeInput ', this)
    const { name, value } = event.target
    this.props.setWizardVarsProps({ key: name, value })
  }

  _handleChangeCheckBox (event, { name, checked }) {
    console.log('ContinuousDeployment : _handleChangeCheckBox ', this, name, checked)
    this.props.setWizardProps({ [name]: checked })
  }

  // @TODO validation de formulaire && regex

  render () {
    const cfRegions = [
      { key: '1', text: 'United Kingdom', value: 'https://api.eu-gb.bluemix.net', checked: true },
      { key: '2', text: 'Germany', value: 'https://api.eu-de.bluemix.net' },
      { key: '3', text: 'Sydney', value: 'https://api.au-syd.bluemix.net' },
      { key: '4', text: 'US East', value: 'https://api.us-east.bluemix.net' },
      { key: '5', text: 'US South', value: 'https://api.ng.bluemix.net' },
    ]
    // @TODO Chargement de la liste avec reduce @mongo
    const serviceOptions = [
      { key: '0', text: 'Please choose a cloud service', value: 'none', checked: true },
      { key: '1', text: 'IBM / Cloudfoundry', value: 'BLUEMIX-CF', checked: false },
      { key: '2', text: 'AWS / EKS', value: 'AWS-EKS', checked: false, disabled: true },
      { key: '3', text: 'AWS / lambda', value: 'AWS-LAMBDA', checked: false, disabled: true },
      { key: '4', text: 'AWS / EBS', value: 'AWS-EBS', checked: false, disabled: true },
      { key: '5', text: 'AZURE / APP SERVICE', value: 'AZURE-APP-SERVICE', checked: false, disabled: true },
      { key: '6', text: 'Google / APP ENGINE', value: 'GOOGLE-APP-ENGINE', checked: false, disabled: true },
    ]
    const databasesOptions = [
      { key: '0', text: 'None', value: 'none', checked: true },
      { key: '1', text: 'MySQL', value: 'mysql', checked: false, disabled: true },
      { key: '2', text: 'PostgreSQL', value: 'postgressql', checked: false, disabled: true },
      { key: '3', text: 'Elasticsearch', value: 'elasticsearch', checked: false, disabled: true },
      { key: '4', text: 'DynamoDB', value: 'dynamodb', checked: false, disabled: true },
    ]
    return (
      <Grid columns='equal' container as={ Form }>
        <Grid.Row as={ Card.Group }>
          <Card as={ Grid.Column } className='CD-cards'>
            <Card.Content>
              <Card.Description textAlign='center'>
                Review apps can generate environments of executions on your host for each branch of your code
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description textAlign='center'>
                <label className='CD-cards-label'>REVIEWS APP</label>
                <Form.Field
                  name='activateReviewApps'
                  control={ Checkbox }
                  onChange={ this._handleChangeCheckBox }
                  checked={ this.props.wizard.activateReviewApps }
                />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={ Grid.Column } className='CD-cards'>
            <Card.Content>
              <Card.Description textAlign='center'>
                Commits on the "master" branch are automatically published in an execution environment called Staging at
                your host
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description textAlign='center'>
                <label className='CD-cards-label'>STAGING</label>
                <Form.Field
                  name='activateStaging'
                  control={ Checkbox }
                  onChange={ this._handleChangeCheckBox }
                  checked={ this.props.wizard.activateStaging }
                />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={ Grid.Column } className='CD-cards'>
            <Card.Content>
              <Card.Description textAlign='center'>
                Commits on the "master" branch trigger the automatic update of your production
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description textAlign='center'>
                <label className='CD-cards-label'>PRODUCTION</label>
                <Form.Field
                  name='activateProduction'
                  control={ Checkbox }
                  onChange={ this._handleChangeCheckBox }
                  checked={ this.props.wizard.activateProduction }
                />
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column>
            <Form.Field
              options={ serviceOptions }
              control={ Select }
              label='CLOUD SERVICE'
              name='service'
              defaultValue={ this.props.wizard.service }
              onChange={ this._handleChangeSelect }
            />
          </Grid.Column>
          <Grid.Column>
            <Form.Field
              options={ databasesOptions }
              control={ Select }
              label='DATABASES'
              name='databases'
              defaultValue={ this.props.wizard.dataBases }
              onChange={ this._handleChangeSelect }
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column>
            {this.props.wizard.service === 'BLUEMIX-CF' && (
              <Form.Group>
                <Form.Field
                  options={ cfRegions }
                  control={ Select }
                  label='REGION'
                  name='CFAPI'
                  defaultValue={
                    this.props.wizard.VARS.find(v => v.key === 'CFAPI') &&
                    this.props.wizard.VARS.find(v => v.key === 'CFAPI').value
                  }
                  onChange={ this._handleChangeSelectVars }
                />
                <Form.Field
                  control={ Input }
                  placeholder='*************'
                  label='API KEY'
                  name='BXAPIKEY'
                  type='password'
                  defaultValue={
                    this.props.wizard.VARS.find(v => v.key === 'BXAPIKEY') &&
                    this.props.wizard.VARS.find(v => v.key === 'BXAPIKEY').value
                  }
                  onBlur={ this._handleChangeInput }
                />
                <Form.Field
                  control={ Input }
                  placeholder='OrganisationName'
                  label='ORGANIZATION'
                  name='CFORG'
                  defaultValue={
                    this.props.wizard.VARS.find(v => v.key === 'CFORG') &&
                    this.props.wizard.VARS.find(v => v.key === 'CFORG').value
                  }
                  onBlur={ this._handleChangeInput }
                />
              </Form.Group>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
export { ContinuousDeployment }
