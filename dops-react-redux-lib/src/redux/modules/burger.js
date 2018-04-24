const STATE_CHANGED_BURGER = 'STATE_CHANGED_BURGER'
const CLOSE_BURGER = 'CLOSE_BURGER'

const onBurgerStateChange = (dispatch) => (state): Action => (
  dispatch({ type: STATE_CHANGED_BURGER, payload: { isOpen: state.isOpen } })
)

const closeBuger = (dispatch) => (): Action => (
  dispatch({ type: CLOSE_BURGER })
)

export const actions = {
  closeBuger,
  onBurgerStateChange,
}

const ACTION_HANDLERS = {
  [CLOSE_BURGER]: (state, action) => ({
    ...state,
    isOpen: false,
  }),
  [STATE_CHANGED_BURGER]: (state, action) => ({
    ...state,
    isOpen: action.payload.isOpen,
  }),
}

const initialState = {
  isOpen: false,
}

export default function burgerReducer (state = initialState, action: Action): object {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
