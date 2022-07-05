import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/movieApiKey";
import { useDispatch } from "react-redux";
import {
  addMovies,
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
const Home = () => {
  const dispatch = useDispatch();
  const movieText = "Harry";

  useEffect(() => {
    const fetchMovie = async () => {
      // const response = await movieApi
      //   .get(`?apikey=${APIKey}&s=${movieText}&type=movie`)
      //   .catch((error) => {
      //     console.log("eee");
      //   });
      // dispatch(addMovies(response.data));
    };
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
    fetchMovie();
  }, [dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
