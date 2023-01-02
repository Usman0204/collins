import { combineReducers } from "redux";
import { UserReducer } from "../Reducers/Index";

const rootReducer = combineReducers({
  UserReducer,
});

export default rootReducer;