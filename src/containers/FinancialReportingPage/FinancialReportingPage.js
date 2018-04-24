import React from 'react'
import { Grid, Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { actions as dashboardActions } from 'ACTIONS/dashboard'
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid } from 'recharts'
import { connect } from 'react-redux'
import styles from './FinancialReportingPage.less'

class FinancialReportingPage extends React.Component {
  componentWillMount () {
    if (!this.props.financialData.sending && this.props.contextPath) {
      let array = this.props.contextPath.split('/')
      this.props.fetchFinancialReport(array[0], array[2])
    }
  }
  render () {
    return (
      <div className={ styles.financialPage }>
        <Grid columns={ 1 }>
          <Grid.Row columns={ 1 }>
            <Grid.Column>
              <span className={ styles.bigHeader }>
                { this.props.contextPath.split('/')[0] + ': ' }
              </span>
              <span className={ styles.mediumHeader }>
                { "COUT D'UTILISATON DU CLOUD (30 jours glissants)" }
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card fluid color >
                <Grid.Row className={ styles.card }>
                  <Grid.Column>
                    <span className={ styles.smallHeader }>
                      CUMULS PAR SERVICES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;
                    </span>
                  </Grid.Column>
                  <Grid.Column>
                    <BarChart width={ 750 } height={ 250 }
                      data={ (this.props.financialData.data && this.props.financialData.data.services) || [] }>
                      <CartesianGrid vertical={ false }
                        horizontalPoints={ [ 0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200 ] } />
                      <XAxis dataKey='name' />
                      <YAxis axisLine={ false } tickLine={ false } unit=' $' />
                      <Tooltip />
                      <Legend layout='vertical' align='left' verticalAlign='middle' />
                      <Bar label='hello' unit=' $' dataKey='COMPUTE' stackId='a' fill='#F4940B' />
                      <Bar unit=' $' dataKey='DATABASE' stackId='a' fill='#EFD518' />
                      <Bar unit=' $' dataKey='FILE STORAGE' stackId='a' fill='#3DB9EA' />
                    </BarChart>
                  </Grid.Column>
                </Grid.Row>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card fluid color>
                <Grid.Row className={ styles.card }>
                  <Grid.Column>
                    <span className={ styles.smallHeader }>CUMULS PAR ENVIRONEMENTS</span>
                  </Grid.Column>
                  <Grid.Column>
                    <BarChart width={ 750 } height={ 250 }
                      data={ (this.props.financialData.data && this.props.financialData.data.environments) || [] }>
                      <CartesianGrid vertical={ false }
                        horizontalPoints={ [ 0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200 ] } />
                      <XAxis dataKey='name' />
                      <YAxis axisLine={ false } tickLine={ false } unit=' $' />
                      <Tooltip />
                      <Legend layout='vertical' align='left' verticalAlign='middle' />
                      <Bar label='somme' unit=' $' dataKey='REVIEW APPS' stackId='a' fill='#94e1f0' />
                      <Bar unit=' $' dataKey='STAGING' stackId='a' fill='#f0817d' />
                      <Bar unit=' $' dataKey='PRODUCTION' stackId='a' fill='#c7a7dc' />
                    </BarChart>
                  </Grid.Column>
                </Grid.Row>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

FinancialReportingPage.propTypes = {
  contextPath: PropTypes.string,
  financialData: PropTypes.object,
  fetchFinancialReport: PropTypes.func,
}

const mapStateToProps = (state) => ({
  contextPath: state.context.contextPath,
  financialData: state.dashboard.financialData,
  state,
})

const mapDispatchToProps = (dispatch) => ({
  fetchFinancialReport: dashboardActions.fetchFinancialReport(dispatch),
  dispatch,
})

export { FinancialReportingPage }
export default connect(mapStateToProps, mapDispatchToProps)(FinancialReportingPage)
