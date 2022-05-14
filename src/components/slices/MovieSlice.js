import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    movies: {},
    loading: false,
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        getMovies: state => {
            state.loading = true
        },
        getMoviesSuccess: (state, {payload}) => {
            state.movies = payload
            state.loading = false
        },
        getMoviesFailure: state => {
            state.loading = false
        },
    },
})

export const { getMovies, getMoviesSuccess, getMoviesFailure} = moviesSlice.actions

export default moviesSlice.reducer;