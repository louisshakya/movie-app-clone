import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    movieDetails: {},
}

const movieDetailsSlice = createSlice({
    name: "moviesDetails",
    initialState,
    reducers: {
        getMoviesDetailsSuccess: (state, {payload}) => {
            state.movieDetails = payload
            state.loading = false
        },
        getMoviesDetailsFailure: state => {
            state.loading = false
        },
    },
})

export const { getMoviesDetailsSuccess, getMoviesDetailsFailure} = movieDetailsSlice.actions

export default movieDetailsSlice.reducer;