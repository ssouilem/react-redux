import axios from 'axios'
import reduxCreateStore from 'redux/createStore'
import { assert, sandbox } from 'sinon'
import { actions } from 'ACTIONS/redmine'

describe('(Redux Module) user', () => {
  let store, axiosGet
  beforeEach(() => {
    sandbox.create()
    store = reduxCreateStore({})
    axiosGet = sandbox.stub(axios, 'get')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('Fetch redmine Projects', () => {
    it('should have state initialized', () => {
      expect(store.getState().redmine.projects).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('should call axios get when calling fetchRedmineProjects', () => {
      axiosGet.returns(Promise.resolve({ data: { projects: [{ _id: 'project1' }, { _id: 'project2' }] } }))
      actions.redmineRequests(store.dispatch).fetchRedmineProjects()
      assert.calledWithExactly(axiosGet, '/redmine/projects')
    })

    it('should fetch state after FETCH_REDMINE_PROJECTS_SENDING (while promise is still executing)', () => {
      axiosGet.returns(Promise.resolve())
      actions.redmineRequests(store.dispatch).fetchRedmineProjects()
      expect(store.getState().redmine.projects).deep.equal({
        data: undefined,
        error: undefined,
        sending: true,
      })
    })

    it('should fetch state after FETCH_REDMINE_PROJECTS_FAILURE (promise fail)', (done) => {
      axiosGet.returns(Promise.reject('someError'))
      actions.redmineRequests(store.dispatch).fetchRedmineProjects()
      setTimeout(() => {
        expect(store.getState().redmine.projects).deep.equal({ data: undefined, error: 'someError', sending: false })
        done()
      }, 0)
    })

    it('should fetch state after FETCH_REDMINE_PROJECTS_SUCCESS (promise success)', (done) => {
      axiosGet.returns(Promise.resolve({ data: { projects: [{ _id: 'project1' }, { _id: 'project2' }] } }))
      actions.redmineRequests(store.dispatch).fetchRedmineProjects()
      setTimeout(() => {
        expect(store.getState().redmine.projects).deep.equal({
          data: [{ _id: 'project1' }, { _id: 'project2' }],
          error: undefined,
          sending: false,
        })
        done()
      })
    })
  })

  describe('Fetch redmine Project', () => {
    it('should have state initialized', () => {
      expect(store.getState().redmine.project).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('should call axios get when calling fetchRedmineProject', () => {
      axiosGet.returns(Promise.resolve({ data: { projects: [{ _id: 'project1' }, { _id: 'project2' }] } }))
      actions.redmineRequests(store.dispatch).fetchRedmineProject('project_name')
      assert.calledWithExactly(axiosGet, '/redmine/projects/project_name')
    })

    it('should fetch state after FETCH_REDMINE_PROJECT_SENDING (while promise is still executing)', () => {
      axiosGet.returns(Promise.resolve())
      actions.redmineRequests(store.dispatch).fetchRedmineProject('project_name')
      expect(store.getState().redmine.project).deep.equal({
        data: undefined,
        error: undefined,
        sending: true,
      })
    })

    it('should fetch state after FETCH_REDMINE_PROJECT_FAILURE (promise fail)', (done) => {
      axiosGet.returns(Promise.reject('someError'))
      actions.redmineRequests(store.dispatch).fetchRedmineProject('project_name')
      setTimeout(() => {
        expect(store.getState().redmine.project).deep.equal({ data: undefined, error: 'someError', sending: false })
        done()
      }, 0)
    })

    it('should fetch state after FETCH_REDMINE_PROJECT_SUCCESS (promise success)', (done) => {
      axiosGet.returns(Promise.resolve({ data: { project: { _id: 'project1' } } }))
      actions.redmineRequests(store.dispatch).fetchRedmineProject('project_name')
      setTimeout(() => {
        expect(store.getState().redmine.project).deep.equal({
          data: { _id: 'project1' },
          error: undefined,
          sending: false,
        })
        done()
      })
    })
  })
})
