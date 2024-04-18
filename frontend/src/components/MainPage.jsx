import React, { useState, useEffect } from "react";
import '../styles/Header.css';
import '../styles/Banner.css';
import '../styles/ImageSlider.css';
import IMG2 from "../images/img01.jpg";
import BANNER1 from "../images/3.jpeg";
import BANNER2 from "../images/4.jpeg";
import BANNER3 from "../images/banner3.jpeg";
import '../styles/Publications.css';
import Axios from 'axios';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FaMagnifyingGlass } from "react-icons/fa6";


export const MainPage = () => {

    const [user, setUser] = useState(null);

    const send_token_user = () => {
        Axios.post('http://localhost:5000/user_profile', {
            token: localStorage.getItem('token'),
        })
            .then(response => {
                const data = response.data;
                console.log(data.user);
                if(data.user != null){
                    setUser(data.user);
                }
                else{
                    setUser("Iniciar Sesión")
                }
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
            });
    };

    useEffect(() => {
        send_token_user();
    }, []);

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
            window.location.href = '/publications-page';
            console.log('Se presionó Enter');
        }
    };

    const getTokenFromLocalStorage = () => {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token');
    };

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [isOverSubList, setIsOverSubList] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubMenuToggleEnter = () => {
        setShowSubMenu(true);
        console.log(user);
        getTokenFromLocalStorage();
        send_token_user();
    };
    const handleIsOverSubList = () => {
        setIsOverSubList(true);
    };
    const handleSubMenuToggleLeave = () => {
        setShowSubMenu(false);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            // Redirigir a la página de búsqueda con el término de búsqueda
            console.log("Search term:", searchTerm);
            // Reemplaza el console.log con la redirección real
        }
    };

    return (
        <div className="bg_main_page">
            <header className="header">
                <div className="box_header_top">
                    <div className="isotype_header">
                        <a href="/main-page" className="href_isotype">
                            <h1 className="isotype">MARKETPLACE - UPTC</h1>
                        </a>
                    </div>
                    <div className="list_user_options">
                        <ul className="user_options">
                            <li>
                                <a className="user_option" href="/main-page">Inicio</a>
                            </li>
                            <li>
                                <a className="user_option" href="/create-publication">Publicar</a>
                            </li>
                            <li>
                                <a className="user_option" href="/services-page">Mis Ofertas</a>
                            </li>
                            <li>
                                <a className="user_option" href="/create-publication">Mis Chats</a>
                            </li>
                            <li>
                                <a className="user_option" href="/user-profile">{user}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <nav className="mainnav">
                <div className="left_header_bottom">
                    <ul className="plataform_options">
                        <li onMouseEnter={handleSubMenuToggleEnter}
                            onMouseLeave={handleSubMenuToggleLeave}>
                            <p className="plataform_option">{"Categorías >"}</p>
                            {showSubMenu && (
                                <ul className="submenu">
                                    <a href="categoria1.html">
                                        <li>Accesorios</li>
                                    </a>
                                    <a href="categoria1.html">
                                        <li>Tecnología</li>
                                    </a>
                                    <a href="categoria1.html">
                                        <li>Tutorías</li>
                                    </a>
                                    <a href="categoria1.html">
                                        <li>Ropa</li>
                                    </a>
                                </ul>
                            )}
                        </li>
                        <a href="/products" className="plataform_option">
                            <li>Productos</li>
                        </a>
                        <a href="/services" className="plataform_option">
                            <li>Servicios</li>
                        </a>
                    </ul>
                </div>
                <div className="right_header_bottom">
                    <ul className="module_search">
                        <li>
                            <input className="input_search" placeholder="Haz una Búsqueda..." onKeyPress={handleKeyPress}></input>
                            <label className="icon_glass"><FaMagnifyingGlass color="#F7C600" size="20px" /></label>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="banner">
                <Slider className='slider-main-page' {...settings}>
                    <div className="slide">
                        <h1 className="left_title_slide">COMPRA Y VENDE ARTÍCULOS DE SEGUNDA MANO</h1>
                        <img className='right_image_slide' src={BANNER1} alt="" />
                    </div>
                    <div className="slide">
                        <h1 className="right_title_slide">CONTACTA CON TUTORES PARA AGENDA UNA CITA</h1>
                        <img className='left_image_slide' src={BANNER2} alt="" />
                    </div>
                    <div className="slide">
                        <h1 className="left_title_slide_1">APOYA LA ECONOMÍA UPETECISTA</h1>
                        <img className='right_image_slide' src={BANNER3} alt="" />
                    </div>
                </Slider>
            </div>
            <div className="publications_products">
                <div className="section_products">
                    <h1 className="title_section_products">PRODUCTOS</h1>
                </div>
                <div className="products">
                    <a className="product_link" href="/view-publication">
                        <div className="product">
                            <div className="product_img">
                                <img src={IMG2} alt="" />
                            </div>
                            <div className="footer_product">
                                <h1 className="title_product"> Zapatilla </h1>
                                <p> Ropa </p>
                                <p className="price">$3,99</p>
                            </div>
                            <div className="button_more_information">
                                <button>
                                    Más Información
                                </button>
                            </div>
                        </div>
                    </a>
                    <a className="product_link" href="/view-publication">
                        <div className="product">
                            <div className="product_img">
                                <img src={IMG2} alt="" />
                            </div>
                            <div className="footer_product">
                                <h1 className="title_product"> Zapatilla </h1>
                                <p> Ropa </p>
                                <p className="price">$3,99</p>
                            </div>
                            <div className="button_more_information">
                                <button>
                                    Más Información
                                </button>
                            </div>
                        </div>
                    </a>
                    <a className="product_link" href="/view-publication">
                        <div className="product">
                            <div className="product_img">
                                <img src={IMG2} alt="" />
                            </div>
                            <div className="footer_product">
                                <h1 className="title_product"> Zapatilla </h1>
                                <p> Ropa </p>
                                <p className="price">$3,99</p>
                            </div>
                            <div className="button_more_information">
                                <button>
                                    Más Información
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div className="publications_services">
                <div className="section_services">
                    <h1 className="title_section_services">SERVICIOS</h1>
                </div>
                <div className="services">
                    <a className="service_link" href="/view-publication">
                        <div className="service">
                            <div className="service_img">
                                <img src={IMG2} alt="" />
                            </div>
                            <div className="footer_service">
                                <h1 className="title_service"> Zapatilla </h1>
                                <p> Ropa </p>
                                <p className="price">$3,99</p>
                            </div>
                            <div className="button_more_information">
                                <button>
                                    Más Información
                                </button>
                            </div>
                        </div>
                    </a>
                    <a className="service_link" href="/view-publication">
                        <div className="service">
                            <div className="service_img">
                                <img src={IMG2} alt="" />
                            </div>
                            <div className="footer_service">
                                <h1 className="title_service"> Zapatilla </h1>
                                <p> Ropa </p>
                                <p className="price">$3,99</p>
                            </div>
                            <div className="button_more_information">
                                <button>
                                    Más Información
                                </button>
                            </div>
                        </div>
                    </a>
                    <a className="service_link" href="/view-publication">
                        <div className="service">
                            <div className="service_img">
                                <img src={IMG2} alt="" />
                            </div>
                            <div className="footer_service">
                                <h1 className="title_service"> Zapatilla </h1>
                                <p> Ropa </p>
                                <p className="price">$3,99</p>
                            </div>
                            <div className="button_more_information">
                                <button>
                                    Más Información
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
};