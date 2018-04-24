import axios from 'axios'

const FETCH_WIZARD_TEMPLATE_SENDING = 'FETCH_WIZARD_TEMPLATE_SENDING'
const FETCH_WIZARD_TEMPLATE_SUCCESS = 'FETCH_WIZARD_TEMPLATE_SUCCESS'
const FETCH_WIZARD_TEMPLATE_FAILURE = 'FETCH_WIZARD_TEMPLATE_FAILURE'

const fetchWizardTemplate = dispatch => criteria => {
  console.log('criteria : ', JSON.stringify(criteria))
  dispatch({
    types: [FETCH_WIZARD_TEMPLATE_SENDING, FETCH_WIZARD_TEMPLATE_SUCCESS, FETCH_WIZARD_TEMPLATE_FAILURE],
    promise: axios.post('/templates/search', criteria),
  })
}

export const actions = {
  fetchWizardTemplate,
}

const ACTION_HANDLERS = {
  [FETCH_WIZARD_TEMPLATE_SENDING]: (state, action) => ({
    ...state,
    template: {
      sending: true,
      error: undefined,
      data: undefined,
    },
  }),
  [FETCH_WIZARD_TEMPLATE_FAILURE]: (state, action) => ({
    ...state,
    template: {
      sending: false,
      error: action.error,
      data: undefined,
    },
  }),
  [FETCH_WIZARD_TEMPLATE_SUCCESS]: (state, action) => ({
    ...state,
    NEXUS_TEMPLATE: action.result.data[0].name || state.NEXUS_TEMPLATE,
    NEXUS_URL: action.result.data[0].url || state.NEXUS_URL,
    template: {
      sending: false,
      error: undefined,
      data: action.result.data,
    },
  }),
}

const initialState = {
  NEXUS_TEMPLATE: 'CD-BLUEMIX-CF-REVIEWAPPS-STAGING-NODEJS-noNEXUS-noSONAR',
  NEXUS_URL:
    'https://mirkwood.dops.open.global/repository/dops-raw/' +
    'templates//CD-BLUEMIX-CF-REVIEWAPPS-STAGING-NODEJS-noNEXUS-noSONAR.tar.gz',
  VARIABLES: [
    {
      documentation: '',
      name: 'APP',
      description: 'Application name, used for identifying in CF, and in the url',
    },
    {
      documentation: '',
      name: 'APPDOMAIN',
      description: 'Domain name for the app',
    },
    {
      validate: [
        'https://api.eu-gb.bluemix.net',
        'https://api.eu-de.bluemix.net',
        'https://api.au-syd.bluemix.net',
        'https://api.us-east.bluemix.net',
        'https://api.ng.bluemix.net',
      ],
      documentation: '',
      validate_type: 'array',
      name: 'CFAPI',
      description: 'Entrypoint for bluemix',
    },
    {
      documentation: '',
      name: 'CFORG',
      description: 'BlueMix Organisation',
    },
    {
      documentation: '',
      name: 'BXAPIKEY',
      description: 'Bluemix API KEY',
    },
  ],
  template: {
    data: undefined,
    sending: false,
    error: undefined,
  },
}

export default function contextReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
