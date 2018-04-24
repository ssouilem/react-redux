import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
// import styles from './BoardChart.less'

export class BoardCards extends React.Component {
  render = () => {
    console.log(this.props.currentstate)
    return (
      <Card.Group itemsPerRow={ 4 }>
        <Card fluid color='yellow' header={ this.props.currentstate.data && this.props.currentstate.data[0].value }
          description='To Do' />
        <Card fluid color='orange' header={ this.props.currentstate.data && this.props.currentstate.data[1].value }
          description='In progress' />
        <Card fluid color='red' header={ this.props.currentstate.data && this.props.currentstate.data[2].value }
          description='To validate / To Test' />
        <Card fluid color='green' header={ this.props.currentstate.data && this.props.currentstate.data[3].value }
          description='Closed' />
      </Card.Group>
    )
  }
}

BoardCards.propTypes = {
  currentstate: PropTypes.object,
}

export default BoardCards
