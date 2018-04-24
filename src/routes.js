import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from 'CONTAINERS/App/App'
import DashBoard from 'CONTAINERS/DashBoard/DashBoard'
import MembersPage from 'CONTAINERS/MembersPage/MembersPage'
import ProjectsPage from 'CONTAINERS/ProjectsPage/ProjectsPage'
import HomePage from 'CONTAINERS/HomePage/HomePage'
import ProfilePage from 'CONTAINERS/ProfilePage/ProfilePage'
import FinancialReportingPage from 'CONTAINERS/FinancialReportingPage/FinancialReportingPage'
import NotFoundPage from 'components/NotFound/NotFoundPage'
import SignInPage from 'CONTAINERS/Authentication/SignInPage'

export default store => (
  <Route path='/' component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path='connexion' component={ SignInPage } />
    {/* <Route path='myAccount' component={ MyAccount } onEnter={ userActions.tryToReconnect(store) } /> */}
    <Route path='profile' component={ ProfilePage } />
    <Route path='members' component={ MembersPage } />
    <Route path='projects' component={ ProjectsPage } />
    <Route path='report' component={ FinancialReportingPage } />
    <Route path='report'>
      <Route path='financial' component={ FinancialReportingPage } />
      <Route path='operational' component={ DashBoard } />
    </Route>
    <Route path='404' component={ NotFoundPage } />
    <Redirect from='*' to='/404' />
  </Route>
)
