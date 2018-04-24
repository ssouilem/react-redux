import axios from 'axios'

const FETCH_CHART_SENDING = 'FETCH_CHART_SENDING'
const FETCH_CHART_SUCCESS = 'FETCH_CHART_SUCCESS'
const FETCH_CHART_FAILURE = 'FETCH_CHART_FAILURE'

const FETCH_CURRENT_STATE_SENDING = 'FETCH_CURRENT_STATE_SENDING'
const FETCH_CURRENT_STATE_SUCCESS = 'FETCH_CURRENT_STATE_SUCCESS'
const FETCH_CURRENT_STATE_FAILURE = 'FETCH_CURRENT_STATE_FAILURE'

const FETCH_FINANCIAL_REPORT_SENDING = 'FETCH_FINANCIAL_REPORT_SENDING'
const FETCH_FINANCIAL_REPORT_SUCCESS = 'FETCH_FINANCIAL_REPORT_SUCCESS'
const FETCH_FINANCIAL_REPORT_FAILURE = 'FETCH_FINANCIAL_REPORT_FAILURE'

const fetchProjectBoardChart = (dispatch) => (path, period) => {
  dispatch({
    types: [FETCH_CHART_SENDING, FETCH_CHART_SUCCESS, FETCH_CHART_FAILURE],
    promise: axios.get(`/kpi/project/chart?period=${ period }&path=${ path }`,
      { withCredentials: true }),
  })
}

const fetchBoardCurrentState = (dispatch) => (path) => {
  dispatch({
    types: [FETCH_CURRENT_STATE_SENDING, FETCH_CURRENT_STATE_SUCCESS, FETCH_CURRENT_STATE_FAILURE],
    promise: axios.get(`/kpi/project/currentstate?path=${ path }`, { withCredentials: true }),
  })
}

const fetchFinancialReport = (dispatch) => (client, project) => {
  dispatch({
    types: [FETCH_FINANCIAL_REPORT_SENDING, FETCH_FINANCIAL_REPORT_SUCCESS, FETCH_FINANCIAL_REPORT_FAILURE],
    promise: axios.get(`/kpi/financial?client=${ client }&project=${ project }`, { withCredentials: true }),
  })
}

export const actions = {
  fetchProjectBoardChart,
  fetchBoardCurrentState,
  fetchFinancialReport,
}

const ACTION_HANDLERS = {
  [FETCH_CHART_SENDING]: (state, action) => ({
    ...state,
    chartData: {
      sending: true,
      error: undefined,
      data: undefined,
    },
  }),
  [FETCH_CHART_SUCCESS]: (state, action) => ({
    ...state,
    chartData: {
      sending: false,
      error: undefined,
      data: action.result.data,
    },
  }),
  [FETCH_CHART_FAILURE]: (state, action) => ({
    ...state,
    chartData: {
      sending: false,
      error: action.error,
      data: undefined,
    },
  }),
  [FETCH_CURRENT_STATE_SENDING]: (state, action) => ({
    ...state,
    currentstate: {
      sending: true,
      error: undefined,
      data: undefined,
    },
  }),
  [FETCH_CURRENT_STATE_SUCCESS]: (state, action) => ({
    ...state,
    currentstate: {
      sending: false,
      error: undefined,
      data: action.result.data,
    },
  }),
  [FETCH_CURRENT_STATE_FAILURE]: (state, action) => ({
    ...state,
    currentstate: {
      sending: false,
      error: action.error,
      currentstate: undefined,
    },
  }),
  [FETCH_FINANCIAL_REPORT_SENDING]: (state, action) => ({
    ...state,
    financialData: {
      sending: true,
      error: undefined,
      data: undefined,
    },
  }),
  [FETCH_FINANCIAL_REPORT_SUCCESS]: (state, action) => ({
    ...state,
    financialData: {
      sending: false,
      error: undefined,
      data: action.result.data,
    },
  }),
  [FETCH_FINANCIAL_REPORT_FAILURE]: (state, action) => ({
    ...state,
    financialData: {
      sending: false,
      error: action.error,
      currentstate: undefined,
    },
  }),
}

const initialState = {
  currentstate: {
    data: undefined,
    sending: undefined,
    error: undefined,
  },
  chartData: {
    data: undefined,
    sending: false,
    error: undefined,
  },
  financialData: {
    data: undefined,
    sending: false,
    error: undefined,
  },
}

export default function contextReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
