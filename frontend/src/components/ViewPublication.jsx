import React from "react";
import '../styles/Header.css';
import '../styles/ViewPublication.css';
import '../styles/ImageSlider.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from './Spinner.jsx';

import { useState, useEffect } from "react";
import '../styles/Header.css';
import '../styles/Banner.css';
import '../styles/ImageSlider.css';
import '../styles/Publications.css';
import Axios from 'axios';
import { useParams } from "react-router-dom";

import Header from './Header';
import Navigation from './Navigation.jsx';
import { ColombianPrice } from './ColombianPrice.jsx'; 


export const ViewPublication = () => {

    const { id } = useParams();

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
        fetch('http://localhost:5000/get_categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error:', error));
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


    const [publication, setPublication] = useState(""); 

    useEffect(() => {
        setLoading(true);
        const fetchPublication = async () => {
            try {
                const response = await Axios.get(`http://localhost:5000/posts/${id}`);
                setPublication(response.data); 
            } catch (error) {
                console.error('Error al obtener la publicación:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchPublication(); 
    }, [id]);

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await Axios.post('http://localhost:5000/get_post_images', {
                    folderPath: id,
                });

                setImages(response.data.image); 
                console.log(response.data.image);
                console.log(images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages(); 
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        adaptiveHeight: true
    };

    useEffect(() => {
    }, [images]);


    return (
        <div className="bg_view_publication">
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

            <div className="section_post">
                <div className="publication">
                    <div className="images_post">
                        <Slider className='slider_post' {...settings}>
                            {images.map((imageUrl, index) => (
                                <div key={index} className="image_container">
                                    <img src={imageUrl} alt={`Slide ${index}`} className="image_slider" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="info_post">
                        <div className="data_post">
                            <h1>{publication.NAME_OFFER}</h1>
                            <p> {publication.OFFER_TYPE}: {publication.NAME_STATE} </p>
                            <p> Categoría: {publication.NAME_CATEGORY} </p>
                            <h2> Descripción </h2>
                            <p className="description"> {publication.DESCRIPTION_OFFER} </p>
                            <p> Precio: <ColombianPrice price={publication.PRICE_OFFER} /></p>
                            <p> Ofertada en {publication.NAME_LOCATION} </p>
                            <p> Por {publication.ID_OFFERER} </p>
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