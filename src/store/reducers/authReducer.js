import { updateObject } from 'utils/helperFunctions';
import * as actionTypes from 'store/constants';

const initialState = {
  token: null,
  user: null,
  error: null,
  loggedIn: false
}


const authStart = (state, action) => {
  return updateObject(state, { error: null });
}

const authFail = (state, action) => {
  return updateObject(state, { error: action.error})
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.data.token,
    user: action.data.data.user,
    loggedIn: true,
    error: null,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START: return authStart(state, action);
    case actionTypes.LOGIN_FAIL: return authFail(state, action)
    case actionTypes.LOGIN_SUCCESS: return authSuccess(state, action)
    case actionTypes.LOGOUT: return updateObject(state, { token: null, user: null, loggedIn: false })
    case actionTypes.REGISTER_START: return authStart(state, action);
    case actionTypes.REGISTER_FAIL: return authFail(state, action)
    case actionTypes.REGISTER_SUCCESS: return authSuccess(state, action)

    default:
      return state;
  }
}

export default reducer;
