import React from 'react'
import "../Home/MovieCard.css"
import { Link } from 'react-router-dom'
const MovieCard = ({backImage,title,description,type,mid}) => {
  return (
    <>
    <div class="card_row">
  <div class="example-2 card m-1">
    <div class="wrapper" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500${backImage})`}}>
      <div class="header">
        <div class="date">
          <span class="day">12</span>
          <span class="month">Aug</span>
          <span class="year">2016</span>
        </div>
        <ul class="menu-content">
          <li>
            <a href="#" class="fa fa-bookmark-o"></a>
          </li>
          <li><a href="#" class="fa fa-heart-o"><span>18</span></a></li>
          <li><a href="#" class="fa fa-comment-o"><span>3</span></a></li>
        </ul>
      </div>
      <div class="data">
        <div class="content">
          <span class="author">{type}</span>
          <h1 class="title text-success"><a href="#">{title}</a></h1>
          <p class="text">{description}</p>
          <button className='btn btn-danger p-0'><Link to={`/movie-details/${mid}`} class="button">Read more</Link></button>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default MovieCard