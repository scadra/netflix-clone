import { combineReducers } from "redux";
import { movieReducer } from "./movies"

const rootRecucer = combineReducers({
    movies: movieReducer
});

export default rootRecucer;