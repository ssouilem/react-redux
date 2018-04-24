import React from 'react'
import { Card, Form, Checkbox, Grid } from 'semantic-ui-react'

class ContinuousOps extends React.Component {
  constructor (props) {
    super(props)
    this._handleChangeSelect = this._handleChangeSelect.bind(this)
    this._handleChangeCheckBox = this._handleChangeCheckBox.bind(this)
  }
  _handleChangeSelect (event, { name, value }) {
    console.log('ContinuousOps : _handleChangeSelect ', this, name, value)
    this.props.setWizardProps({ [name]: value })
  }
  _handleChangeCheckBox (event, { name, checked }) {
    console.log('ContinuousOps : _handleChangeCheckBox ', this, name, checked)
    this.props.setWizardProps({ [name]: checked })
  }
  // @TODO validation de formulaire && regex
  render () {
    return (
      <Grid columns='equal' container>
        <Grid.Row as={ Card.Group }>
          <Card width={ 5 } as={ Grid.Column } className='CD-cards'>
            <Card.Content>
              <Card.Description textAlign='center'>
                gitlab performance Monitoring makes it possible to measure a wwide variety of statics of your instance
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description textAlign='center'>
                <label className='CD-cards-label'>HEALTH CHECK</label>
                <Form.Field
                  name='useMonitoring'
                  control={ Checkbox }
                  disabled
                  onChange={ this._handleChangeCheckBox }
                  checked={ this.props.wizard.useMonitoring }
                />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={ Grid.Column } className='CD-cards'>
            <Card.Content>
              <Card.Description textAlign='center'>
                Centralize your logs and trace your application event
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description textAlign='center'>
                <label className='CD-cards-label'>LOGS TRACKING</label>
                <Form.Field
                  name='useLogs'
                  control={ Checkbox }
                  onChange={ this._handleChangeCheckBox }
                  checked={ this.props.wizard.useLogs }
                />
              </Card.Description>
            </Card.Content>
          </Card>
          <Card as={ Grid.Column } className='CD-cards'>
            <Card.Content>
              <Card.Description textAlign='center'>
                Track your billing status and activity analysis as a dashboard
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description textAlign='center'>
                <label className='CD-cards-label'>BILLING TRACKING</label>
                <Form.Field
                  name='billingTracking'
                  disabled
                  control={ Checkbox }
                  onChange={ this._handleChangeCheckBox }
                  checked={ this.props.wizard.billingTracking }
                />
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid>
    )
  }
}
export { ContinuousOps }
