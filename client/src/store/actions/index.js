import {
    AUTH_USER,ERROR_GLOBAL,SUCCESS_GLOBAL,CLEAR_NOTIFICATION,SIGN_OUT,UPDATE_USER_PROFILE
,USER_CHANGE_EMAIL} from '../types'




export const userAuthenticate = (user) => ({
    type:AUTH_USER,
    payload: user
})

export const userSignOut = () => ({
    type:SIGN_OUT
})

export const userUpdateProfile = (userdata) => ({
    type:UPDATE_USER_PROFILE,
    payload:userdata
})

export const userChangeEmail = (data) => ({
    type:USER_CHANGE_EMAIL,
    payload:data
})


export const errorGlobal = (msg) => ({
    type:ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type:SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type:CLEAR_NOTIFICATION
        })
    }
} 