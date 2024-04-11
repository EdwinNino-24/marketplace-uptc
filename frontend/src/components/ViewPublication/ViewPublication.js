import React from "react";
import Logo from "../../images/2.1.png";
import './Header.css';
import './ViewPublication.css';
import './ImageSlider.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BANNER1 from "../../images/banner1.png";
import BANNER2 from "../../images/banner2.png";

import IMG1 from "../../images/1.png";


export const ViewPublication = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000 
      };

    return (
        <div className="ramirez">
            <header className="sis">
                <a href="/main-page">
                    <div className="logo">
                        <img src={Logo} alt="logo" width="150"/>
                    </div>
                </a>
                <ul>
                    <li>
                        <a href="/main-page">INICIO</a>
                    </li>
                    <li>
                        <a href="#">PRODUCTOS</a>
                    </li>
                    <li>
                        <a href="#">SERVICIOS</a>
                    </li>
                    <li>
                        <a href="#">VENDER</a>
                    </li>
                </ul>
                <div className="login">
                    <box-icon name='user-pin' size="5rem" type='solid' color='#f6c700' ></box-icon>
                </div>
                <nav className="mainnav">
                    <ul>
                        <li>
                            <a className="cat" href="#">CATEGORÍAS</a>
                        </li>
                        <li>
                            <a href="#">Ropa</a>
                        </li>
                        <li>
                            <a href="#">Tecnología</a>
                        </li>
                        <li>
                            <a href="#">Accesorios</a>
                        </li>
                        <li>
                            <a href="#">Tutorías</a>
                        </li>
                        <li>
                            <a href="#">Comida</a>
                        </li>
                        <li>
                            <a href="#">Otros</a>
                        </li>
                        <li>
                            <input className="ram" placeholder=" Haz una Búsqueda..."></input>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <div className="publications">
                <div className="publication">
                    <div className="gallery-publication">
                        <Slider className='slider-publication' {...settings}>
                            <div>
                                <img className='slider-image-publication' src={IMG1} alt=""/>
                            </div>
                            <div>
                                <img className='slider-image-publication' src={BANNER2} alt=""/>
                            </div>
                        </Slider>
                    </div>
                    <div className="info-publication">
                        <div className="publication-footer">
                            <h1> PLAY 2 CHIPEADA </h1>
                            <p> Disponible </p>
                            <p> Producto </p>
                            <p> Tecnología </p>
                            <h1> Descripción </h1>
                            <p> Una play 2 chipeada barata </p>
                            <p> $ 10k </p>
                            <p> Vendida en la sede central </p>
                            <p> Por Ramírez </p>
                            <div className="button-contact">
                                <div>
                                    <a href="/login" className="btn">
                                        Contactar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};