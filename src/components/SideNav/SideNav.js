import React from 'react'
import { Breadcrumb } from 'semantic-ui-react'

class SideNav extends React.Component {
  render () {
    const { routes } = this.props
    return (
      <Breadcrumb>
        { routes && routes.map((route) => (
          <Breadcrumb.Section
            link={ !route.active }
            active={ route.active }
            // onClick={ this._onClickHandler.bind(this) }
            >{ route.pathname }
            { !route.active ? (
              <Breadcrumb.Divider icon='right angle' />
            ) : '' }
          </Breadcrumb.Section>
        ))
      }
      </Breadcrumb>
    )
  }
  _onClickHandler (e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    this.setState({ pathname: e.currentTarget.pathname })
    console.log(e.currentTarget.pathname)
    this.props.history.push(e.currentTarget.pathname)
    return false
  }
}

export default SideNav
