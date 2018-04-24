import React from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Icon, Header, Image } from 'semantic-ui-react'
import { push } from 'react-router-redux'
import styles from './HomePage.less'

class HomePage extends React.Component {
  _handleButtonClick = to => {
    this.props.dispatch(push(to))
  }
  componentWillMount = () => {}
  render = () => (
    <Grid columns='equal' container className={ styles.homePage }>
      <Grid.Row className={ styles.homePageRowTop }>
        <Grid.Column textAlign='center'>
          <Header size='huge' inverted content='Devoted to boost perfection' />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered className={ styles.homePageRow }>
        <Grid.Column textAlign='center'>
          <Button
            circular
            className={ styles.bigIcons }
            onClick={ this._handleButtonClick.bind(this, 'projects') }
            color='yellow'
          >
            <Icon.Group size='big'>
              <Icon
                as={ Image }
                size='big'
                src={ require('FRONT_THEME/assets/images/projet.png') }
                className={ styles.smallIcon }
                name='users'
              />
            </Icon.Group>
          </Button>
          <p>Let's start a new Project</p>
          <p className={ styles.LabelOrange }>
            <Image src={ require('FRONT_THEME/assets/images/pointer.png') } centered />
            Start here
          </p>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Button
            circular
            className={ styles.bigIcons }
            color='orange'
            onClick={ this._handleButtonClick.bind(this, 'members') }
            inverted
          >
            <Icon.Group size='big'>
              <Icon
                as={ Image }
                size='big'
                src={ require('FRONT_THEME/assets/images/membres.png') }
                className={ styles.smallIcon }
                name='users'
              />
            </Icon.Group>
          </Button>
          <p>onBoard your team</p>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Button
            circular
            className={ styles.bigIcons }
            onClick={ this._handleButtonClick.bind(this, 'reporting') }
            color='blue'
            inverted
          >
            <Icon.Group size='big'>
              <Icon
                as={ Image }
                size='big'
                src={ require('FRONT_THEME/assets/images/reporting.png') }
                className={ styles.smallIcon }
                name='users'
              />
            </Icon.Group>
          </Button>
          <p>Beyond reporting</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

HomePage.propTypes = {}

const mapStateToProps = ({ search }) => ({ search })

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export { HomePage }
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
