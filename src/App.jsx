import logo from './logo.svg';
import './App.css';
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header';
import Home from './Components/Home/Home';
import MovieDetail from './Components/MovieDetail/MovieDetail';
import MoviesList from './Components/MoviesList/MoviesList';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path="/movie-list/:searchKey" element={<MoviesList/>} />
      <Route exact path="/movie-details/:mid" element={<MovieDetail/>} />
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
