import * as actionTypes from 'store/constants';
import axios from 'axios';
import axiosInstance from 'utils/axiosInstance';


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
    localStorage.setItem('token', null)
    localStorage.setItem('expiresIn', null)
    localStorage.setItem('role', null)
    localStorage.setItem('userId', null)
    localStorage.setItem('loggedIn', false)
    return { type: actionTypes.LOGOUT }
}

export const authTimeOut = (expiresIn) => dispatch => {
    setTimeout(() => {
        // dispatch(logout)
    }, expiresIn)
}


const setLocalStorage = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('expiresIn', data.expiresIn)
    localStorage.setItem('role', data.data.user.role)
    localStorage.setItem('userId', data.data.user.userId)
    localStorage.setItem('loggedIn', true)
}
const getLocalStorage = (data) => {
    return {
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
        userId: localStorage.getItem('userId'),
        expiresIn: localStorage.getItem('expiresIn'),
        loggedIn: localStorage.getItem('loggedIn')

    }
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

export const autoAuthenticate = () => {
    const data = getLocalStorage();
    return { type: actionTypes.AUTO_AUTHENTICATE, data };
}

export const signUp = (data, history) => dispatch => {
    dispatch(registerStart());
    axiosInstance.post(`/user/sign-up`, data).then(response => {
        dispatch(registerSuccess(response.data));
        setLocalStorage(response.data)
        authTimeOut(response.data.expiresIn)
        if (response.data.data.user.role === 'owner') {
            history.push('/owner/restaurants')
        } else if (response.data.data.user.role === 'user') {
            history.push('/restaurants')
        } else {
            history.push('/not-authorized')
        }
    }).catch(err => {
        dispatch(registerFail(err.response.data));
    })
}

export const login = (email, password, history) => dispatch => {
    const authData = { email, password };
    dispatch(loginStart());
    axiosInstance.post(`/user/login`, authData).then(response => {
        dispatch(loginSuccess(response.data));
        dispatch(authTimeOut(response.data.expiresIn));
        setLocalStorage(response.data)
        authTimeOut(response.data.expiresIn)
        if (response.data.data.user.role === 'owner') {
            history.push('/owner/restaurants')
        } else if (response.data.data.user.role === 'user') {
            history.push('/restaurants')
        } else {
            history.push('/not-authorized')
        }
    }).catch(err => {
        dispatch(loginFail(err.response.data));
    });
}