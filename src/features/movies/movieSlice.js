import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);
export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);
export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);
const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, { payload }) => {
      state.movies = payload;
    },
    removeSelected: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("successs");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("successs");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("successs");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("success details");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});
export const { addMovies, removeSelected } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieorShows = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
