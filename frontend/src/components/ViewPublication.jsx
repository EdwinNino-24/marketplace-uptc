import React from "react";
import Logo from "../images/2.1.png";
import '../styles/Header.css';
import '../styles/ViewPublication.css';
import '../styles/ImageSlider.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BANNER1 from "../images/banner1.png";
import BANNER2 from "../images/banner2.png";

import IMG1 from "../images/1.png";

import { useState, useEffect } from "react";
import '../styles/Header.css';
import '../styles/Banner.css';
import '../styles/ImageSlider.css';
import IMG2 from "../images/img01.jpg";
import BANNER3 from "../images/banner3.jpeg";
import '../styles/Publications.css';
import Axios from 'axios';

import { FaMagnifyingGlass } from "react-icons/fa6";


export const ViewPublication = () => {

    const [user, setUser] = useState(null);

    const send_token_user = () => {
        Axios.post('http://localhost:5000/user_profile', {
            token: localStorage.getItem('token'),
        })
            .then(response => {
                const data = response.data;
                console.log(data.user);
                if (data.user != null) {
                    setUser(data.user);
                }
                else {
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
        <div className="bg_view_publication">

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

            <div className="section_post">
                <div className="publication">
                    <div className="images_post">
                        <Slider className='slider_post' {...settings}>
                            <div>
                                <img className='image_slider' src={IMG1} alt="" />
                            </div>
                            <div>
                                <img className='image_slider' src={BANNER2} alt="" />
                            </div>
                        </Slider>
                    </div>
                    <div className="info_post">
                        <div className="data_post">
                            <h1> PLAY 2 CHIPEADA </h1>
                            <p> Producto - Disponible </p>
                            <p> Categoría - Tecnología </p>
                            <h2> Descripción </h2>
                            <p className="description"> Una play 2 chipeada barata </p>
                            <p> Precio -> $10.000 </p>
                            <p> Ofertada en -> Sede Central </p>
                            <p> Por Ramírez </p>
                            <div className="button_contact">
                                <button>
                                    Contactar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};