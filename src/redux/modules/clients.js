import axios from 'axios'

const FETCH_CLIENTS_SENDING = 'FETCH_CLIENTS_SENDING'
const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS'
const FETCH_CLIENTS_FAILURE = 'FETCH_CLIENTS_FAILURE'

const fetchClients = (dispatch) => (selectedClient) => {
  dispatch({
    types: [FETCH_CLIENTS_SENDING, FETCH_CLIENTS_SUCCESS, FETCH_CLIENTS_FAILURE],
    promise: axios.get('/clients', { withCredentials: true }),
  })
}

export const actions = {
  fetchClients,
}

const ACTION_HANDLERS = {
  [FETCH_CLIENTS_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
    data: undefined,
  }),
  [FETCH_CLIENTS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: action.result.data.map(client => ({ ...client, type: 'group' })),
  }),
  [FETCH_CLIENTS_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
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
