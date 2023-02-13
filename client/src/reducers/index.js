import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import adminAuthReducer from "./adminAuthReducer";
import userReducer from "./userReducer";

export const reducers = combineReducers({ authReducer, postReducer , adminAuthReducer ,userReducer })