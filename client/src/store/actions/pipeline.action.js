import * as actions from "./index";
import axios from "axios";

import { getAuthHeader } from "../../utils/tools";
axios.defaults.headers.post["Content-Type"] = "application/json";
export const pipelineByPaginate = (args) => {
  return async (dispatch) => {
    try {
      const pipeline = await axios.post(
        `https://ljbridal.co.uk/apiapi/pipeline/paginate/all`,
        args
      );
      dispatch(actions.pipelineByPaginate(pipeline.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const productRemove = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://ljbridal.co.uk/apiapi/pipeline/pipelines/${id}`,
        getAuthHeader()
      );
      dispatch(actions.productRemove());
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const pipelineAdd = (data) => {
  return async (dispatch) => {
    try {
      const pipeline = await axios.post(
        `https://ljbridal.co.uk/apiapi/pipeline/`,
        data,
        getAuthHeader()
      );
      dispatch(actions.pipelineAdd(pipeline.data));
      dispatch(actions.successGlobal());
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const getPipelineById = (id) => {
  return async (dispatch) => {
    try {
      const pipeline = await axios.get(
        `https://ljbridal.co.uk/apiapi/pipeline/pipelines/${id}`
      );
      dispatch(actions.getPipelineByID(pipeline.data));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};

export const pipelineEdit = (values, id) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `https://ljbridal.co.uk/apiapi/pipeline/pipelines/${id}`,
        values,
        getAuthHeader()
      );

      dispatch(actions.successGlobal("Update done !!"));
    } catch (error) {
      dispatch(actions.errorGlobal(error.response.data.message));
    }
  };
};
