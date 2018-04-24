import axios from 'axios'
import { sandbox } from 'sinon'
import reduxCreateStore from 'redux/createStore'
import { actions } from 'SHARED_REDUX/modules/avatar'

describe('(Redux Module) avatar', () => {
  let store, axiosGet, axiosPost, axiosPut
  beforeEach(() => {
    sandbox.create()
    store = reduxCreateStore({})
    axiosGet = sandbox.stub(axios, 'get')
    axiosPost = sandbox.stub(axios, 'post')
    axiosPut = sandbox.stub(axios, 'put')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('create -', () => {
    it('Should update the state to CREATE_AVATAR_SENDING', () => {
      axiosPost.returns(Promise.resolve())
      expect(store.getState().avatar.create).deep.equal({ error: undefined, sending: false, succeeded: false })
      actions.avatarRequest(store.dispatch).create({
        eyes: { style: 'foo', color: 'foo' },
        face: { style: 'foo', color: 'foo' },
        hair: { style: 'foo', color: 'foo' },
        mouth: { style: 'foo', color: 'foo' },
        nose: { style: 'foo', color: 'foo' },
      })
      expect(store.getState().avatar.create).deep.equal({ error: undefined, sending: true, succeeded: false })
    })

    it('Should update the state to CREATE_AVATAR_SUCCESS', (done) => {
      axiosPost.returns(Promise.resolve({ data: { _id: 'foo' } }))
      actions.avatarRequest(store.dispatch).create({
        eyes: { style: 'foo', color: 'foo' },
        face: { style: 'foo', color: 'foo' },
        hair: { style: 'foo', color: 'foo' },
        mouth: { style: 'foo', color: 'foo' },
        nose: { style: 'foo', color: 'foo' },
      })
      setTimeout(() => {
        expect(store.getState().avatar.avatar).deep.equal({ data: { _id: 'foo' }, error: undefined, sending: false })
        expect(store.getState().avatar.create).deep.equal({ error: undefined, sending: false, succeeded: true })
        done()
      })
    })

    it('Should update the state to CREATE_AVATAR_FAILURE', (done) => {
      axiosPost.returns(Promise.reject('someError'))
      actions.avatarRequest(store.dispatch).create({
        eyes: { style: 'foo', color: 'foo' },
        face: { style: 'foo', color: 'foo' },
        hair: { style: 'foo', color: 'foo' },
        mouth: { style: 'foo', color: 'foo' },
        nose: { style: 'foo', color: 'foo' },
      })
      setTimeout(() => {
        expect(store.getState().avatar.create).deep.equal({ error: 'someError', sending: false, succeeded: false })
        done()
      }, 0)
    })
  })

  describe('fetch -', () => {
    it('Should update the state to FETCH_AVATAR_SENDING', () => {
      axiosGet.returns(Promise.resolve())
      actions.avatarRequest(store.dispatch).fetch({ id: 123 })
      expect(store.getState().avatar.avatar).deep.equal({ data: undefined, error: undefined, sending: true })
    })

    it('Should update the state to FETCH_AVATAR_SUCCESS', (done) => {
      axiosGet.returns(Promise.resolve({ data: { _id: 'foo' } }))
      actions.avatarRequest(store.dispatch).fetch({ id: 123 })
      setTimeout(() => {
        expect(store.getState().avatar.avatar).deep.equal({ data: { _id: 'foo' }, error: undefined, sending: false })
        done()
      })
    })

    it('Should update the state to FETCH_AVATAR_FAILURE', (done) => {
      axiosGet.returns(Promise.reject('someError'))
      actions.avatarRequest(store.dispatch).fetch({ id: 123 })
      setTimeout(() => {
        expect(store.getState().avatar.avatar).deep.equal({ data: undefined, error: 'someError', sending: false })
        done()
      }, 0)
    })
  })

  describe('update -', () => {
    it('Should update the state to UPDATE_AVATAR_SENDING', () => {
      axiosPut.returns(Promise.resolve())
      actions.avatarRequest(store.dispatch).update({
        id: 123,
        eyes: { style: 'foo', color: 'foo' },
        face: { style: 'foo', color: 'foo' },
        hair: { style: 'foo', color: 'foo' },
        mouth: { style: 'foo', color: 'foo' },
        nose: { style: 'foo', color: 'foo' },
      })
      expect(store.getState().avatar.avatar).deep.equal({ data: undefined, error: undefined, sending: false })
    })

    it('Should update the state to UPDATE_AVATAR_SUCCESS', (done) => {
      axiosPut.returns(Promise.resolve({ data: { _id: 'foo' } }))
      actions.avatarRequest(store.dispatch).update({
        id: 123,
        eyes: { style: 'foo', color: 'foo' },
        face: { style: 'foo', color: 'foo' },
        hair: { style: 'foo', color: 'foo' },
        mouth: { style: 'foo', color: 'foo' },
        nose: { style: 'foo', color: 'foo' },
      })
      setTimeout(() => {
        expect(store.getState().avatar.avatar).deep.equal({ data: { _id: 'foo' }, error: undefined, sending: false })
        expect(store.getState().avatar.update).deep.equal({ error: undefined, sending: false, succeeded: true })
        done()
      })
    })

    it('Should update the state to UPDATE_AVATAR_FAILURE', (done) => {
      axiosPut.returns(Promise.reject('someError'))
      actions.avatarRequest(store.dispatch).update({
        id: 123,
        eyes: { style: 'foo', color: 'foo' },
        face: { style: 'foo', color: 'foo' },
        hair: { style: 'foo', color: 'foo' },
        mouth: { style: 'foo', color: 'foo' },
        nose: { style: 'foo', color: 'foo' },
      })
      setTimeout(() => {
        expect(store.getState().avatar.avatar).deep.equal({ data: undefined, error: undefined, sending: false })
        done()
      }, 0)
    })
  })
})
