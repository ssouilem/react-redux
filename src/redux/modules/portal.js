const STATE_CHANGED_PORTAL = 'STATE_CHANGED_PORTAL'
const OPEN_PORTAL = 'OPEN_PORTAL'
const CLOSE_PORTAL = 'CLOSE_PORTAL'
const STATE_CHANGED_SIDEBAR = 'STATE_CHANGED_SIDEBAR'
const UPDATE_IS_MOBILE = 'UPDATE_IS_MOBILE'
const SELECTED_PORTAL_SIDEBAR = 'SELECTED_PORTAL_SIDEBAR'

const onPortalStateChange = (dispatch) => (state) => (
  dispatch({
    type: STATE_CHANGED_PORTAL,
    payload: {
      portalIsOpen: state.portalIsOpen,
    },
  })
)

const changeSidebarState = (dispatch) => (state) => (
  dispatch({
    type: STATE_CHANGED_SIDEBAR,
    payload: {
      sidebarIsCollapsed: state.sidebarIsCollapsed,
    },
  })
)

const updateIsMobile = (dispatch) => (state) => (
  dispatch({
    type: UPDATE_IS_MOBILE,
    payload: {
      displayIsMobile: state.displayIsMobile,
    },
  })
)

const openPortal = (dispatch) => () => (
  dispatch({
    type: OPEN_PORTAL,
  })
)

const closePortal = (dispatch) => () => (
  dispatch({
    type: CLOSE_PORTAL,
  })
)
const selectedItem = dispatch => (state) => {
  console.log('Selected ITEM ')
  return dispatch({
    type: SELECTED_PORTAL_SIDEBAR,
    payload: {
      portalSideBarActive: state.portalSideBarActive,
    },
  })
}

export const actions = {
  openPortal,
  closePortal,
  changeSidebarState,
  updateIsMobile,
  onPortalStateChange,
  selectedItem,
}

const ACTION_HANDLERS = {
  [OPEN_PORTAL]: (state, action) => ({
    ...state,
    portalIsOpen: true,
  }),
  [CLOSE_PORTAL]: (state, action) => ({
    ...state,
    portalIsOpen: false,
  }),
  [STATE_CHANGED_PORTAL]: (state, action) => ({
    ...state,
    portalIsOpen: action.payload.portalIsOpen,
  }),
  [STATE_CHANGED_SIDEBAR]: (state, action) => ({
    ...state,
    sidebarIsCollapsed: action.payload.sidebarIsCollapsed,
  }),
  [UPDATE_IS_MOBILE]: (state, action) => ({
    ...state,
    displayIsMobile: action.payload.displayIsMobile,
    sidebarIsCollapsed: action.payload.displayIsMobile ? true : state.sidebarIsCollapsed,
  }),
  [SELECTED_PORTAL_SIDEBAR]: (state, action) => ({
    ...state,
    portalSideBarActive: action.payload.portalSideBarActive,
    // portalSideBarUrl: action.payload.portalSideBarUrl,
  }),
}

const initialState = {
  portalIsOpen: false,
  sidebarIsCollapsed: true,
  displayIsMobile: false,
  portalSideBarActive: '/',
  portalSideBarUrl: '',
}

export default function portalReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
