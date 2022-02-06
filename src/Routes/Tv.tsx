import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getAiringTV, getLatestTV, getTopRatedTV, getTV, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import TvSliders from "./Components/TvSliders";

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

function Tv() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(["tv", "nowPlaying"], getTV);
    const { data: topRadted } = useQuery<IGetMoviesResult>(["topRadtedTv", "topRadted"], getTopRatedTV);
    const { data: airing } = useQuery<IGetMoviesResult>(["airingTv", "airing"], getAiringTV);
    const { data: latest } = useQuery<IGetMoviesResult>(["latestTv", "latest"], getLatestTV);
    const [clickSlider, setClickSlider] = useState(0);
    return (
        <Wrapper>{isLoading ? (
            <Loader>Loading...</Loader>
        ) : (
            <>
                <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].name}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>

                <SliderWrap onClick={() => setClickSlider(1)}>
                    <TvSliders data={data} title="시청률 상승기류 타는중!" sliderNum={1} clickSlider={clickSlider} />
                </SliderWrap>
                <SliderWrap onClick={() => setClickSlider(2)}>
                    <TvSliders data={topRadted} title="현재 상위 랭킹 프로그램! " sliderNum={2} clickSlider={clickSlider} />
                </SliderWrap>
                <SliderWrap onClick={() => setClickSlider(3)}>
                    <TvSliders data={airing} title="오늘 새로운 에피소드 방영 예정!" sliderNum={3} clickSlider={clickSlider} />
                </SliderWrap>
                <SliderWrap onClick={() => setClickSlider(4)}>
                    <TvSliders data={latest} title="최신 Tv 시리즈!" sliderNum={4} clickSlider={clickSlider} />
                </SliderWrap>
            </>
        )
        }
        </Wrapper >
    );
}

export default Tv;