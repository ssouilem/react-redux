import React from 'react'
import { Form, Radio, Grid, Select } from 'semantic-ui-react'

class ContinuousIntegration extends React.Component {
  constructor (props) {
    super(props)
    this._handleChangeSelect = this._handleChangeSelect.bind(this)
    this._handleChangeCheckBox = this._handleChangeCheckBox.bind(this)
  }

  _handleChangeSelect (event, { name, value }) {
    console.log('ContinuousIntegration : _handleChangeSelect ', this, name, value)
    this.props.setWizardProps({ [name]: value })
  }

  _handleChangeCheckBox (event, { name, value }) {
    console.log('ContinuousIntegration :  _handleChangeCheckBox ', this, name, value)
    let checked = value === 'yes'
    this.props.setWizardProps({ [name]: !!checked })
  }
  // @TODO validation de formulaire && regex

  render () {
    // @TODO Chargement de la liste avec reduce
    const options = [
      { key: '1', text: 'JavaScript', value: 'NodeJS', checked: true },
      { key: '2', text: 'Python', value: 'Python', checked: false },
      { key: '3', text: 'PHP', value: 'PHP', checked: false, disabled: true },
      { key: '4', text: 'JAVA', value: 'JAVA', checked: false, disabled: true },
    ]
    return (
      <Grid columns={ 2 } as={ Form } container>
        <Grid.Row>
          <Grid.Column width={ 8 }>
            <Form.Field
              options={ options }
              label='SELECT THE LANGUAGE'
              defaultValue={ this.props.wizard.language }
              onChange={ this._handleChangeSelect }
              control={ Select }
            />
            <p className='wizard-description'>
              A private deposit associated with the language you have chosen (NPM for NodeJs, Python, ...) is at your
              diposal
            </p>
          </Grid.Column>
          <Grid.Column width={ 8 }>
            <Form.Group grouped>
              <label>CODE QUALITY</label>
              <p className='wizard-description'>Do you want to track the code quality of your project ?</p>
            </Form.Group>
            <Form.Group inline>
              <Form.Field
                label='Yes'
                control={ Radio }
                name='codeQuality'
                value='yes'
                onChange={ this._handleChangeCheckBox }
                checked={ this.props.wizard.codeQuality === true }
              />
              <Form.Field
                label='No'
                control={ Radio }
                name='codeQuality'
                value='no'
                onChange={ this._handleChangeCheckBox }
                checked={ this.props.wizard.codeQuality === false }
              />
            </Form.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
export { ContinuousIntegration }
