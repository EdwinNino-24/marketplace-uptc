import React, { useState, useEffect } from "react";
import '../styles/Header.css';
import '../styles/Banner.css';
import '../styles/ImageSlider.css';

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

    const [user, setUser] = useState("Iniciar Sesión");

    const send_token_user = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No hay token disponible.');
            setUser("Iniciar Sesión");
            return;
        }

        Axios.post('http://localhost:5000/user_profile', { token })
            .then(response => {
                const { user } = response.data;
                setUser(user ? user : "Iniciar Sesión");
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
                setUser("Iniciar Sesión");
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
        console.log(randomImages);
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

    const [publications, setPublications] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/publications')
            .then(response => response.json())
            .then(data => setPublications(data))
            .catch(error => console.error('Error al obtener las publicaciones:', error));
    }, []);

    const [productsPosts, setProductsPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products_posts')
            .then(response => response.json())
            .then(data => setProductsPosts(data))
            .catch(error => console.error('Error al obtener las publicaciones:', error));
    }, []);

    const [servicesPosts, setServicesPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/services_posts')
            .then(response => response.json())
            .then(data => setServicesPosts(data))
            .catch(error => console.error('Error al obtener las publicaciones:', error));
    }, []);

    const formatToColombianPesos = (value) => {
        const formattedValue = Number(value).toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP'
        });

        return formattedValue;
    }

    function ColombianPrice({ price }) {
        const formattedPrice = formatToColombianPesos(price);

        return <span>{formattedPrice}</span>;
    }

    const [randomImages, setRandomImages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/get_random_images')
            .then(response => response.json())
            .then(data => setRandomImages(data))
            .catch(error => console.error('Error al obtener las imágenes aleatorias:', error));
    }, []);

    const href_user_profile = localStorage.getItem('token') ? '/user-profile' : '/login';

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
                                <a className="user_option" href="/my-publications-page">Mis Ofertas</a>
                            </li>
                            <li>
                                <a className="user_option" href="/my-publications-page">Mis Chats</a>
                            </li>
                            <li>
                                <a className="user_option" href={href_user_profile}>{user}</a>
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
            <div className="general_posts">
                <div className="section_title">
                    <h1 className="section_title_posts">PRODUCTOS</h1>
                </div>
                <div className="posts">
                    {productsPosts.map(publication => (
                        <a key={publication.ID_PUBLICATION} className="post_link"
                            href={`/view-publication/${publication.ID_PUBLICATION}`}>
                            <div className="post">
                                <div className="post_img">
                                    <img src={publication.URL_IMAGE_PUBLICATION} alt="" />
                                </div>
                                <div className="footer_post">
                                    <p className="price"><ColombianPrice price={publication.PRICE_PUBLICATION} /></p>
                                    <h1 className="title_post">{publication.TITLE_PUBLICATION}</h1>
                                    <p>SEDE / SECCIONAL {publication.SELLER_LOCATION}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="general_posts">
                <div className="section_title">
                    <h1 className="section_title_posts">SERVICIOS</h1>
                </div>
                <div className="posts">
                    {servicesPosts.map(publication => (
                        <a key={publication.ID_PUBLICATION} className="post_link"
                            href={`/view-publication/${publication.ID_PUBLICATION}`}>
                            <div className="post">
                                <div className="post_img">
                                    <img src={publication.URL_IMAGE_PUBLICATION} alt="" />
                                </div>
                                <div className="footer_post">
                                    <p className="price"><ColombianPrice price={publication.PRICE_PUBLICATION} /></p>
                                    <h1 className="title_post">{publication.TITLE_PUBLICATION}</h1>
                                    <p>SEDE / SECCIONAL {publication.SELLER_LOCATION}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
};