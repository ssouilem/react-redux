import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from 'containers/Root/Root'
import configureAxios from './axios.init'
import createStore from './redux/createStore'
import { addLocaleData, IntlProvider } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import frmessages from 'INTL/lang/fr.json'
import enmessages from 'INTL/lang/en.json'

document.domain = 'dops.open.global'
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router",
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
})

if (__DEBUG__ && window.devToolsExtension) {
  window.devToolsExtension.open()
}

const messages = new RegExp('^fr').test(navigator.language) ? frmessages : enmessages
addLocaleData([...en, ...fr])
configureAxios(store)

const logPageView = () => {
}

const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  const routes = require('./routes').default(store)
  ReactDOM.render(
    <IntlProvider locale={ navigator.language } messages={ messages } >
      <Root history={ history } logPageView={ logPageView } routes={ routes } store={ store } routerKey={ routerKey } />
    </IntlProvider>,
    MOUNT_NODE
  )
}

if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={ error } />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes'], () => render())
}

render()
