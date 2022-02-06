import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovies, getSearchTv, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
background-color: black;
overflow-x: hidden;
overflow-y: hidden;
`;
const Title = styled.div`
 font-family: "GmarketSansMedium";
    font-weight: bold;
    margin-top: 120px;
    margin-left: 20px;
`;

const Wrap = styled.div`
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

`;
const SimCover = styled.div`
    width: 150px;
    height: 200px;
    margin: 10px 10px;
    background-size: cover;
    background-position: center center;
    position: relative;
`;
const SimTitle = styled.div`
    font-family: "GmarketSansLight";
    font-weight: bold;
    position: absolute;
    bottom: 15px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    text-align: center;
`;

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const { data: movieData, isLoading } = useQuery<IGetMoviesResult>(["simMovies", keyword], () => getSearchMovies(keyword + ""));
    const { data: tvData } = useQuery<IGetMoviesResult>(["simTV", keyword], () => getSearchTv(keyword + ""));
    console.log(tvData);
    return (
        <Wrapper>
            {

                isLoading ? "Loding..." :
                    <>
                        <Title>
                            - {keyword} 관련 영화 <br />
                        </Title>
                        <Wrap>
                            {movieData?.results.map((list) => {
                                return (
                                    <SimCover
                                        key={list.id}
                                        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)) ,url(${makeImagePath(list.backdrop_path, "w300")})` }}>
                                        <SimTitle>{list.title}</SimTitle>
                                    </SimCover>
                                );
                            })}
                        </Wrap>
                        <Title>
                            - {keyword} 관련 TV 시리즈 <br />
                        </Title>
                        <Wrap>
                            {tvData?.results.map((list) => {
                                return (
                                    <SimCover
                                        key={list.id}
                                        style={{ backgroundImage: `url(${makeImagePath(list.backdrop_path, "w300")})` }}>
                                        <SimTitle>{list.name}</SimTitle>
                                    </SimCover>
                                );
                            })}
                        </Wrap>
                    </>
            }
        </Wrapper>
    );
}

export default Search;