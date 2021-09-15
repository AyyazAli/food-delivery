import * as actionTypes from 'store/constants';
import axios from 'axios';


export const loginStart = () => {
    return { type: actionTypes.LOGIN_START }
}

export const loginSuccess = (data) => {
    return { type: actionTypes.LOGIN_SUCCESS, data }
}

export const loginFail = (error) => {
    return { type: actionTypes.LOGIN_FAIL, error }
}


export const logout = () => {
    return { type: actionTypes.LOGOUT }
}


export const authTimeOut = (expiresIn) => dispatch => {
    setTimeout(() => {
        dispatch(logout)
    }, expiresIn)
}



export const registerStart = () => {
    return { type: actionTypes.REGISTER_START }
}

export const registerFail = (error) => {
    return { type: actionTypes.REGISTER_FAIL, error }
}

export const registerSuccess = (data) => {
    return { type: actionTypes.REGISTER_SUCCESS, data }
}


export const signUp = (data, router) => dispatch => {
    dispatch(registerStart());
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/sign-up`, data).then(response => {
        dispatch(registerSuccess(response.data));
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', response.data.data.user)
        authTimeOut(response.data.expiresIn)
        // router.history.push('/');
    }).catch(err => {
        dispatch(registerFail(err.response.data));
    })
}

export const login = (email, password) => dispatch => {
    const authData = { email, password };
    console.log(authData)
    dispatch(loginStart());
    axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, authData).then(response => {
        dispatch(loginSuccess(response.data));
        dispatch(authTimeOut(response.data.expiresIn));
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', response.data.data.user)
        authTimeOut(response.data.expiresIn)
    }).catch(err => {
        dispatch(loginFail(err.response.data));
    });
}