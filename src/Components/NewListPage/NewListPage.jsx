import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./NewListPage.css";
import product from "../../Assets/Images/product.jpg";
import { useNavigate, useLocation, createSearchParams, useSearchParams } from "react-router-dom";
const NewListPage = () => {
  const [searchMovies, setSearchMovies] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const[checkedGenreList,setCheckedGenreList] = useState([]);
  const [isFilter,setIsFilter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    var searchParams = new URLSearchParams(location.search);
    var queryParams = {};
    for (const param of searchParams.keys()) {
      const value = searchParams.get(param);
      queryParams[param] = value;
    }
    if (queryParams) {
      if (queryParams.selectedGenres) {
       
        var checkedList =JSON.parse(queryParams.selectedGenres);
        console.log("checkedList",typeof checkedList);
        checkedList.map((val) => {
          if(!checkedGenreList.includes(val)){
            checkedGenreList.push(val);
            console.log(checkedList);
            console.log(checkedGenreList);
          }
            
        });
        // for(let i = 0; i < checkedList.length; i++){
        //   let val = checkedList[i];
        //   checkedGenreList.push(val);
        // }
      }
    }
    searchKey();
    Genre();
    
  }, []);
  const searchKey = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=1452e6e0980f76d9c09368379bd64adf&with_original_language=te&include_video=false&page=${pageNumber}&&with_genres=${
        checkedGenreList ? checkedGenreList: ""}`
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
 
  const isChecked = (text) => {
    if(!checkedGenreList.includes(text)){
        checkedGenreList.push(text);
        console.log(text);
    }
    else if(checkedGenreList.includes(text)){
        let index = checkedGenreList.indexOf(text);
        checkedGenreList.splice(index,1)
        console.log(index);
    }
  
    // setIsFilter(!isFilter);
    // alert(isFilter);
    console.log(checkedGenreList);
  }
  useEffect(() => {
    searchKey();
  },[isFilter])
  const GenresChecked = (id) => {
    let isChecked = false;
    if(checkedGenreList && checkedGenreList.length > 0){
      if(checkedGenreList.includes(id.toString())){
      
        isChecked = true; 
      }
    }

    return isChecked;
  }
  console.log(GenresChecked(28));
  
  const checkGenresFilter = (e) => {
    const {value,checked} = e.target;
    console.log(e.target)
    if(checked){
      if(checkedGenreList.length > 0 ){
        if(!checkedGenreList.includes(value)){
          checkedGenreList.push(value);
          console.log("checkedValue",value);
      }
      }else{
        checkedGenreList.push(value);
      }
    }else if(checkedGenreList.includes(value)){
      let index = checkedGenreList.indexOf(value);
      checkedGenreList.splice(index,1)
      console.log(index);
  }
    GenerateFilterQuery();

  }
  const GenerateFilterQuery = () => {
    let GenreListQuery = checkedGenreList.length > 0 ? checkedGenreList : ''
    const list = {};
    if(GenreListQuery){
      list['selectedGenres'] = JSON.stringify(GenreListQuery)
    }
    // if(LanguageQuery){
    //   list['selectedLnaguage'] = JSON.stringify(LanguageQuery)
    // }
    const options = {pathname:location.pathname,search:`?${createSearchParams(list)}`}
    // const options = {pathname:location.pathname,search:`?${list[selectedGenres]}&${list[selectedLnaguage]}`}
    console.log(location.pathname);
    
    navigate(options,{replace : true})
    setIsFilter(!isFilter);
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <a className="breadcrumb-item text-dark" href="#">
                Shop
              </a>
              <span className="breadcrumb-item active">Shop List</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by Genres</span>
            </h5>
            <div className="bg-light p-4 mb-30">
              <form>
                {movieGenre.length > 0 &&
                  movieGenre.map((item) => {
                    return (
                      <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3" key={item.id}>
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          checked = {GenresChecked(item.id)}
                         
                          id={item.id}
                          onChange = {(e) => {checkGenresFilter(e);}}
                          value={item.id}
                        />
                        <label className="custom-control-label" for={item.id}>
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
              </form>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    {/* <button className="btn btn-sm btn-light"><i className="fa fa-th-large"></i></button>
                                <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars"></i></button> */}
                  </div>
                  <div className="ml-2">
                    <div className="btn-group">
                      {/* <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button> */}
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">
                          Latest
                        </a>
                        <a className="dropdown-item" href="#">
                          Popularity
                        </a>
                        <a className="dropdown-item" href="#">
                          Best Rating
                        </a>
                      </div>
                    </div>
                    <div className="btn-group ml-2">
                      {/* <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button> */}
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#">
                          10
                        </a>
                        <a className="dropdown-item" href="#">
                          20
                        </a>
                        <a className="dropdown-item" href="#">
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
                    <div className=" col-lg-4 col-md-6 col-sm-6 pb-1" key={item.id}>
                      <div className="product-item bg-light mb-4">
                        <div className="product-img position-relative overflow-hidden">
                          <img
                            className="img-fluid w-100"
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt=""
                          />
                        </div>
                        <div className="text-center py-4">
                          <a
                            className="h6 text-decoration-none text-truncate"
                            href=""
                          >
                            {item.title}
                          </a>
                          <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>{item.vote_average}</h5>
                            <h6 className="text-muted ml-2">{item.vote_count}</h6>
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
