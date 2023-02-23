import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import adminAuthReducer from "./adminAuthReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  authReducer,
  postReducer,
  adminAuthReducer,
  userReducer
})

export const reducers = (state, action) => {
  if (action.type === "LOG_OUT") {
    localStorage.clear();
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

