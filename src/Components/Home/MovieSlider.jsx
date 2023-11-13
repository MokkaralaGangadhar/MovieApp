import React,{useEffect,useState} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation,Pagination} from "swiper";
import banner1 from "../../Assets/Images/banner_1.jpg"
import banner2 from "../../Assets/Images/banner_2.jpg"
import axios from 'axios';
const MovieSlider = () => {
  const Key = `1452e6e0980f76d9c09368379bd64adf`;
  const [page, setPage] = useState(2);
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
  // https://image.tmdb.org/t/p/w500
  return (
    <Swiper
    navigation={true}
    modules={[Pagination, Navigation,Autoplay]}
    spaceBetween={0}
    slidesPerView={1}
    loop={true}
    autoplay={{
      delay: 4500,
      disableOnInteraction: true,
    }}
    speed={1200}
    pagination={{ clickable: true }}
    data-center-text="true"
    style={{
      "--swiper-navigation-color": "#333",
      "--swiper-pagination-color": "#fff",
    }}
    className="mySwiper">
      {content.length > 0 && content.map((item) => {
        return(
          <SwiperSlide key={item.id}>
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`} alt="banner" width="100%" className='img-fliud imgCls' />
            </div>
        </SwiperSlide>
        )
      })}
        
    </Swiper>
  )
}

export default MovieSlider