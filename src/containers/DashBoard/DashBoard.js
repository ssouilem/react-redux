import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Segment, Header, Button } from 'semantic-ui-react'
import { actions as dashboardActions } from 'ACTIONS/dashboard'
import CurrentBoardState from 'COMPONENTS/CurrentBoardState/CurrentBoardState'
import BoardCards from 'COMPONENTS/BoardCards/BoardCards'
import BoardChart from 'COMPONENTS/BoardChart/BoardChart'
import styles from './DashBoard.less'

class DashBoard extends React.Component {
  state={ activeinit: true }
  _fetchBoard (period) {
    if (period==='month') {
      this.setState({ activeinit: true })
    } else {
      this.setState({ activeinit: false })
    }
    if (this.props.context.contextPath) {
      this.props.fetchProjectBoardChart(this.props.context.contextPath, period)
    }
  }
  render () {
    return (
      <div className={ styles.dashboard }>
        <Grid>
          <Grid.Row>
            <Segment.Group horizontal>
              <Segment>
                <Header
                  style={ { marginTop: '7px' } }
                  textAlign='center'
                  as='h3'
                  content={ this.props.context.contextPath } />
              </Segment>
              <Segment>
                <Button.Group>
                  <Button onClick={ this._fetchBoard.bind(this, 'week') }>Last week</Button>
                  <Button active={ this.state.activeinit }
                    onClick={ this._fetchBoard.bind(this, 'month') }>Last Month</Button>
                  <Button onClick={ this._fetchBoard.bind(this, 'year') }>Last Year</Button>
                </Button.Group>
              </Segment>
            </Segment.Group>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <BoardCards currentstate={ this.props.dashboard.currentstate } />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <CurrentBoardState
                contextPath={ this.props.context.contextPath }
                currentstate={ this.props.dashboard.currentstate }
                fetchBoardCurrentState={ this.props.fetchBoardCurrentState } />
            </Grid.Column>
            <Grid.Column>
              <BoardChart
                contextPath={ this.props.context.contextPath }
                contextType={ this.props.context.contextType }
                chartData={ this.props.dashboard.chartData }
                fetchProjectBoardChart={ this.props.fetchProjectBoardChart } />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

DashBoard.propTypes = {
  fetchProjectBoardChart: PropTypes.func,
  // fetchBoardCurrentState: PropTypes.func,
  dashboard: PropTypes.object,
}

const mapStateToProps = (state) => ({
  context: state.context,
  dashboard: state.dashboard,
  state,
})

const mapDispatchToProps = (dispatch) => ({
  fetchProjectBoardChart: dashboardActions.fetchProjectBoardChart(dispatch),
  fetchBoardCurrentState: dashboardActions.fetchBoardCurrentState(dispatch),
  dispatch,
})

export { DashBoard }
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
