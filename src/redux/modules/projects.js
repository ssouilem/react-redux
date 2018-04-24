import axios from 'axios'
import { actions as wizardActions } from './wizard.form'

axios.defaults.withCredentials = true

const FETCH_PROJECTS_SENDING = 'FETCH_PROJECTS_SENDING'
const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE'

const CREATE_PROJECT_SENDING = 'CREATE_PROJECT_SENDING'
const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS'
const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE'

const fetchProjects = dispatch => () =>
  dispatch({
    types: [FETCH_PROJECTS_SENDING, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILURE],
    promise: axios.get(`/projects`, { withCredentials: true }),
  })

const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

const createProject = dispatch => projectProps => {
  return dispatch({
    types: [CREATE_PROJECT_SENDING, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE],
    promise: axios
      .post('/projects', {
        name: projectProps.name,
        description: projectProps.description,
        groupId: projectProps.groupId,
        quality: projectProps.quality,
        logs: projectProps.logs,
        artifacts: projectProps.artifacts,
        templateId: projectProps.templateId,
        vars: projectProps.vars,
      })
      .then(async project => {
        await wait(7000)
        axios.get(`/projects/stats/${ project.data.messageId }`).then(stat => {
          console.log('Project created on Gitlab ', stat.data.project)
          wizardActions.setWizardDone(dispatch)({
            done: stat.data.project.path_with_namespace,
          })
        })
      }),
  })
}

export const actions = {
  fetchProjects,
  createProject,
}

const ACTION_HANDLERS = {
  [FETCH_PROJECTS_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [FETCH_PROJECTS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: action.result.data.map(project => ({ ...project, type: 'project' })),
  }),
  [FETCH_PROJECTS_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
  }),
  [CREATE_PROJECT_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [CREATE_PROJECT_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    done: action.result.data.project.path_with_namespace,
    error: undefined,
  }),
  [CREATE_PROJECT_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
}

const initialState = {
  data: undefined,
  sending: false,
  error: undefined,
}

export default function contextReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
