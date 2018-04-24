import React from 'react'
import styles from './Projects.less'
import PropTypes from 'prop-types'
import ProjectCard from './ProjectCard'

export class ProjectGrid extends React.Component {
  render = () =>
    <div className={ styles.projectGridContainer }>
      { this.props.projects.map((project) => <ProjectCard key={ project.name } item={ project } />) }
    </div>
}

ProjectGrid.propTypes = {
  projects: PropTypes.array.isRequired,
}

export default ProjectGrid
