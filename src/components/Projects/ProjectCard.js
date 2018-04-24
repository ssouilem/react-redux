import React from 'react'
import PropTypes from 'prop-types'
import styles from './Projects.less'
import { Link } from 'react-router'

export class ProjectCard extends React.Component {
  render = () =>
    <div className={ styles.projectCardContainer }>
      <Link to={ `https://erebor.dops.open.global/projects/${ this.props.item.identifier }` } target='_blank' >
        <div className={ styles.projectTitle }>
          { this.props.item.name }
        </div>
      </Link>
    </div>
}

ProjectCard.propTypes = {
  item: PropTypes.object.isRequired,
}

export default ProjectCard
