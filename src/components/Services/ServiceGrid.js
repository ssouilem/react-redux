import React from 'react'
import styles from './Services.less'
import ServiceCard from './ServiceCard'
import ServicesConfig from './config'

export class ServiceGrid extends React.Component {
  render = () =>
    <div className={ styles.serviceGridContainer }>
      { ServicesConfig.services.map((item) => <ServiceCard key={ item.title } item={ item } />) }
    </div>
}

export default ServiceGrid
