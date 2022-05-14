import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    movieDetails: {},
    loading: false,
}

const movieDetailsSlice = createSlice({
    name: "moviesDetails",
    initialState,
    reducers: {
        getMoviesDetails: state => {
            state.loading = true
        },
        getMoviesDetailsSuccess: (state, {payload}) => {
            state.movieDetails = payload
            state.loading = false
        },
        getMoviesDetailsFailure: state => {
            state.loading = false
        },
    },
})

export const { getMoviesDetails, getMoviesDetailsSuccess, getMoviesDetailsFailure} = movieDetailsSlice.actions

export default movieDetailsSlice.reducer;