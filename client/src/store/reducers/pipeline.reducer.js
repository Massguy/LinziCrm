import {
  GET_PIPE_PAGINATE,
  ADD_PIPELINE,
  GET_PIPELINE_BY_ID,
  CLEAR_CURRENT_PIPELINE,
} from "../types";

export default function pipelineReducer(state = {}, action) {
  switch (action.type) {
    case GET_PIPE_PAGINATE:
      return { ...state, byPaginate: action.payload };
    case ADD_PIPELINE:
      return { ...state, lastAdded: action.payload };
    case GET_PIPELINE_BY_ID:
      return { ...state, byId: action.payload };
    case CLEAR_CURRENT_PIPELINE:
      return { ...state, byId: "" };
    default:
      return state;
  }
}
