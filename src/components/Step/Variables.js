import React from 'react'
import { Header, Form, Container, Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

class Variables extends React.Component {
  constructor () {
    super()
    this.state = {}
    this._handleChangeInput = this._handleChangeInput.bind(this)
  }

  _handleChangeInput (event) {
    console.log('Variables : _handleChangeInput ', this)
    const { name, value } = event.target
    this.props.setWizardVarsProps({ key: name, value })
  }

  componentWillMount () {
    if (!this.props.templates.template.sending && !this.props.templates.template.data) {
      let criteriaTemplate = {
        CD: 1, // @TODO si "activateCD" === false, tu aura besoin que de SONAR=true ou false, et de NEXUS true ou false
        provider: this.props.wizard.provider.toUpperCase(),
        SONAR: this.props.wizard.codeQuality ? 1 : 0,
        language: this.props.wizard.language.toUpperCase(),
        offer: 'CF', // @TODO
        reviewapps: this.props.wizard.activateReviewApps ? 1 : 0,
        nexus: this.props.wizard.useNexus ? 1 : 0,
        staging: this.props.wizard.activateStaging ? 1 : 0,
      }

      console.log('criteriaTemplate  : '+ JSON.stringify(criteriaTemplate))
      this.props.fetchWizardTemplate(criteriaTemplate)
    }
  }

  _formattedMessageFixed = (props) => (
    <FormattedMessage { ...props } />
  )
  render () {
    return (
      <div>
        <Form>
          <Grid columns='equal'>
            <Grid.Row>
              <Header as='h3'><FormattedMessage
                id='HEADER_VARIABLE'
                description='titre variable'
                defaultMessage='Variables' /></Header>
            </Grid.Row>
            <Grid.Row>
              <Container fluid>
                <p>Gitlab exposes certain environment variables which can be used to override their defaults values.
                  <br />
                 More information here :&nbsp;
                  <a href='https://docs.gitlab.com/ce/ci/variables/README.html'>
                  https://docs.gitlab.com/ce/ci/variables/README.html
                  </a>
                </p>
              </Container>
            </Grid.Row>
          </Grid>
          <Grid columns={ 2 } >
            { !this.props.templates.template.sending && this.props.templates.template.data &&
             this.props.templates.template.data[0].variables.map((item, index) => {
               console.log('Index : ', index, item.name, this.props.templates.template.data[0].variables.length)
               if (index % 2 === 0 && index+1 < this.props.templates.template.data[0].variables.length) {
                 return (
                   <Grid.Row key={ index } >
                     <Grid.Column>
                       <Form.Input placeholder={ item.name }
                         name={ item.name }
                         onBlur={ this._handleChangeInput }
                         label={ this._formattedMessageFixed(
                           {
                             id: 'VARS.'+ item.name,
                           }) } />
                     </Grid.Column>
                     <Grid.Column>
                       <Form.Input placeholder={ this.props.templates.template.data[0].variables[index +1].name }
                         name={ this.props.templates.template.data[0].variables[index +1].name }
                         onBlur={ this._handleChangeInput }
                         label={ this._formattedMessageFixed(
                           {
                             id: 'VARS.'+ this.props.templates.template.data[0].variables[index +1].name,
                           }) } />
                     </Grid.Column>
                   </Grid.Row>
                 )
               } else if (index === this.props.templates.template.data[0].variables.length-1 &&
                 this.props.templates.template.data[0].variables.length % 2 !== 0) {
                 return (
                   <Grid.Row key={ index } >
                     <Grid.Column>
                       <Form.Input placeholder={ item.name }
                         name={ item.name }
                         onBlur={ this._handleChangeInput }
                         label={ this._formattedMessageFixed(
                           {
                             id: 'VARS.'+ item.name,
                           }) } />
                     </Grid.Column>
                   </Grid.Row>)
               }
             })
            }
          </Grid>
        </Form>
      </div>
    )
  }
}
export { Variables }
