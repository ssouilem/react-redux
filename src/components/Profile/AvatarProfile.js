import React from 'react'
import Dropzone from 'react-dropzone'
import { FormattedMessage } from 'react-intl'

import { Image, Header, Grid, Segment, Form, Button } from 'semantic-ui-react'
import styles from './AvatarProfile.less'

class AvatarProfile extends React.Component {
  state = {
    avatar: undefined,
    files: [],
    UserByOpen: false,
  }
  onDrop (files) {
    this.setState({
      files,
    })
  }
  handleChange = (e, { value }) => this.setState({ value })
  componentWillMount () {
    if (this.props.user.signIn &&
      !this.props.user.signIn.sending &&
      this.props.user.signIn.data &&
      !this.props.user.signIn.data.ssh_key) {
      this.props.getProfile()
    }
    // if (!this.props.profile.sending && !this.props.profile.data) {
    //   console.log('_handleSelectUser : ', this.props.profile)
    //   this.props.fetch()
    // }
    if (this.props.avatar === undefined) {
      this.setState({ avatar: this.props.avatar })
    }

    // find the open user
    if (this.props.user.signIn.data && this.props.user.signIn.data.email.search(/^[a-z0-9._-]+@open-groupe.com$/)) {
      this.setState({ UserByOpen: true })
    }
  }
  render () {
    const { user } = this.props
    return (
      <div>
        <Grid columns={ 2 } divided container>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>
                <Header as='h2'>Avatar</Header>
                <Grid.Row divided columns={ 3 }>
                  <Grid.Column stretched className={ styles.avatar_profile }>
                    <Image src={ user.signIn && user.signIn.data && user.signIn.data.email
                      // @TODO remplacer email par le chemin d'avatar
                    } circular />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Group grouped>
                      <Form.Field control='input'
                        type='radio'
                        name='avatarRadioGroup'
                        checked={ this.state.value === 'myavatar' }
                        onChange={ this.handleChange }
                        label={ <FormattedMessage
                          id='checkbox.download.avatar'
                          description='download avatar'
                          defaultMessage='Télécharger une photo' /> } />
                      <Dropzone onDrop={ this.onDrop.bind(this) } multiple={ false } >
                        <p>{ <FormattedMessage id='dropzone.message'
                          description='dropzone message'
                          defaultMessage='Try dropping some files here, or click to select files to upload.' /> }</p>
                      </Dropzone>
                      <aside>
                        <h2>{ <FormattedMessage id='dropped.files'
                          description='dropped file' defaultMessage='Dropped files' /> }</h2>
                        <ul>
                          {
                            this.state.files.map(f => <li>{f.name} - {f.size} { <FormattedMessage id='unit.bytes'
                              description='unit bytes' defaultMessage='bytes' /> }</li>)
                          }
                        </ul>
                      </aside>
                      <br />
                      <Form.Field control='input'
                        type='radio'
                        name='avatarRadioGroup'
                        checked={ this.state.value === 'gravatar' }
                        onChange={ this.handleChange }
                        label={ <FormattedMessage
                          id='checkbox.use.gavatar'
                          description='use gavatar'
                          defaultMessage='Avatar public Gravatar' /> } />
                      <Form.Input size='mini'
                        label={ <FormattedMessage id='input.address.gavatar'
                          description='Adresse Gravatar' defaultMessage='Adresse Gravatar' /> }
                        placeholder={ user.signIn && user.signIn.data && user.signIn.data.email } />
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <Header as='h2'>
                  <FormattedMessage id='title.profile.informations'
                    description='title profile' defaultMessage='INFORMATIONS DU PROFIL' />
                </Header>
                <Form widths='equal'>
                  <Form.Input width={ 14 }
                    disabled={ this.state.UserByOpen }
                    label={ <FormattedMessage id='input.first.name'
                      description='first name' defaultMessage='First name' /> }
                    value={ user.signIn && user.signIn.data && user.signIn.data.first_name } />
                  <Form.Input width={ 14 } label={ <FormattedMessage id='input.last.name'
                    description='last name' defaultMessage='Last name' /> }
                    disabled={ this.state.UserByOpen }
                    value={ user.signIn && user.signIn.data && user.signIn.data.last_name } />
                  <Form.Input width={ 14 } label={ <FormattedMessage id='input.email.address'
                    description='e-mail address' defaultMessage='E-mail address' /> } disabled
                    value={ user.signIn && user.signIn.data && user.signIn.data.email } />
                  <Form.Input width={ 14 } label={ <FormattedMessage id='input.ssh.key'
                    description='SSH key' defaultMessage='SSH key' /> }
                    value={ user.signIn && user.signIn.data && user.signIn.data.ssh_key } />
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Button.Group floated='right' >
          <Button>{ <FormattedMessage id='button.cancel'
            description='button cancel' defaultMessage='Cancel' /> }</Button>
          <Button.Or />
          <Button positive>{ <FormattedMessage id='button.save'
            description='button save' defaultMessage='Save' /> }</Button>
        </Button.Group>
      </div>
    )
  }
}

export default AvatarProfile
