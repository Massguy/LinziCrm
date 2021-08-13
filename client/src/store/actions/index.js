import {
  AUTH_USER,
  ERROR_GLOBAL,
  SUCCESS_GLOBAL,
  CLEAR_NOTIFICATION,
  SIGN_OUT,
  UPDATE_USER_PROFILE,
  USER_CHANGE_EMAIL,
  GET_PIPE_PAGINATE,
  REMOVE_PIPELINE,
  ADD_PIPELINE,
  GET_PIPELINE_BY_ID,
  CLEAR_CURRENT_PIPELINE,
} from "../types";

export const userAuthenticate = (user) => ({
  type: AUTH_USER,
  payload: user,
});

export const userSignOut = () => ({
  type: SIGN_OUT,
});

export const userUpdateProfile = (userdata) => ({
  type: UPDATE_USER_PROFILE,
  payload: userdata,
});

export const userChangeEmail = (data) => ({
  type: USER_CHANGE_EMAIL,
  payload: data,
});

export const errorGlobal = (msg) => ({
  type: ERROR_GLOBAL,
  payload: msg,
});

export const successGlobal = (msg) => ({
  type: SUCCESS_GLOBAL,
  payload: msg,
});

export const clearNotification = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_NOTIFICATION,
    });
  };
};

export const pipelineByPaginate = (pipeline) => ({
  type: GET_PIPE_PAGINATE,
  payload: pipeline,
});

export const productRemove = () => ({
  type: REMOVE_PIPELINE,
});

export const pipelineAdd = (pipeline) => ({
  type: ADD_PIPELINE,
  payload: pipeline,
});

export const getPipelineByID = (pipeline) => ({
  type: GET_PIPELINE_BY_ID,
  payload: pipeline,
});

export const clearCurrentPipeline = () => ({
  type: CLEAR_CURRENT_PIPELINE,
});
