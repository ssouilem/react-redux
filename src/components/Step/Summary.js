import React from 'react'
import { Grid, Card, List } from 'semantic-ui-react'

class Summary extends React.Component {
  componentWillMount () {
    // if (!this.props.templates.template.sending && !this.props.templates.template.data) {
    //   let criteriaTemplate = {
    //     CD: 1,
    //     @TODO si "activateCD" === false, tu aura besoin que de SONAR=true ou false, et de NEXUS true ou false
    //     provider: this.props.wizard.provider.toUpperCase(),
    //     SONAR: this.props.wizard.codeQuality ? 1 : 0,
    //     language: this.props.wizard.language.toUpperCase(),
    //     offer: 'CF', // @TODO
    //     reviewapps: this.props.wizard.activateReviewApps ? 1 : 0,
    //     nexus: this.props.wizard.useNexus ? 1 : 0,
    //     staging: this.props.wizard.activateStaging ? 1 : 0,
    //   }

    //   console.log('criteriaTemplate  : ' + JSON.stringify(criteriaTemplate))
    //   // this.props.fetchWizardTemplate(criteriaTemplate)
    // }
  }
  render () {
    const appName =
      (this.props.wizard.VARS.find(v => v.key === 'APP') && this.props.wizard.VARS.find(v => v.key === 'APP').value) ||
      ''
    const appDomain =
      (this.props.wizard.VARS.find(v => v.key === 'APPDOMAIN') &&
        this.props.wizard.VARS.find(v => v.key === 'APPDOMAIN').value) ||
      ''
    return (
      <Grid columns='equal' container>
        <Grid.Row as={ Card.Group } centered>
          <Card className='CD-cards finnish' as={ Grid.Column } width={ 3 }>
            <Card.Content>
              <Card.Description textAlign='left'>
                <List>
                  <List.Item>
                    <List.Header>PROJECT NAME</List.Header>
                    <List>
                      <List.Item>{this.props.wizard.name}</List.Item>
                    </List>
                  </List.Item>
                  <List.Item>
                    <List.Header>VISIBILITY LEVEL</List.Header>
                    <List>
                      <List.Item>{this.props.wizard.level}</List.Item>
                    </List>
                  </List.Item>
                  <List.Item>
                    <List.Header>APPLICATION NAME</List.Header>
                    <List>
                      <List.Item>{appName}</List.Item>
                    </List>
                  </List.Item>
                  <List.Item>
                    <List.Header>APPLICATION DOMAIN</List.Header>
                    <List>
                      <List.Item>{appDomain}</List.Item>
                    </List>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className='CD-cards finnish' as={ Grid.Column } width={ 3 }>
            <Card.Content>
              <Card.Description textAlign='left'>
                <List>
                  <List.Item>
                    <List.Header>LANGUAGE</List.Header>
                    <List>
                      <List.Item>{this.props.wizard.language}</List.Item>
                    </List>
                  </List.Item>
                  <List.Item>
                    <List.Header>QUALITY</List.Header>
                    <List>
                      <List.Item>{this.props.wizard.codeQuality ? 'YES' : 'No'}</List.Item>
                    </List>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className='CD-cards finnish' as={ Grid.Column } width={ 3 }>
            <Card.Content>
              <Card.Description textAlign='left'>
                <List>
                  <List.Item>
                    <List.Header>ENVIRONMENTS</List.Header>
                    <List>
                      {this.props.wizard.activateReviewApps && <List.Item>REVIEWS APP</List.Item>}
                      {this.props.wizard.activateStaging && <List.Item>STAGING</List.Item>}
                      {this.props.wizard.activateProduction && <List.Item>PRODUCTION</List.Item>}
                    </List>
                  </List.Item>
                  <List.Item>
                    <List.Header>CLOUD PROVIDER</List.Header>
                    <List>
                      <List.Item>{this.props.wizard.provider}</List.Item>
                    </List>
                  </List.Item>
                  <List.Item>
                    <List.Header>SERVICE</List.Header>
                    <List>
                      <List.Item>{this.props.wizard.service}</List.Item>
                    </List>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className='CD-cards finnish' as={ Grid.Column } width={ 3 }>
            <Card.Content>
              <Card.Description textAlign='left'>
                <List>
                  <List.Item>
                    <List.Header>CONTUNUOUS APP</List.Header>
                    <List>
                      {this.props.wizard.useMonitoring && <List.Item>REVIEWS APP</List.Item>}
                      {this.props.wizard.useMetrology && <List.Item>STAGING</List.Item>}
                      {this.props.wizard.billingTracking && <List.Item>BILLING TRACKING</List.Item>}
                    </List>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid>
    )
  }
}
export { Summary }
