import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IMG from "../../images/3.jpeg";
import './ImageSlider.css';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000 
  };

  return (
    <div className='aaa'>
      <Slider className='ae' {...settings}>
      <div>
        <img className='au' src={IMG} alt=""/>
      </div>
      <div>
        <img className='au' src={IMG} alt=""/>
      </div>
      <div>
        <img  className='au' src={IMG} alt=""/>
      </div>
      {/* Agrega más imágenes según sea necesario */}
    </Slider>
    </div>
  );
};

export default ImageSlider;
