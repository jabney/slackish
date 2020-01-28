import { combineReducers } from 'redux'
import namespaces from './namespaces'
import namespace from './namespace'
import user from './user'

const root = combineReducers({
  user,
  namespaces,
  namespace,
})

export default root
