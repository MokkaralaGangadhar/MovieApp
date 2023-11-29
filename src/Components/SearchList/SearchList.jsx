import React, { useEffect, useState } from 'react'
import axios from 'axios';

const SearchList = () => {
    const [searchMovies,setSearchMovies] = useState("");
    const [movieGenre,setMovieGenre] = useState("");
    const [pageNumber,setPageNumber] = useState(1);

    useEffect( () => {
        searchKey();

    },[])
    const searchKey = async () => {
        const { data } = await axios.get(

         `https://api.themoviedb.org/3/discover/movie?api_key=1452e6e0980f76d9c09368379bd64adf&with_original_language=te&include_video=false&page=${pageNumber}`);
         console.log(data);
      }; 
      
    
      // Api call to get Geners List
      const Genre = async (key) => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=1452e6e0980f76d9c09368379bd64adf&language=en-US`
        );
        // console.log("Genre_List", data);
       
      };
  return (
    <div>SearchList</div>
  )
}

export default SearchList