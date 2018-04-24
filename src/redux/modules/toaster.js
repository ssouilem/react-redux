const OPEN_TOAST = 'OPEN_TOAST'
const CLOSE_TOAST = 'CLOSE_TOAST'

const toasterRequest = (dispatch) => {
  const close = () => {
    dispatch({ type: CLOSE_TOAST })
  }
  const open = (data, timeout=10000) => {
    dispatch({ type: OPEN_TOAST, data: data })
    setTimeout(() => {
      dispatch({ type: CLOSE_TOAST })
    }, timeout)
  }
  return {
    close,
    open,
  }
}

export const actions = {
  toasterRequest,
}

const ACTION_HANDLERS = {
  [OPEN_TOAST]: (state, action) => ({ ...state, data: action.data }),
  [CLOSE_TOAST]: (state, action) => ({ ...state, data: undefined }),
}

const initialState = {
  data: undefined,
}

export default function toasterReducer (state = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
