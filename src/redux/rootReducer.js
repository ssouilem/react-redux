import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import portal from './modules/portal'
import toaster from './modules/toaster'
import dashboard from './modules/dashboard'
import user from './modules/user'
import projects from './modules/projects'
import clients from './modules/clients'
import users from './modules/users'
import context from './modules/context'
import wizard from './modules/wizard.form'
import templates from './modules/templates'
import search from './modules/search'

export const SIGN_OUT = 'SIGN_OUT'

const appReducer = combineReducers({
  dashboard,
  portal,
  form,
  context,
  router,
  toaster,
  clients,
  projects,
  wizard,
  templates,
  user,
  users,
  search,
})

const rootReducer = (state, action) => (appReducer(action.type === SIGN_OUT ? undefined : state, action))

export default rootReducer
