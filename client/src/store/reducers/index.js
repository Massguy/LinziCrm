import { combineReducers } from "redux";
import users from "./users.reducer";
import notifications from "./notifications.reducer";
import pipeline from "./pipeline.reducer";

const appReducers = combineReducers({
  users,
  notifications,
  pipeline,
});

export default appReducers;
