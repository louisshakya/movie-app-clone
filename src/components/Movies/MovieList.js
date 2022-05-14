import React, { useEffect, useState } from "react";
import { Pagination, Row, Spin, Input } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import {getMovies, getMoviesSuccess, getMoviesFailure} from "../slices/MovieSlice"

// const baseUrl = `https://www.omdbapi.com/?s={fast}&apikey=6682157d`;
const baseUrl = `https://www.omdbapi.com/?`;

const { Search } = Input;

const MoviesList = () => {
  // const [movies, setMovies] = useState([]);
  // const [totalPage, setTotalPage] = useState();
  // const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("fast");
  const [currentPage, setCurrentPage] = useState(1);

  const {movies: movieReducer} = useSelector((state) => state);
  const {loading: newLoading, movies: moviesResponse} = movieReducer;
  const {Search: newMovies, totalResults: newTotalPage} = moviesResponse;
  const dispatch = useDispatch();

  const fetchMovieList = (page, searchValue) => {
    // setLoading(true);
    dispatch(getMovies());
    axios
      .get(`${baseUrl}s=${searchValue}&apikey=6682157d&page=${page}`)
      .then((response) => {
        // setMovies(response?.data?.Search || []);
        // setTotalPage(response?.data?.totalResults);
        dispatch(getMoviesSuccess(response?.data));
      })
      .catch((error) => {
        console.log(error, "error");
        getMoviesFailure()
      })
      // .then(() => {
      //   setLoading(false);
      // });
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const onSearch = (value) => {
    console.log("value", value);
    setSearchText(value);
  };

  useEffect(() => {
    fetchMovieList(currentPage, searchText);
  }, [currentPage, searchText]);

  return (
    <>
      <Spin spinning={newLoading} delay={200}> 
      <Row>
        <Pagination
          defaultCurrent={currentPage}
          total={newTotalPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          defaultValue={searchText}
          enterButton
          style={{width: "400px", marginLeft: "200px"}}
        />
        </Row>
        <Row>
          {newMovies &&
            newMovies?.length &&
            newMovies.map((movie) => (
              <div key={movie?.imdbID}>
                <MovieCard movie={movie}/>
              </div>
            ))}
        </Row>
      </Spin>
    </>
  );
};

export default MoviesList;
