import _ from 'lodash'

export const retrieveSending = (object, keys) => {
  if (keys.length === 1) {
    return object[keys[0]]
  }
  return retrieveSending(object[keys[0]], keys.slice(1))
}

export const isSending = (state, params) => {
  return _.reduce(params, (collection, item) => {
    let keys = item.split('.')
    return collection || retrieveSending(state, keys)
  }, false)
}
