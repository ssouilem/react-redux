import axios from 'axios'

const GET_USERS_SENDING = 'GET_USERS_SENDING'
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
const GET_USERS_FAILURE = 'GET_USERS_FAILURE'

const getUsers = (dispatch) => () => {
  const action = {
    types: [GET_USERS_SENDING, GET_USERS_SUCCESS, GET_USERS_FAILURE],
    promise: axios.get('/users', { withCredentials: true }),
  }
  dispatch(action)
}

export const actions = {
  getUsers,
}

const ACTION_HANDLERS = {
  [GET_USERS_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
    data: undefined,
  }),
  [GET_USERS_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
  }),
  [GET_USERS_SUCCESS]: (state, action) => ({
    ...state,
    error: undefined,
    sending: false,
    data: action.result.data,
  }),
}

const initialState = {
  data: undefined,
  sending: false,
  error: undefined,
}

export default function userReducer (state = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
