import { useState } from "react";
import { useQuery } from "react-query";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import Sliders from "./Components/Sliders";

const Wrapper = styled.div`
background-color: black;
overflow-x: hidden;
overflow-y: hidden;
`;
const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Banner = styled.div < { bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
    background-size: cover;
`;
const Title = styled.h2`
    font-size: 68px;
    font-family: "GmarketSansMedium";
    font-weight: bold;
`;
const Overview = styled.p`
    font-size: 25px;
    width: 50%;
    font-family: "GmarketSansLight";
`;
const SliderWrap = styled.div``;


function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const { data: popular } = useQuery<IGetMoviesResult>(["popularMovies", "popular"], getPopularMovies);
    const { data: topLated } = useQuery<IGetMoviesResult>(["topLatedMovies", "topLated"], getTopRatedMovies);
    const { data: upComing } = useQuery<IGetMoviesResult>(["upComingMovies", "upComing"], getUpcomingMovies);
    const [clickSlider, setClickSlider] = useState(0);
    return (
        <Wrapper>{isLoading ? (
            <Loader>Loading...</Loader>
        ) : (
            <>
                <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
                <SliderWrap onClick={() => setClickSlider(1)}>
                    <Sliders data={popular} title="지금 바로 최신영화를 만나세요!" sliderNum={1} clickSlider={clickSlider} />
                </SliderWrap>
                <SliderWrap onClick={() => setClickSlider(2)}>
                    <Sliders data={data} title="극장에서 상영중!" sliderNum={2} clickSlider={clickSlider} />
                </SliderWrap>
                <SliderWrap onClick={() => setClickSlider(3)}>
                    <Sliders data={topLated} title="여러 사람들이 극찬한 영화 최고평점 영화들!" sliderNum={3} clickSlider={clickSlider} />
                </SliderWrap>
                <SliderWrap onClick={() => setClickSlider(4)}>
                    <Sliders data={upComing} title="곧 영화관에서 만나요!" sliderNum={4} clickSlider={clickSlider} />
                </SliderWrap>
            </>
        )
        }
        </Wrapper >
    );
}

export default Home;