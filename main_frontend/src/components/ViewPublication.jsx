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


export const ViewPublication = ({ user, href_user_profile,
    categories, showSubMenu, handleSubMenuToggleEnter, handleSubMenuToggleLeave,
    locations, showLocationsMenu, handleLocationsMenuToggleEnter, handleLocationsMenuToggleLeave,
    searchTerm, handleSearchChange, handleKeyPress, handleSearch }) => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const [publication, setPublication] = useState("");
    useEffect(() => {
        setLoading(true);
        const fetchPublication = async () => {
            try {
                const response = await Axios.get(`http://localhost:5050/posts/${id}`);
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
                const response = await Axios.post('http://localhost:5050/get_post_images', {
                    folderPath: id,
                });
                setImages(response.data.image);
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
    
    const handleMyChats = async (user, post) => {
        await fetch('http://localhost:5000/api/chats', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId: user, receiverId: post }),
        });
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user }),
        });
        const data = await response.json();
        const jsonParam = data.jsonParam;
        window.open(`http://localhost:5173/?json=${jsonParam}`, '_blank');
    }


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
                locations={locations}
                showLocationsMenu={showLocationsMenu}
                handleLocationsMenuToggleEnter={handleLocationsMenuToggleEnter}
                handleLocationsMenuToggleLeave={handleLocationsMenuToggleLeave}
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
                                <button onClick={() => handleMyChats(user, publication.ID_PUBLICATION)}>
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