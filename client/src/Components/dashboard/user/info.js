import React from 'react';
import DashboardLayout from '../../../hoc/dashboardLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from '../../../utils/tools';

import { useDispatch } from 'react-redux';
import { TextField,Button } from '@material-ui/core';
import { userUpdateProfile } from '../../../store/actions/user_actions';
import EmailStepper from './emailInfo';


const UserInfo = ({users}) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            firstName: users.data.firstName,
            lastName: users.data.lastName,
        },
        validationSchema:Yup.object({
            firstName: Yup.string()
            .min(3,'3 char min')
            .max(30,'30 char max')
            .required('Sorry, you need the firstname'),
            lastName:Yup.string()
            .min(3,'3 char min')
            .max(30,'30 char max')
            .required('Sorry, you need the lastname'),
        }),
        onSubmit:(values)=>{
            dispatch(userUpdateProfile(values))
        }
    });



    return(
        <DashboardLayout title="User information">
            <form className="mt-3 article_form" style={{maxWidth:'250px'}}
                onSubmit={formik.handleSubmit}
            > 
                <div className="form-group">
                    <TextField
                        style={{ width:'100%',marginBottom:'10px'}}
                        name="firstName"
                        label="Enter your firstname"
                        variant="outlined"
                        {...formik.getFieldProps('firstName')}
                        {...errorHelper(formik,'firstName')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{ width:'100%',marginBottom:'10px'}}
                        name="lastName"
                        label="Enter your lastname"
                        variant="outlined"
                        {...formik.getFieldProps('lastName')}
                        {...errorHelper(formik,'lastName')}
                    />
                </div>
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{marginBottom:'10px'}}
                >
                    Edit profile
                </Button>
            </form>
            <div>
                <EmailStepper users={users}/>
            </div>
        </DashboardLayout>
    )

}

export default UserInfo;