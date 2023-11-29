import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./NewListPage.css";
import product from "../../Assets/Images/product.jpg";
const NewListPage = () => {
  const [searchMovies, setSearchMovies] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    searchKey();
    Genre();
  }, []);
  const searchKey = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=1452e6e0980f76d9c09368379bd64adf&with_original_language=te&include_video=false&page=${pageNumber}`
    );
    console.log(data);
    setSearchMovies(data.results);
  };

  // Api call to get Geners List
  const Genre = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=1452e6e0980f76d9c09368379bd64adf&language=en-US`
    );
    setMovieGenre(data.genres);

    console.log("Genre_List", data);
  };

  return (
    <>
      <div class="container-fluid">
        <div class="row px-xl-5">
          <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
              <a class="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <a class="breadcrumb-item text-dark" href="#">
                Shop
              </a>
              <span class="breadcrumb-item active">Shop List</span>
            </nav>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row px-xl-5">
          <div class="col-lg-3 col-md-4">
            <h5 class="section-title position-relative text-uppercase mb-3">
              <span class="bg-secondary pr-3">Filter by Genres</span>
            </h5>
            <div class="bg-light p-4 mb-30">
              <form>
                {movieGenre.length > 0 &&
                  movieGenre.map((item) => {
                    return (
                      <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                        //   checked={false}
                          id={item.id}
                        />
                        <label class="custom-control-label" for={item.id}>
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
              </form>
            </div>
          </div>

          <div class="col-lg-9 col-md-8">
            <div class="row pb-3">
              <div class="col-12 pb-1">
                <div class="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    {/* <button class="btn btn-sm btn-light"><i class="fa fa-th-large"></i></button>
                                <button class="btn btn-sm btn-light ml-2"><i class="fa fa-bars"></i></button> */}
                  </div>
                  <div class="ml-2">
                    <div class="btn-group">
                      {/* <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button> */}
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#">
                          Latest
                        </a>
                        <a class="dropdown-item" href="#">
                          Popularity
                        </a>
                        <a class="dropdown-item" href="#">
                          Best Rating
                        </a>
                      </div>
                    </div>
                    <div class="btn-group ml-2">
                      {/* <button type="button" class="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button> */}
                      <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#">
                          10
                        </a>
                        <a class="dropdown-item" href="#">
                          20
                        </a>
                        <a class="dropdown-item" href="#">
                          30
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {searchMovies.length > 0 &&
                searchMovies.map((item) => {
                  return (
                    <div class=" col-lg-4 col-md-6 col-sm-6 pb-1" key={item.id}>
                      <div class="product-item bg-light mb-4">
                        <div class="product-img position-relative overflow-hidden">
                          <img
                            class="img-fluid w-100"
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt=""
                          />
                        </div>
                        <div class="text-center py-4">
                          <a
                            class="h6 text-decoration-none text-truncate"
                            href=""
                          >
                            {item.title}
                          </a>
                          <div class="d-flex align-items-center justify-content-center mt-2">
                            <h5>{item.vote_average}</h5>
                            <h6 class="text-muted ml-2">{item.vote_count}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewListPage;
