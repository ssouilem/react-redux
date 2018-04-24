const SEARCH_SENDING = 'SEARCH_SENDING'
const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
const SEARCH_FAILURE = 'SEARCH_FAILURE'

const searchRequest = (dispatch) => (query, size, from) => {
  const action = {
    types: [SEARCH_SENDING, SEARCH_SUCCESS, SEARCH_FAILURE],
    payload: {
      client: 'searchEngine',
      request: {
        url: `/search?q=${ query }&from=${ from }&size=${ size }`,
        method: 'get',
      },
    },
  }
  dispatch(action)
}

export const actions = {
  searchRequest,
}

const ACTION_HANDLERS = {
  [SEARCH_SENDING]: (state, action) => ({
    ...state, data: undefined, error: undefined, sending: true }),
  [SEARCH_SUCCESS]: (state, action) => ({
    ...state, data: action.payload.data, error: undefined, sending: false }),
  [SEARCH_FAILURE]: (state, action) => ({
    ...state, data: undefined, error: action.error, sending: false }),
}

const initialState = {
  data: undefined,
  error: undefined,
  sending: false,
}

export default function searchReducer (state = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
