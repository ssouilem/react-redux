const SET_WIZARD_PROPS = 'SET_WIZARD_PROPS'
const SET_WIZARD_DONE = 'SET_WIZARD_DONE'
const INCREMENT_STEP = 'INCREMENT_STEP'
const DECREMENT_STEP = 'DECREMENT_STEP'
const REINITIALIZE_WIZARD = 'REINITIALIZE_WIZARD'
const SET_WIZARD_VARS_PROPS = 'SET_WIZARD_VARS_PROPS'

const setWizardProps = dispatch => state => {
  dispatch({
    type: SET_WIZARD_PROPS,
    payload: state,
  })
}

const setWizardDone = dispatch => ({ done }) => {
  dispatch({
    type: SET_WIZARD_DONE,
    payload: { done },
  })
}

const reinitializeWizard = dispatch => () => {
  dispatch({
    type: REINITIALIZE_WIZARD,
    payload: initialState,
  })
}

const setWizardVarsProps = dispatch => state => {
  dispatch({
    type: SET_WIZARD_VARS_PROPS,
    payload: state,
  })
}

const setVariables = (VARS, VAR) => {
  var foundVar = VARS.find(o => o.key === VAR.key)
  if (foundVar) {
    foundVar.value = VAR.value
  } else {
    VARS.push(VAR)
  }

  return VARS
}

const next = dispatch => () => {
  console.log('NEXT FUNCTION IN WIZARD REDUCER ')
  return dispatch({
    type: INCREMENT_STEP,
  })
}
const prev = dispatch => () => {
  dispatch({
    type: DECREMENT_STEP,
  })
}
export const actions = {
  setWizardVarsProps,
  setWizardProps,
  reinitializeWizard,
  setWizardDone,
  next,
  prev,
}

const ACTION_HANDLERS = {
  [SET_WIZARD_PROPS]: (state, action) => ({
    ...state,
    done: action.payload.done || state.done,
    name: action.payload.name || state.name,
    slug: action.payload.slug || state.slug,
    description: action.payload.description || state.description,
    dataBases: action.payload.dataBases || state.dataBases,
    level: action.payload.level || state.level,
    language: action.payload.language || state.language,
    activateCD: action.payload.activateCD || state.activateCD,
    codeQuality: 'codeQuality' in action.payload ? action.payload.codeQuality : state.codeQuality,
    unitTests: 'unitTests' in action.payload ? action.payload.unitTests : state.unitTests,
    fonctionnalTests: 'fonctionnalTests' in action.payload ? action.payload.fonctionnalTests : state.fonctionnalTests,
    IntegrationTests: 'IntegrationTests' in action.payload ? action.payload.IntegrationTests : state.IntegrationTests,
    activateReviewApps:
      'activateReviewApps' in action.payload ? action.payload.activateReviewApps : state.activateReviewApps,
    activateProduction:
      'activateProduction' in action.payload ? action.payload.activateProduction : state.activateProduction,
    activateStaging: 'activateStaging' in action.payload ? action.payload.activateStaging : state.activateStaging,
    activateDeveloppement:
      'activateDeveloppement' in action.payload ? action.payload.activateDeveloppement : state.activateDeveloppement,
    useNexus: 'useNexus' in action.payload ? action.payload.useNexus : state.useNexus,
    useMonitoring: 'useMonitoring' in action.payload ? action.payload.useMonitoring : state.useMonitoring,
    useMetrology: 'useMetrology' in action.payload ? action.payload.useMetrology : state.useMetrology,
    useLogs: 'useLogs' in action.payload ? action.payload.useLogs : state.useLogs,
    billingTracking: action.payload.billingTracking || state.billingTracking,
    useBackups: 'useBackups' in action.payload ? action.payload.useBackups : state.useBackups,
    provider: action.payload.provider || state.provider,
    service: action.payload.service || state.service,

    // VARS: action.payload.currentStep || state.currentStep,
  }),
  [INCREMENT_STEP]: (state, action) => ({
    ...state,
    currentStep: ++state.currentStep,
  }),
  [DECREMENT_STEP]: (state, action) => ({
    ...state,
    currentStep: --state.currentStep,
  }),
  [SET_WIZARD_VARS_PROPS]: (state, action) => ({
    ...state,
    VARS: setVariables(state.VARS, action.payload),
    // VARS.push(action.payload.vars,
  }),
  [SET_WIZARD_DONE]: (state, action) => ({
    ...state,
    done: action.payload.done,
  }),
  [REINITIALIZE_WIZARD]: (state, action) => action.payload,
}

const initialState = {
  currentStep: -1,
  done: false,
  name: '',
  slug: undefined,
  description: '',
  level: 'private',
  language: 'NodeJS',
  activateCD: true,
  codeQuality: false,
  unitTests: true,
  fonctionnalTests: true,
  IntegrationTests: true,
  activateReviewApps: true,
  activateProduction: true,
  activateStaging: true,
  activateDeveloppement: true,
  service: 'none',
  dataBases: 'none',
  provider: 'BLUEMIX',
  useNexus: false,
  useMonitoring: true,
  useMetrology: true,
  useLogs: true,
  billingTracking: true,
  VARS: [
    {
      key: 'CFAPI',
      value: 'https://api.eu-gb.bluemix.net',
    },
    {
      key: 'APP',
      value: '',
    },
    {
      key: 'APPDOMAIN',
      value: '',
    },
  ],
}

export default function contextReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
