import React, { useState } from "react";
import { Card, Tag, Modal, Row, Col, Rate, Statistic } from "antd";
import axios from "axios";
import { LikeOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { getMoviesDetailsSuccess, getMoviesDetailsFailure } from "../slices/MovieDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

const StyledDiv = styled.div`
text-align: center;
font-weight: 500;
font-size: x-large;
`;

const StyledRow = styled(Row)`
margin: 20px;
`;

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
`;

const { Meta } = Card;
const baseUrl = `https://www.omdbapi.com/?`;

const MovieCard = (props) => {
  const { movie } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { moviesDetails: movieDetailsReducer} = useSelector((state) => state)
  const {movieDetails: newMovieDetails} = movieDetailsReducer
  const dispatch = useDispatch();
  
  const description = (
    <>
      <Tag color="magenta">{movie?.Year}</Tag>
      <Tag color="blue">{movie?.Type}</Tag>
    </>
  );

  const fetchMovieDetailById = (id) => {
    return axios
      .get(`${baseUrl}apikey=6682157d&i=${id}`)
      .then((response) => {
        dispatch(getMoviesDetailsSuccess(response?.data))
        return response;
      })
      .catch((error) => {
        console.log(error, "error");
        dispatch(getMoviesDetailsFailure())
        return error.response;
      });
  };

  const handleClick = (id) => {
    fetchMovieDetailById(id).then(() => {
      setIsModalVisible(true);
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMovieRating = () => {
    const rate = +newMovieDetails?.imdbRating;
    return (rate / 10) * 5;
  };

  return (
    <>
      <Card
        hoverable
        style={{ width: 240, margin: "20px" }}
        cover={
          <img
            alt="example"
            src={movie?.Poster}
            onClick={() => {
              handleClick(movie?.imdbID);
            }}
          />
        }
      >
        <Meta title={movie?.Title} description={description} />
      </Card>
      <Modal
        className="movie-detail"
        title={newMovieDetails?.Title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Row>
          <Col span={8}>
            <StyledCard cover={<img alt="example" src={newMovieDetails?.Poster} />} />
          </Col>
          <Col span={16}>
            <div>
              <StyledDiv>
                Detail Information
              </StyledDiv>
              <StyledRow>
                <Col>Rating:</Col>
                <Col>
                  <Rate allowHalf disabled defaultValue={handleMovieRating()} style={{fontSize:16, justifyContent: "center"}}/>
                </Col>
              </StyledRow>
              <StyledRow>
                <Col>Director:</Col>
                <Col>
                {" "}
                  <strong>{newMovieDetails?.Director}</strong>
                </Col>
              </StyledRow>
              <StyledRow>
                <Col>Writers:</Col>
                <Col>
                {" "}
                  <strong>{newMovieDetails?.Writer}</strong>
                </Col>
              </StyledRow>
              <StyledRow>
                <Col>Cast and Crew:</Col>
                <Col>
                {" "}
                  <strong>{newMovieDetails?.Actors}</strong>
                </Col>
              </StyledRow>
              <StyledRow>
                <Col span={12}>
                  <Statistic title="Likes" value={newMovieDetails?.imdbVotes} prefix={<LikeOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="BoxOffice" value={newMovieDetails?.BoxOffice}/>
                </Col>                
              </StyledRow>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default MovieCard;
