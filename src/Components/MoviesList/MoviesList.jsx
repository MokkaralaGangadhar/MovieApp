import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import MovieCard from "../Home/MovieCard";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";

const MoviesList = () => {
 
  const [searchList, setSearchList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [genreList, setGenreList] = useState([]);
  const [checkGenres, setCheckGenres] = useState([]);
  const [movieCount,setMovieCount] = useState(0);
  const [totalMovies,setTotalMovies] = useState(0);
  const [filter, setFilter] = useState(1);
  const [isBottom, setIsBottom] = useState(false);
  const [totalPage,setTotalPage] = useState(0)
  const [searchTerm,setSearchTerm] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const key = useParams();

  useEffect(() => {
    var searchParams = new URLSearchParams(location.search);
    var queryParams = {};
    for (const param of searchParams.keys()) {
      const value = searchParams.get(param);
      queryParams[param] = decodeURIComponent(value);
    }
    if (queryParams) {
      if (queryParams.selected_genres) {
        var checkedList = JSON.parse(queryParams.selected_genres);
        checkedList.map((val) => {
          if (!checkGenres.includes(val)) {
            checkGenres.push(val);
            console.log(checkedList);
          }
        });
      }
    }
    setSearchTerm(key.searchKey)
    searchKey(key.searchKey);
    Genre();
    console.log("searchParams", searchParams);
    // FilteredMovies();
  }, []);
  useEffect(() => {
    var searchParams = new URLSearchParams(location.search);
    var queryParams = {};
    for (const param of searchParams.keys()) {
      const value = searchParams.get(param);
      queryParams[param] = decodeURIComponent(value);
    }
    if (queryParams) {
      if (queryParams.selected_genres) {
        var checkedList = JSON.parse(queryParams.selected_genres);
        checkedList.map((val) => {
          if (!checkGenres.includes(val)) {
            checkGenres.push(val);
            console.log(checkedList);
          }
        });
      }
    }
    setSearchTerm(key.searchKey)
    searchKey(key.searchKey);
    // FilteredMovies();
  }, [filter]);
 
  const searchKey = async (key) => {
    const { data } = await axios.get(
      checkGenres.length > 0
        ? `https://api.themoviedb.org/3/discover/movie?api_key=1452e6e0980f76d9c09368379bd64adf&with_original_language=te&include_video=false&page=${pageNumber}&&with_genres=${
            checkGenres ? checkGenres : ""
          }`
        : `https://api.themoviedb.org/3/search/movie?api_key=1452e6e0980f76d9c09368379bd64adf&query=${key}&page=${pageNumber}`
    );
    console.log("Search_List", data);
    setSearchList(data.results);
    setMovieCount(data.results.length)
    setTotalMovies(data?.total_results)
    setTotalPage(data.total_pages)
  };
  const Genre = async (key) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=1452e6e0980f76d9c09368379bd64adf&language=en-US`
    );
    console.log("Genre_List", data);
    setGenreList(data.genres);
   
  };
  
  const GenresChecked = (text) => {
    var isChecked = false;
    if (checkGenres && checkGenres.length > 0) {
      if (checkGenres.includes(text.toString())) {
        isChecked = true;
      }
    }
    return isChecked;
  };

  const getGenresFilter = async (e) => {
    console.log("GenreStatus", e.target);
    const { value, checked } = e.target;
    console.log(value, checked);
    if (checked) {
      if (checkGenres.length > 0) {
        checkGenres.pop();
        checkGenres.push(value.toString());
      } else {
        checkGenres.push(value.toString());
      }
    }
    console.log("updatedGenres", checkGenres);
    genreStatusFilter();
  };
  const genreStatusFilter = () => {
    var genresQuery = checkGenres.length > 0 ? checkGenres : "";
    const list = {};
    if (genresQuery) {
      list["selected_genres"] = JSON.stringify(genresQuery);
    }
    const options = {
      pathname: location.pathname,
      search: `?${createSearchParams(list)}`,
    };
    navigate(options, { replace: true });
    console.log(list);
    setFilter(filter + 1);
  };
 //function call for pagination  when scroll to bottom of page
 useEffect(() => {
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    // Check if the user has scrolled to the bottom
    if (scrollTop + windowHeight >= scrollHeight - 10) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
  // eslint-disable-next-line
}, []);
useEffect(() => {
  if (isBottom) {
    
    setPageNumber(pageNumber + 1)
  }
  return;
  // eslint-disable-next-line
}, [isBottom]);
useEffect(() => {
  if (pageNumber <= totalPage) {
    searchKey();
  }
},[pageNumber])
  return (
    <div className="d-flex justify-content-between">
      <nav id="sidebarMenu " style={{ width: "20em" }}>
        <div>
          <a className="navbar-brand" href="#">
            <i class="bi bi-justify"></i>
            <span>MovieGenre</span>
          </a>
          <div>
            <p className="text-center">Total <span>{movieCount}</span> of <span>{totalMovies}</span></p>
          </div>
          <div className="list-group list-group-flush mx-3 mt-4">
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
            >
              {genreList.map((item) => {
                return (
                  <p key={item.id}>
                    <input
                      checked={GenresChecked(item.id)}
                      onChange={(e) => {
                        getGenresFilter(e);
                      }}
                      id={item.id}
                      type="checkbox"
                      value={item.id}
                    />
                    <label htmlFor={item.id}>{item.name}</label>
                  </p>
                );
              })}
            </a>
          </div>
        </div>
      </nav>

      <div className="d-flex flex-column">
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light fixed-top"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="bi bi-justify"></i>
            </button>
          </div>
        </nav>
        <div className="d-flex flex-wrap mt-5" style={{ width: "90em" }}>
          {searchList &&
            searchList.map((item) => {
              return (
                <MovieCard
                  backImage={item?.poster_path}
                  title={item?.title}
                  description={item?.overview}
                  type={item.media_type}
                  mid={item?.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;

