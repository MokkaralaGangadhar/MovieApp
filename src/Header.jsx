import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const Header = () => {
  const [search,setSearch] = useState("");
  const [showTrend,setShowTrend] = useState("d-none");
  const searchMovie = () => {
    window.location.href=`/movie-list/${search}`
    setShowTrend("d-none")

  }
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
     <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Movies</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/movie-list/a">MovieList</Nav.Link>
            <Nav.Link href="/movie-details/507089">MovieDetail</Nav.Link>
          </Nav>
          <InputGroup >

              <Form.Control
                placeholder="Search"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)

                }}
                onFocus={() => {
                  setShowTrend("")
                }}
                onBlur={() => {
                  setShowTrend("d-none");
                }}
              />
              <InputGroup.Text id="basic-addon1" onClick={searchMovie}><i class="bi bi-search"></i></InputGroup.Text>
            </InputGroup>
        </Container>
      </Navbar>
      <div className={`header_top_trending_movies ${showTrend}`}>
        <h2 className='text-center m-1'>Top Trending Movies</h2>
        <div className='d-flex justify-content-center flex-column align-items-center'>
          {content.length > 0 && content.map((item) => {
            return(
              <article className='d-flex flex-column'>
                <img className='header_search_trending_img' src={`https://image.tmdb.org/t/p/w300${item?.poster_path}`} alt="path Image"/>
                <p className='header_search_trending_title text-center'>{item?.original_title}</p>
              </article>
            )
          })}
        
        </div>
      
      </div>
    </>
  )
}

export default Header

