import { default as rootReducer } from 'redux/rootReducer'
import { createStore } from 'redux'

describe('(Redux Module) Root Reducer', () => {
  let store

  before(() => {
    let initialState
    Object.freeze(initialState)
    store = createStore(rootReducer, initialState)
  })

  it('should set the initial state', () => {
    expect(store.getState()).to.deep.equal(INITIAL_STATE)
  })

  const INITIAL_STATE = {
    avatar: {
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
    },
    redmine: {
      projects: { data: undefined, sending: false, error: undefined },
      project: { data: undefined, sending: false, error: undefined },
    },
    burger: { isOpen: false },
    form: {},
    user: { signIn: { data: undefined, sending: false, error: undefined } },
    search: { data: undefined, error: undefined, sending: false },
    router: { locationBeforeTransitions: null },
    toaster: { data: undefined },
  }
})
