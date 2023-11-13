import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import MovieCard from '../Home/MovieCard'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom'


const MoviesList = () => {
  const [page, setPage] = useState({ data: [1, 2, 3, 4, 5], activePage: 1, limit: 5 });
  const [searchList, setSearchList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [genreList, setGenreList] = useState([]);
  const [checkGenres, setCheckGenres] = useState([]);
  const navigate = useNavigate()
  const location = useLocation()
  const key = useParams()
  useEffect(() => {
    searchKey(key.searchKey)

  }, [])
  useEffect(() => {
    searchKey(key.searchKey)
    Genre();

  }, [page])
  const searchKey = async (key) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1452e6e0980f76d9c09368379bd64adf&query=${key}&page=${pageNumber}`)
    console.log("Search_List", data);
    setSearchList(data.results);

  }
  const Genre = async (key) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1452e6e0980f76d9c09368379bd64adf&language=en-US`)
    console.log("Genre_List", data);
    setGenreList(data.genres)
  }



  const onChange = (PageNumber) => {
    console.log("page", PageNumber)
    setPage((num) => ({
      ...num, activePage: PageNumber
    }))
    setPageNumber(PageNumber)
  }
  const GenresChecked = (text) => {
    var isChecked = false;
    if (checkGenres && checkGenres.length > 0) {
      if (checkGenres.includes(text.toString())) {
        isChecked = true;
      }
    }
    return isChecked
  }

  const getGenresFilter = async (e) => {
    console.log("GenreStatus", e.target)
    const { value, checked } = e.target
    console.log(value,checked)
    if (checked) {
      if (checkGenres.length > 0) {
        checkGenres.pop()
        checkGenres.push(value.toString())
      } else {
        checkGenres.push(value.toString())
      }
    }
    console.log("updatedGenres", checkGenres)
    genreStatusFilter();
  }
  const genreStatusFilter = () => { 
    var genresQuery = checkGenres.length > 0 ? checkGenres : ""
    const list = {}
    if (genresQuery) {
      list["selected_genres"] = JSON.stringify(genresQuery)
    }
    const options = {
      pathname: location.pathname,
      search: `?${createSearchParams(list)}`
    }
    navigate(options, { replace: true })
    console.log(list)
  }



  return (
    <div className='d-flex justify-content-around'>

      <nav
        id="sidebarMenu "
        className=" flex-30 "
      >




        <div >
          <div className="list-group list-group-flush mx-3 mt-4">
            <a
              href="#"
              className="list-group-item list-group-item-action py-2 ripple"
              aria-current="true"
            >

              {
                genreList.map((item) => {
                  return (
                    <p key={item.id}><input checked={GenresChecked(item.id)} onChange={(e) => { getGenresFilter(e) }} id={item.id} type="checkbox" value={item.id} /><label htmlFor={item.id}>{item.name}</label></p>
                  )
                })
              }

            </a>

          </div>
        </div>
      </nav>



      <div className='d-flex flex-column'>
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top flex-70"
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


            <a className="navbar-brand" href="#">
              <i class="bi bi-justify"></i>
              <span>MovieGenre</span>
            </a>
          </div>
        </nav>




        {/* <div>
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header >Movie Genres</Accordion.Header>
        <Accordion.Body>
          {
            genreList.map((item) => {
              return(
                <p key={item.id}><input type = "checkbox" value={item.id}  />{item.name}</p>
              )
            })
          }

          
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      </div> */}
        <div className='d-flex flex-wrap justify-content-between mt-5'>
          {searchList && searchList.map((item) => {
            return (<MovieCard backImage={item?.poster_path} title={item?.title} description={item?.overview} type={item.media_type} mid={item?.id} />)
          })}
        </div>
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />

            {page.data.map((item, index) => {
              return (
                <Pagination.Item key={index} active={item === page.activePage} onClick={() => { onChange(item) }} >{item}</Pagination.Item>
              )
            })}
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default MoviesList