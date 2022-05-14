import { combineReducers } from "@reduxjs/toolkit";
import movieReducer from "./MovieSlice";
import movieDetailsReducer from "./MovieDetailsSlice";

const rootReducer = combineReducers({
    movies: movieReducer,
    moviesDetails: movieDetailsReducer
})

export default rootReducer;
