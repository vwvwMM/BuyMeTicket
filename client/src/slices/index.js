import globalReducer from './globalSlice'
import loginReducer from './loginSlice'
import profileReducer from './profileSlice'
import searchReducer from './searchSlice'

export const reducers = {
  global: globalReducer,
  login: loginReducer,
  profile: profileReducer,
  search: searchReducer,
}
