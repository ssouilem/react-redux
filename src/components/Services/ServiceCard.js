import React from 'react'
import PropTypes from 'prop-types'
import styles from './Services.less'
import { Link } from 'react-router'

export class ServiceCard extends React.Component {
  render = () =>
    <div className={ styles.serviceCardContainer }>
      { this.props.item.url
        ? <a href={ this.props.item.url } target='_blank'>
          <div className={ styles.serviceTitle }>
            { this.props.item.title }
          </div>
          <img src={ require(`./statics/${ this.props.item.logo }`) } className={ styles.logo } />
        </a>
        : <Link to={ this.props.item.to } >
          <div className={ styles.serviceTitle }>
            { this.props.item.title }
          </div>
          <img src={ require(`./statics/${ this.props.item.logo }`) } className={ styles.logo } />
        </Link>
      }
    </div>
}

ServiceCard.propTypes = {
  item: PropTypes.object.isRequired,
}

export default ServiceCard
