import React from 'react'
import MovieCard from './MovieCard'
import axios from 'axios';
import { useState,useEffect } from 'react';
const MovieCardContainer = () => {
    const Key = `1452e6e0980f76d9c09368379bd64adf`;
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const fetchTrending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${Key}&page=${page}`);
    console.log("responseData",data)
    setContent(data.results);
  }
  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  },[page]);
  return (
    <>
    <div className='d-flex flex-wrap justify-content-center mt-5'>
    {content && content.map((item) => {
        return(<MovieCard backImage={item?.poster_path} title={item?.title} description = {item?.overview} type={item.media_type} mid={item?.id}/>)
    })}
    </div>
      
    </>
  )
}

export default MovieCardContainer