import React from 'react'
import PropTypes from 'prop-types'
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts'
import styles from './CurrentBoardState.less'

// const getRandomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

// const data = [
//   { name: 'To do', value: getRandomInt(10, 30) }, { name: 'In progress', value: getRandomInt(10, 30) },
//   { name: 'Done', value: getRandomInt(10, 30) }, { name: 'Closed', value: getRandomInt(10, 30) },
// ]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export class CurrentBoardState extends React.Component {
  componentWillMount () {
    if (!this.props.currentstate.sending && this.props.contextPath) {
      this.props.fetchBoardCurrentState(this.props.contextPath)
    }
  }
  render = () =>
    <div className={ styles.serviceCardContainer }>
      <PieChart width={ 300 } height={ 300 }>
        <Pie data={ this.props.currentstate.data || [] } innerRadius={ 40 } outerRadius={ 80 } fill='#82ca9d'
          label>
          { this.props.currentstate.data &&
          this.props.currentstate.data.map((entry, index) =>
            <Cell key={ `${ index }` } fill={ COLORS[index % COLORS.length] } />)
          }
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
}

CurrentBoardState.propTypes = {
  currentstate: PropTypes.object,
  contextPath: PropTypes.string,
  fetchBoardCurrentState: PropTypes.func,
}

export default CurrentBoardState
