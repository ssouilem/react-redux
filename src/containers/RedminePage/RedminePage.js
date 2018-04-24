import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as redmineActions } from 'ACTIONS/redmine'
import ProjectGrid from 'COMPONENTS/Projects/ProjectGrid'
import styles from './RedminePage.less'

class RedminePage extends React.Component {
  componentWillMount = () => {
    if (!this.props.redmine.projects.sending && !this.props.redmine.projects.data) {
      this.props.fetchRedmineProjects()
    }
  }
  render = () =>
    <div className={ styles.page }>
      <div className={ styles.pageTitle }>
          Redmine Projects
      </div>
      { this.props.redmine.projects.data &&
        <ProjectGrid projects={ this.props.redmine.projects.data } />
      }
    </div>
}

RedminePage.propTypes = {
  fetchRedmineProjects: PropTypes.func.isRequired,
  redmine: PropTypes.object.isRequired,
}

const mapStateToProps = ({ redmine }) => ({ redmine })

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  fetchRedmineProjects: redmineActions.redmineRequests(dispatch).fetchRedmineProjects,
})

export { RedminePage }
export default connect(mapStateToProps, mapDispatchToProps)(RedminePage)
