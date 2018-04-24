import { applyMiddleware, compose, createStore } from 'redux'
import createMiddleware from 'SHARED_REDUX/middleware/clientMiddleware'
import createSagaMiddleware from 'redux-saga'
import { multiClientMiddleware } from 'redux-axios-middleware'
import clients from './clients'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

import watchMany from './sagas'

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [
    thunk,
    createMiddleware(),
    sagaMiddleware,
    routerMiddleware(history),
    multiClientMiddleware(clients),
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}
  sagaMiddleware.run(watchMany)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const reducers = require('./rootReducer').default
      store.replaceReducer(reducers)
    })
  }

  return store
}
