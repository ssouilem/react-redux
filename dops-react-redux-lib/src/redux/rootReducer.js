import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import burger from 'SHARED_REDUX/modules/burger'
import toaster from 'SHARED_REDUX/modules/toaster'
import avatar from 'SHARED_REDUX/modules/avatar'
import search from 'SHARED_REDUX/modules/search'

export const SIGN_OUT = 'SIGN_OUT'

const appReducer = combineReducers({
  avatar,
  burger,
  form,
  router,
  toaster,
  search,
})

const rootReducer = (state, action) => (appReducer(action.type === SIGN_OUT ? undefined : state, action))

export default rootReducer
