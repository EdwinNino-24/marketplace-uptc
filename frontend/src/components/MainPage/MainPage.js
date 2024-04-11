import React from "react";
import Logo from "../../images/2.1.png";
import './Header.css';
import './Banner.css';
import './ImageSlider.css';
import IMG2 from "../../images/img01.jpg";
import BANNER1 from "../../images/banner1.png";
import BANNER2 from "../../images/banner2.png";
import './Publications.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export const MainPage = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000 
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          // Ejecuta la acción aquí
          window.location.href = '/publications-page';
          console.log('Se presionó Enter');
        }
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
                        <a href="/products-page">PRODUCTOS</a>
                    </li>
                    <li>
                        <a href="/services-page">SERVICIOS</a>
                    </li>
                    <li>
                        <a href="/create-publication">VENDER</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="/user-profile">
                            <div className="login">
                                <box-icon name='user-pin' size="5rem" type='solid' color='#f6c700' ></box-icon>
                                <p className="rrr">Juan José</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <nav className="mainnav">
                    <ul>
                        <li>
                            <a className="categories">CATEGORÍAS</a>
                        </li>
                        <li>
                            <a href="/publications-page">Ropa</a>
                        </li>
                        <li>
                            <a href="/publications-page">Tecnología</a>
                        </li>
                        <li>
                            <a href="/publications-page">Accesorios</a>
                        </li>
                        <li>
                            <a href="/publications-page">Tutorías</a>
                        </li>
                        <li>
                            <a href="/publications-page">Comida</a>
                        </li>
                        <li>
                            <a className='melo' href="/publications-page">Otros</a>
                        </li>
                        <li>
                            <input className="ram" placeholder=" Haz una Búsqueda..." onKeyPress={handleKeyPress}></input>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="banner">
                <Slider className='slider-main-page' {...settings}>
                    <div>
                        <img className='slider-image-main-page' src={BANNER1} alt=""/>
                    </div>
                    <div>
                        <img className='slider-image-main-page' src={BANNER2} alt=""/>
                    </div>
                </Slider>
            </div>
            <div className="separator"></div>
            
            <h1 className="title">PRODUCTOS</h1>
            <div className="products">
                <a href="/view-publication">
                    <div className="product">
                        <div className="product_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="product">
                        <div className="product_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="product">
                        <div className="product_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="product">
                        <div className="product_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="product">
                        <div className="product_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="product">
                        <div className="product_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
            </div>

            <div className="separator"></div>
            
            <h1 className="title">SERVICIOS</h1>
            <div className="services">
                <a href="/view-publication">
                    <div className="service">
                        <div className="service_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="service">
                        <div className="service_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="service">
                        <div className="service_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="service">
                        <div className="service_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="service">
                        <div className="service_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
                <a href="/view-publication">
                    <div className="service">
                        <div className="service_img">
                            <img src={IMG2} alt=""/>
                        </div>
                        <div className="general-footer">
                            <h1> Zapatilla </h1>
                            <p> Ropa </p>
                            <p className="price">$3,99</p>
                        </div>
                        <div className="button-more-information">
                            <button>
                                Más Información
                            </button>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
};