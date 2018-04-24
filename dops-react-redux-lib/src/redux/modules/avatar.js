import axios from 'axios'

const CREATE_AVATAR_SENDING = 'CREATE_AVATAR_SENDING'
const CREATE_AVATAR_SUCCESS = 'CREATE_AVATAR_SUCCESS'
const CREATE_AVATAR_FAILURE = 'CREATE_AVATAR_FAILURE'

const FETCH_AVATAR_SENDING = 'FETCH_AVATAR_SENDING'
const FETCH_AVATAR_SUCCESS = 'FETCH_AVATAR_SUCCESS'
const FETCH_AVATAR_FAILURE = 'FETCH_AVATAR_FAILURE'

const UPDATE_AVATAR_SENDING = 'UPDATE_AVATAR_SENDING'
const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS'
const UPDATE_AVATAR_FAILURE = 'UPDATE_AVATAR_FAILURE'

const avatarRequest = (dispatch, ownProps) => {
  const create = (data) => {
    const action = {
      types: [CREATE_AVATAR_SENDING, CREATE_AVATAR_SUCCESS, CREATE_AVATAR_FAILURE],
      promise: axios.post('/avatar', data),
    }
    dispatch(action)
  }
  const fetch = (email) => {
    const action = {
      types: [FETCH_AVATAR_SENDING, FETCH_AVATAR_SUCCESS, FETCH_AVATAR_FAILURE],
      promise: axios.get(`/avatar?email=${ email }`),
    }
    dispatch(action)
  }
  const update = (data) => {
    const action = {
      types: [UPDATE_AVATAR_SENDING, UPDATE_AVATAR_SUCCESS, UPDATE_AVATAR_FAILURE],
      promise: axios.put(`/avatar?email=${ data.email }`, data),
    }
    dispatch(action)
  }
  return {
    create,
    fetch,
    update,
  }
}

export const actions = {
  avatarRequest,
}

const ACTION_HANDLERS = {
  [CREATE_AVATAR_SENDING]: (state, action) => ({
    ...state,
    create: {
      error: undefined,
      sending: true,
      succeeded: false,
    },
  }),
  [CREATE_AVATAR_SUCCESS]: (state, action) => ({
    ...state,
    avatar: {
      data: action.result.data,
      error: undefined,
      sending: false,
    },
    create: {
      error: undefined,
      sending: false,
      succeeded: true,
    },
  }),
  [CREATE_AVATAR_FAILURE]: (state, action) => ({
    ...state,
    create: {
      error: action.error,
      sending: false,
      succeeded: false,
    },
  }),
  [FETCH_AVATAR_SENDING]: (state, action) => ({
    ...state,
    avatar: {
      data: undefined,
      error: undefined,
      sending: true,
    },
  }),
  [FETCH_AVATAR_SUCCESS]: (state, action) => ({
    ...state,
    avatar: {
      data: action.result.data,
      error: undefined,
      sending: false,
    },
  }),
  [FETCH_AVATAR_FAILURE]: (state, action) => ({
    ...state,
    avatar: {
      data: undefined,
      error: action.error,
      sending: false,
    },
  }),
  [UPDATE_AVATAR_SENDING]: (state, action) => ({
    ...state,
    update: {
      error: undefined,
      sending: true,
      succeeded: false,
    },
  }),
  [UPDATE_AVATAR_SUCCESS]: (state, action) => ({
    ...state,
    avatar: {
      data: action.result.data,
      error: undefined,
      sending: false,
    },
    update: {
      error: undefined,
      sending: false,
      succeeded: true,
    },
  }),
  [UPDATE_AVATAR_FAILURE]: (state, action) => ({
    ...state,
    update: {
      error: action.error,
      sending: false,
      succeeded: false,
    },
  }),
}

const initialState = {
  avatar: {
    data: undefined,
    error: undefined,
    sending: false,
  },
  create: {
    error: undefined,
    sending: false,
    succeeded: false,
  },
  update: {
    error: undefined,
    sending: false,
    succeeded: false,
  },
}

export default function avatarReducer (state = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
