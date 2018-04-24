import axios from 'axios'

const FETCH_REDMINE_PROJECTS_SENDING = 'FETCH_REDMINE_PROJECTS_SENDING'
const FETCH_REDMINE_PROJECTS_SUCCESS = 'FETCH_REDMINE_PROJECTS_SUCCESS'
const FETCH_REDMINE_PROJECTS_FAILURE = 'FETCH_REDMINE_PROJECTS_FAILURE'

const FETCH_REDMINE_PROJECT_SENDING = 'FETCH_REDMINE_PROJECT_SENDING'
const FETCH_REDMINE_PROJECT_SUCCESS = 'FETCH_REDMINE_PROJECT_SUCCESS'
const FETCH_REDMINE_PROJECT_FAILURE = 'FETCH_REDMINE_PROJECT_FAILURE'

const redmineRequests = (dispatch) => {
  const fetchRedmineProjects = () => {
    const action = {
      types: [FETCH_REDMINE_PROJECTS_SENDING, FETCH_REDMINE_PROJECTS_SUCCESS, FETCH_REDMINE_PROJECTS_FAILURE],
      promise: axios.get('/redmine/projects'),
    }
    dispatch(action)
  }

  const fetchRedmineProject = (projectName) => {
    const action = {
      types: [FETCH_REDMINE_PROJECT_SENDING, FETCH_REDMINE_PROJECT_SUCCESS, FETCH_REDMINE_PROJECT_FAILURE],
      promise: axios.get(`/redmine/projects/${ projectName }`),
    }
    dispatch(action)
  }
  return {
    fetchRedmineProjects,
    fetchRedmineProject,
  }
}

export const actions = {
  redmineRequests,
}

const ACTION_HANDLERS = {
  [FETCH_REDMINE_PROJECTS_SENDING]: (state, action) => ({
    ...state, projects: { sending: true, error: undefined, data: undefined } }),
  [FETCH_REDMINE_PROJECTS_SUCCESS]: (state, action) => ({
    ...state, projects: { sending: false, error: undefined, data: action.result.data.projects } }),
  [FETCH_REDMINE_PROJECTS_FAILURE]: (state, action) => ({
    ...state, projects: { sending: false, error: action.error, data: undefined } }),
  [FETCH_REDMINE_PROJECT_SENDING]: (state, action) => ({
    ...state, project: { sending: true, error: undefined, data: undefined } }),
  [FETCH_REDMINE_PROJECT_SUCCESS]: (state, action) => ({
    ...state, project: { sending: false, error: undefined, data: action.result.data.project } }),
  [FETCH_REDMINE_PROJECT_FAILURE]: (state, action) => ({
    ...state, project: { sending: false, error: action.error, data: undefined } }),
}

const initialState = {
  projects: { data: undefined, sending: false, error: undefined },
  project: { data: undefined, sending: false, error: undefined },
}

export default function userReducer (state = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
