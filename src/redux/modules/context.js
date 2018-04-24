import axios from 'axios'
import { isInGroupsPage, getGroupFullPath, getProjectFullPath } from 'utils/iframeHelper'
const GET_CONTEXT_PATH = 'GET_CONTEXT_PATH'
const SET_CONTEXT_PATH = 'SET_CONTEXT_PATH'
const SET_SELECTED_USER = 'SET_SELECTED_USER'
const SET_SELECTED_ROLE = 'SET_SELECTED_ROLE'
const RESET_CONTEXT_MEMBERS = 'RESET_CONTEXT_MEMBERS'

const FETCH_MEMBERS_SENDING = 'FETCH_MEMBERS_SENDING'
const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS'
const FETCH_MEMBERS_FAILURE = 'FETCH_MEMBERS_FAILURE'

const ADD_MEMBER_SENDING = 'ADD_MEMBER_SENDING'
const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS'
const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE'

const SET_MEMBER_ROLE_SENDING = 'SET_MEMBER_ROLE_SENDING'
const SET_MEMBER_ROLE_SUCCESS = 'SET_MEMBER_ROLE_SUCCESS'
const SET_MEMBER_ROLE_FAILURE = 'SET_MEMBER_ROLE_FAILURE'

const DELETE_MEMBER_SENDING = 'DELETE_MEMBER_SENDING'
const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS'
const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE'

const getContextPath = (dispatch) => () => {
  const contextType = isInGroupsPage() ? 'group' : 'project'
  const contextPath = isInGroupsPage() ? getGroupFullPath() : getProjectFullPath()
  return dispatch({
    type: GET_CONTEXT_PATH,
    payload: {
      contextPath: contextPath || '',
      contextType: contextType,
    },
  })
}

const fetchMembers = (dispatch) => (state) => {
  const contextType = state.contextType === 'group' ? 'clients' : 'projects'
  return dispatch({
    types: [FETCH_MEMBERS_SENDING, FETCH_MEMBERS_SUCCESS, FETCH_MEMBERS_FAILURE],
    promise: axios.get(`/${ contextType }/${ encodeURIComponent(state.contextPath) }/members`,
      { withCredentials: true }),
  })
}

const resetMembers = (dispatch) => () => (
  dispatch({
    type: RESET_CONTEXT_MEMBERS,
  })
)

const addMember = (dispatch) => (contextPath, userId, role, contextType = 'group') => {
  const entityTranformedType = contextType === 'group' ? 'clients' : 'projects'
  return dispatch({
    types: [ADD_MEMBER_SENDING, ADD_MEMBER_SUCCESS, ADD_MEMBER_FAILURE],
    promise: axios.post(`/${ entityTranformedType }/${ encodeURIComponent(contextPath) }/members`, {
      user_id: userId,
      role,
    })
    .then(result => (
      fetchMembers(dispatch)({ contextPath, contextType })
    )),
  })
}

const setMemberRole = (dispatch) => (contextPath, userId, roleId, contextType = 'group') => {
  const entityTranformedType = contextType === 'group' ? 'clients' : 'projects'
  dispatch({
    types: [SET_MEMBER_ROLE_SENDING, SET_MEMBER_ROLE_SUCCESS, SET_MEMBER_ROLE_FAILURE],
    promise: axios.put(`/${ entityTranformedType }/${ encodeURIComponent(contextPath) }/members/${ userId }`, {
      roleId,
    }),
  })
}

const deleteMember = (dispatch) => (contextPath, userId, contextType = 'group') => {
  const entityTranformedType = contextType === 'group' ? 'clients' : 'projects'
  dispatch({
    types: [DELETE_MEMBER_SENDING, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAILURE],
    promise: axios.delete(`/${ entityTranformedType }/${ encodeURIComponent(contextPath) }/members/${ userId }`,
      { withCredentials: true })
    .then(result => (
      fetchMembers(dispatch)({ contextPath, contextType })
    )),
  })
}

const setContextPath = (dispatch) => (fullPath, permission, alternativePage) => {
  if (permission !== null) {
    window.frames['iframous'].contentDocument.location.pathname = '/' + fullPath
  } else if (alternativePage) {
    window.frames['iframous'].contentDocument.location.pathname = '/' + alternativePage
  } else {
    window.frames['iframous'].contentDocument.location.pathname = '/'
  }
  return dispatch({
    type: SET_CONTEXT_PATH,
  })
}

const setSelectedUser = (dispatch) => (state) => (
  dispatch({
    type: SET_SELECTED_USER,
    payload: {
      selectedUser: state.selectedUser,
    },
  })
)

const setSelectedRole = (dispatch) => (state) => (
  dispatch({
    type: SET_SELECTED_ROLE,
    payload: {
      selectedRole: state.selectedRole,
    },
  })
)

export const actions = {
  getContextPath,
  setContextPath,
  setSelectedUser,
  setSelectedRole,
  resetMembers,
  fetchMembers,
  addMember,
  setMemberRole,
  deleteMember,
}

const ACTION_HANDLERS = {
  [GET_CONTEXT_PATH]: (state, action) => ({
    ...state,
    contextPath: action.payload.contextPath,
    contextType: action.payload.contextType,
    sending: false,
  }),
  [SET_CONTEXT_PATH]: (state, action) => ({
    ...state,
    sending: true,
  }),
  [SET_SELECTED_USER]: (state, action) => ({
    ...state,
    selectedUser: action.payload.selectedUser,
  }),
  [SET_SELECTED_ROLE]: (state, action) => ({
    ...state,
    selectedRole: action.payload.selectedRole,
  }),
  [FETCH_MEMBERS_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [FETCH_MEMBERS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    members: action.result.data,
    currentMemberAccessLevel: action.result.data.find(member => member.isCurrentUser).access_level,
  }),
  [FETCH_MEMBERS_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    members: undefined,
  }),
  [RESET_CONTEXT_MEMBERS]: (state, action) => ({
    ...state,
    members: undefined,
  }),
  [ADD_MEMBER_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [ADD_MEMBER_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
  }),
  [ADD_MEMBER_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [SET_MEMBER_ROLE_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [SET_MEMBER_ROLE_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    members: [...state.members.filter(user => user.id !== action.result.data.id), action.result.data],
  }),
  [SET_MEMBER_ROLE_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [DELETE_MEMBER_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [DELETE_MEMBER_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
  }),
  [DELETE_MEMBER_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
}

const initialState = {
  contextPath: undefined,
  sending: true,
  selectedRole: undefined,
  selectedUser: undefined,
  contextType: undefined,
  currentMemberAccessLevel: undefined,
  members: undefined,
}

export default function contextReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
