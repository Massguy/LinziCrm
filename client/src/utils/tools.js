import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import cookie from 'react-cookies';
export const LinziJayButton = (props) => {
    let template = '';

    switch(props.type){
        case "default":
            template = <Link
                className={
                    !props.altClass ? 'link_default': props.altClass
                }
                to={props.linkTo}
                style={{
                    ...props.style
                }}
            >
                {props.title}
            </Link>
        break;
        default:
            template='';

    }

    return template;
}

export const showToast = (type, msg) => {

    switch(type){
        case 'SUCCESS':
            toast.success(msg,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        break;
        case 'ERROR':
            toast.error(msg,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        break;
        default:
            return false
    }

}

export const errorHelper = (formik,value) => ({
    error: formik.errors[value] && formik.touched[value] ? true : false,
    helperText: formik.errors[value] && formik.touched[value] ? formik.errors[value]:null
});

export const getTokenCookie = () => cookie.load('x-access-token');
export const removeTokenCookie = () => cookie.remove('x-access-token', {path:'/'});
export const getAuthHeader = () => {
    return { headers: { 'Authorization':`Bearer ${getTokenCookie()}`}}
}
