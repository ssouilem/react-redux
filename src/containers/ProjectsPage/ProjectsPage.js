import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Steps } from 'antd'
import { Button, Segment, Dimmer, Loader, Header, Divider } from 'semantic-ui-react'
import { actions as usersActions } from 'ACTIONS/users'
import { actions as projectsActions } from 'ACTIONS/projects'
import { actions as portalActions } from 'ACTIONS/portal'
import { actions as contextActions } from 'ACTIONS/context'
import { actions as clientsActions } from 'ACTIONS/clients'
import { actions as wizardFormActions } from 'ACTIONS/wizard.form'
import { actions as templatesActions } from 'ACTIONS/templates'
import { Introduction } from 'COMPONENTS/Step/Introduction'
import { Description } from 'COMPONENTS/Step/Description'
import { ContinuousIntegration } from 'COMPONENTS/Step/ContinuousIntegration'
import { ContinuousDeployment } from 'COMPONENTS/Step/ContinuousDeployment'
import { ContinuousOps } from 'COMPONENTS/Step/ContinuousOps'
import { Summary } from 'COMPONENTS/Step/Summary'

import styles from './ProjectsPage.less'

class ProjectsPage extends React.Component {
  state = {}
  _handleSubmitWizard = event => {
    let templateName = `CD-${ this.props.wizard.service }-${
      this.props.wizard.activateReviewApps ? 'REVIEWAPPS' : 'noREVIEWAPPS'
    }-${ this.props.wizard.activateStaging ? 'STAGING' : 'noSTAGING' }-${ this.props.wizard.language.toUpperCase() }-${
      this.props.wizard.useNexus ? 'NEXUS' : 'noNEXUS'
    }-${ this.props.wizard.codeQuality ? 'SONAR' : 'noSONAR' }`

    this.props.createProject({
      name: this.props.wizard.name,
      description: this.props.wizard.description,
      groupId: this.props.wizard.slug,
      templateId: templateName,
      quality: this.props.wizard.codeQuality,
      logs: this.props.wizard.useLogs,
      artifacts: this.props.wizard.useNexus,
      vars: this.props.wizard.VARS,
    })
  }
  _handleNavigateToProject = event => {
    this.props.wizard.done &&
      typeof this.props.wizard.done === 'string' &&
      this.props.setContextPath(this.props.wizard.done, true) &&
      this.props.closePortal() &&
      this.props.reinitializeWizard()
  }
  render () {
    const { currentStep } = this.props
    const Step = Steps.Step
    const steps = [
      {
        title: 'PROJECT DESCRIPTION',
        component: (
          <Description
            wizard={ this.props.wizard }
            setWizardProps={ this.props.setWizardProps }
            setWizardVarsProps={ this.props.setWizardVarsProps }
            users={ this.props.users }
            getUsers={ this.props.getUsers }
            fetchClients={ this.props.fetchClients }
            clients={ this.props.clients }
          />
        ),
      },
      {
        title: 'CONTINUOUS INTEGRATION',
        component: (
          <ContinuousIntegration
            wizard={ this.props.wizard }
            setWizardProps={ this.props.setWizardProps }
            setWizardVarsProps={ this.props.setWizardVarsProps }
          />
        ),
      },
      {
        title: 'CONTINUOUS DEPLOYMENT',
        component: (
          <ContinuousDeployment
            wizard={ this.props.wizard }
            setWizardProps={ this.props.setWizardProps }
            fetchWizardTemplate={ this.props.fetchWizardTemplate }
            setWizardVarsProps={ this.props.setWizardVarsProps }
          />
        ),
      },
      {
        title: 'CONTINUOUS OPS',
        component: <ContinuousOps wizard={ this.props.wizard } setWizardProps={ this.props.setWizardProps } />,
      },
      {
        title: 'SUMMARY',
        component: (
          <Summary
            wizard={ this.props.wizard }
            templates={ this.props.templates }
            setWizardProps={ this.props.setWizardProps }
            fetchWizardTemplate={ this.props.fetchWizardTemplate }
          />
        ),
      },
    ]
    return (
      <div className={ styles.projectsPage }>
        <Dimmer active={ !!this.props.wizard.done && currentStep !== -1 } inverted>
          <Header as='h2' icon>
            <p className={ styles.projectSuccess }>YOUR PROJECT HAS BEEN SUCCESSFULLY CREATED.</p>
            <Divider hidden />
            <Header.Subheader>
              <Button color='teal' size='large' onClick={ this._handleNavigateToProject }>
                Access to the project
              </Button>
            </Header.Subheader>
          </Header>
        </Dimmer>
        {!this.props.wizard.done &&
          this.props.projects.sending && (
            <Dimmer active inverted>
              <Loader size='large'>GENERATING PROJECT! Please wait...</Loader>
            </Dimmer>
          )}
        {!this.props.wizard.done &&
          currentStep !== -1 && (
            <Segment attached='top'>
              <Steps progressDot current={ currentStep }>
                {steps.map(item => <Step key={ item.title } title={ item.title } description='' />)}
              </Steps>
            </Segment>
          )}
        <Segment attached={ currentStep !== -1 } className='steps-content'>
          {!this.props.wizard.done && currentStep !== -1 && steps[currentStep].component}
          {!this.props.wizard.done && currentStep === -1 && <Introduction />}
        </Segment>
        <Segment attached='bottom' className='button-content' textAlign='center'>
          {!this.props.wizard.done &&
            currentStep === -1 && (
              <Button content='Start' size='large' color='blue' onClick={ () => this.props.next() } />
            )}
          {!this.props.wizard.done &&
            currentStep !== -1 && (
              <Button
                className='step-button-left'
                content='Previous'
                color='blue'
                size='small'
                icon='chevron left'
                labelPosition='left'
                floated='left'
                onClick={ () => this.props.prev() }
              />
            )}
          {!this.props.wizard.done &&
            currentStep < steps.length - 1 &&
            currentStep !== -1 && (
              <Button
                className='step-button-right'
                content='Next'
                color='blue'
                icon='chevron right'
                size='small'
                labelPosition='right'
                floated='right'
                onClick={ () => this.props.next() }
              />
            )}
          {!this.props.wizard.done &&
            currentStep === steps.length - 1 && (
              <Button
                content='Generate'
                className='step-button'
                color='teal'
                size='small'
                onClick={ this._handleSubmitWizard }
              />
            )}
        </Segment>
      </div>
    )
  }
}

ProjectsPage.propTypes = {
  currentStep: PropTypes.number,
  next: PropTypes.func,
  prev: PropTypes.func,
}

const mapStateToProps = state => ({
  projects: state.projects,
  users: state.users,
  currentStep: state.wizard.currentStep,
  wizard: state.wizard,
  templates: state.templates,
  clients: state.clients,
  state,
})

const mapDispatchToProps = dispatch => ({
  getUsers: usersActions.getUsers(dispatch),
  fetchProjects: projectsActions.fetchProjects(dispatch),
  createProject: projectsActions.createProject(dispatch),
  setWizardProps: wizardFormActions.setWizardProps(dispatch),
  setWizardVarsProps: wizardFormActions.setWizardVarsProps(dispatch),
  reinitializeWizard: wizardFormActions.reinitializeWizard(dispatch),
  fetchWizardTemplate: templatesActions.fetchWizardTemplate(dispatch),
  setContextPath: contextActions.setContextPath(dispatch),
  fetchClients: clientsActions.fetchClients(dispatch),
  closePortal: portalActions.closePortal(dispatch),
  next: wizardFormActions.next(dispatch),
  prev: wizardFormActions.prev(dispatch),
  dispatch,
})

export { ProjectsPage }
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)
