import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "../MovieDetail/MovieDetail.css"
import image1 from "../../Assets/Images/image-product-1-thumbnail.jpg";
import image2 from "../../Assets/Images/image-product-2-thumbnail.jpg";
import image3 from "../../Assets/Images/image-product-3-thumbnail.jpg";
import image4 from "../../Assets/Images/image-product-4-thumbnail.jpg";
import product1 from "../../Assets/Images/image-product-1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper";
import { useRef } from "react";
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



const MovieDetail = () => {
  const [cast, setCast] = useState([])
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [title, setTitle] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const swiperRef = useRef(null);

  const param = useParams();
  console.log("slug", param)
  useEffect(() => {
    if (param.mid) {
      getMovieName(param.mid)
      getMovieDetail(param.mid)
      getTrailer(param.id)
    }
  }, [])



  const getMovieDetail = async (mid) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${mid}/credits?api_key=1452e6e0980f76d9c09368379bd64adf`)
    console.log("Mivie_Info", data?.cast);
    setCast(data.cast)
  }
  const getMovieName = async (mid) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${mid}?api_key=1452e6e0980f76d9c09368379bd64adf`)
    console.log("Mivie_Title", data);
    setTitle(data)


  }
  const getTrailer = async (mid) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/1173558/videos?api_key=1452e6e0980f76d9c09368379bd64adf`)
    console.log("Mivie_Trailer", data);
    setTrailer(data.results[0])
  }


  const handleSlideChange = () => {
    // Pause the video on the previous slide
    const iframes = document.querySelectorAll('.swiper-slide iframe');
    const videos = document.querySelectorAll('.swiper-slide video');

    //   iframes.forEach((iframe) => {
    //     if (iframe.contentWindow) {
    //       // var iframe = document.getElementsByClassName("video_iframe")[0].contentWindow;
    //       iframe.contentWindow.postMessage(
    //         '{"event":"command","func":"' + "pauseVideo" + '","args":""}',
    //         "*"
    //       );
    //     }
    //   });
    //   videos.forEach((video) => {
    //     video.pause();
    //   })
  };
  return (
    <>
      <main class="item m-5 p-5">
        <section class="img">
          <Swiper
            style={{
              "--swiper-navigation-color": "#083574",
              "--swiper-pagination-color": "#083574",
              width: "600px"
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            autoplay={false}
            className="mySwiper2 pdpCarouselArrow"
            ref={swiperRef}
            onSlideChange={() => handleSlideChange()}
          >
            {cast.length > 0 && cast.map((item) => {
              return (
                <SwiperSlide
                  className="swiper-slide-custom-main-class"
                  key={item.id}
                >
                  <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="" class="img-main" />
                </SwiperSlide>
              )
            })}
          </Swiper>
          {/* <img src={product1} alt="" class="img-main" /> */}
          <div class="img-btns">
            <Swiper
              style={{
                width: "600px"
              }}
              navigation={true}
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              autoplay={false}
              className="mySwiper2-thumb my-3 product-video-sliders"
            >
              {cast.length > 0 && cast.map((item) => {
                return (
                  <SwiperSlide
                    className="swiper-slide-custom-class"
                    key={item?.id}
                  >
                    <OverlayTrigger placement="top" overlay={
                      <Tooltip id={item.id}>
                        <strong>{item.name}</strong>.
                      </Tooltip>
                    } ><button class="img-btn">


                        <img
                          src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}
                          alt="shoe product image"
                          class="img-btn__img" />



                      </button></OverlayTrigger >

                  </SwiperSlide>
                )
              })}
            </Swiper>
            {/* <button class="img-btn">
            <img
              src={image1}
              alt="shoe product image"
              class="img-btn__img"
            />
          </button>
          <button class="img-btn">
            <img
              src={image2}
              alt="shoe product image"
              class="img-btn__img"
            />
          </button>
          <button class="img-btn">
            <img
              src={image3}
              alt="shoe product image"
              class="img-btn__img"
            />
          </button>
          <button class="img-btn">
            <img
              src={image4}
              alt="shoe product image"
              class="img-btn__img"
            />
          </button> */}
          </div>
        </section>

        <section class="price">
          <h2 class="price-sub__heading">{title.tagline}</h2>
          <h1 class="price-main__heading">{title.original_title}</h1>
          <p class="price-txt">
            {title.overview}
          </p>
          <div class="price-box">
            <div class="price-box__main">
              <span class="price-box__main-new">{title.vote_average}</span>
              <span class="price-box__main-discount">{title.vote_count}
              </span>
            </div>
            <Link to={`https://www.youtube.com/watch?v=${trailer.key}`}><button className='btn btn-danger'> <i class="bi bi-youtube"></i> Watch Trailer </button></Link>
          </div>


        </section>
      </main>
    </>
  )
}

export default MovieDetail