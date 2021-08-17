import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AuthForm from './authForm';
import PreventSignInRoute from '../../hoc/preventSignInRoute';
import './register_login.css'

const RegisterLogin = (props) => {
    const [formType, setFormType] = useState(false);


    const toogleFormType = () => {
        setFormType(!formType);
    }


    return(
        <PreventSignInRoute >
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        { formType ?
                            <>
                                <h1>New customers</h1>
                                <p>Please Enter Email and password. Then verify your account via the link you recieve in your email</p>
                            </>
                            :
                            <>
                                <h1>Welcome back</h1>
                                <p>Check the amount of stock available by logging in</p>
                            </>
                        }

                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            onClick={ ()=> toogleFormType() }
                        >
                            { formType ? "Already registered ?" : "Need to register" }
                        </Button>

                    </div>
                    <div className="right">
                        <h2>{formType ? 'Register':'Sign in'}</h2>
                        <AuthForm
                            formType={formType}
                            {...props}
                        />
                    </div>
                </div>
            </div>
        </div>
        </PreventSignInRoute>
    )


}

export default RegisterLogin;