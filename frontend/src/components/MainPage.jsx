import '../styles/Header.css';
import '../styles/Banner.css';
import '../styles/ImageSlider.css';
import '../styles/Publications.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Spinner from './Spinner.jsx';
import Slider from 'react-slick';

import React, { useState, useEffect } from "react";
import Axios from 'axios';

import BANNER1 from "../images/3.jpeg";
import BANNER2 from "../images/4.jpeg";
import BANNER3 from "../images/banner3.jpeg";

import Header from './Header';
import Navigation from './Navigation.jsx';
import { ColombianPrice } from './ColombianPrice.jsx';


export const MainPage = () => {

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState("Iniciar Sesión");

    const href_user_profile = localStorage.getItem('token') ? '/user-profile' : '/login';

    const send_token_user = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No hay token disponible.');
            setUser("Iniciar Sesión");
            return;
        }
        Axios.post('http://localhost:5000/user_profile', { token: token })
            .then(response => {
                const user = response.data.ID_ACCOUNT;
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


    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/get_categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error:', error))
            .finally(setLoading(false));
    }, []);

    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleSubMenuToggleEnter = () => {
        setShowSubMenu(true);
    };
    const handleSubMenuToggleLeave = () => {
        setShowSubMenu(false);
    };
    

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && searchTerm.trim()) {
            window.location.href = `/search_page/${searchTerm}`;
        }
    };
    const handleSearch = () => {
        if (searchTerm.trim()) {
            window.location.href = `/search_page/${searchTerm}`;
        }
    };


    const [productsPosts, setProductsPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/get_products_posts')
            .then(response => response.json())
            .then(data => {
                setProductsPosts(data);
            })
            .catch(error => console.error('Error al obtener las publicaciones:', error))
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const [servicesPosts, setServicesPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/get_services_posts')
            .then(response => response.json())
            .then(data => setServicesPosts(data))
            .catch(error => console.error('Error al obtener las publicaciones:', error))
            .finally(() => {
                setLoading(false);
            });
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


    return (
        <div className="bg_main_page">
            <div>
                {loading && <Spinner />}
            </div>
            <Header
                user={user}
                href_user_profile={href_user_profile}
            />
            <Navigation
                categories={categories}
                handleSubMenuToggleEnter={handleSubMenuToggleEnter}
                handleSubMenuToggleLeave={handleSubMenuToggleLeave}
                showSubMenu={showSubMenu}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleKeyPress={handleKeyPress}
                handleSearch={handleSearch}
            />
            <div className="banner">
                <Slider className='slider-main-page' {...settings}>
                    <div className="slide">
                        <h1 className="left_title_slide">COMPRA Y VENDE ARTÍCULOS DE SEGUNDA MANO</h1>
                        <img className='right_image_slide' src={BANNER1} alt="" />
                    </div>
                    <div className="slide">
                        <h1 className="right_title_slide">CONTACTA CON TUTORES PARA AGENDAR UNA CITA</h1>
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
                                    <img src={publication.URL_IMAGE_OFFER} alt="" />
                                </div>
                                <div className="footer_post">
                                    <p className="price"><ColombianPrice price={publication.PRICE_OFFER} /></p>
                                    <h1 className="title_post">{publication.NAME_OFFER}</h1>
                                    <p>{publication.NAME_LOCATION}</p>
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
                                    <img src={publication.URL_IMAGE_OFFER} alt="" />
                                </div>
                                <div className="footer_post">
                                    <p className="price"><ColombianPrice price={publication.PRICE_OFFER} /></p>
                                    <h1 className="title_post">{publication.NAME_OFFER}</h1>
                                    <p>{publication.NAME_LOCATION}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
};