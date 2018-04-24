import React from 'react'
// import PropTypes from 'prop-types'
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid } from 'recharts'
import styles from './BoardChart.less'

// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }
// const data = [
//   { name: 2343, 'To do': getRandomInt(2, 30), 'In progress': getRandomInt(2, 30), 'Done': getRandomInt(2, 30) },
//   { name: 3234, 'To do': getRandomInt(2, 30), 'In progress': getRandomInt(2, 30), 'Done': getRandomInt(2, 30) },
//   { name: 23432, 'To do': getRandomInt(2, 30), 'In progress': getRandomInt(2, 30), 'Done': getRandomInt(2, 30) },
//   { name: 32454, 'To do': getRandomInt(2, 30), 'In progress': getRandomInt(2, 30), 'Done': getRandomInt(2, 30) },
//   { name: 342, 'To do': getRandomInt(2, 30), 'In progress': getRandomInt(2, 30), 'Done': getRandomInt(2, 30) },
//   { name: 432, 'To do': getRandomInt(2, 30), 'In progress': getRandomInt(2, 30), 'Done': getRandomInt(2, 30) },
//   { name: 3245, 'To do': getRandomInt(2, 30), 'In progress': getRandomInt(2, 30), 'Done': getRandomInt(2, 30) },
// ]

export class BoardChart extends React.Component {
  componentWillMount () {
    if (!this.props.chartData.sending && this.props.contextPath) {
      this.props.fetchProjectBoardChart(this.props.contextPath, 'month')
    }
  }
  render = () =>
    <div className={ styles.boardChartContainer }>
      <LineChart data={ this.props.chartData.data || [ { name: 'no data' } ] } width={ 530 } height={ 250 }
        margin={ { top: 5, right: 30, left: 2, bottom: 5 } }>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='To do' stroke='#8884d8' activeDot={ { r: 8 } } />
        <Line type='monotone' dataKey='In progress' stroke='#82ca9d' />
        <Line type='monotone' dataKey='Done' stroke='red' />
        <Line type='monotone' dataKey='To validate / To Test' stroke='green' />
      </LineChart>
    </div>
}

BoardChart.propTypes = {
  // chartData: PropTypes.object,
  // fetchProjectBoardChart: PropTypes.func,
}

export default BoardChart
