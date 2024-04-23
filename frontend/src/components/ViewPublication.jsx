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
import { useParams } from "react-router-dom";

import { FaMagnifyingGlass } from "react-icons/fa6";



export const ViewPublication = () => {

    const { id } = useParams();
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
        console.log(id);
    }, []);

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

    const [publication, setPublication] = useState(""); // Estado para almacenar los detalles de la publicación

    useEffect(() => {
        // Función para obtener los detalles de la publicación del backend
        const fetchPublication = async () => {
            try {
                const response = await Axios.get(`http://localhost:5000/publications/${id}`);
                setPublication(response.data); // Actualizar el estado con los datos de la publicación
            } catch (error) {
                console.error('Error al obtener la publicación:', error);
            }
        };

        fetchPublication(); // Llamar a la función para obtener los detalles de la publicación
    }, [id]);

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await Axios.post('http://localhost:5000/get_post_images', {
                    folderPath: id, 
                });
    
                setImages(response.data.image); // Almacena las URLs de las imágenes
                console.log(response.data.image);
                console.log(images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
    
        fetchImages(); // Llama a la función para obtener las URLs al montar el componente
    }, []);

    useEffect(() => {
        console.log('Updated images:', images);
    }, [images]);

    function formatToColombianPesos(price) {
        const numericPrice = parseFloat(price);
        if (!isNaN(numericPrice)) {
            const formattedPrice = numericPrice.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP'
            });
            return formattedPrice;
        } else {
            return 'Precio no válido';
        }
    }

    function ColombianPrice({ price }) {
        const formattedPrice = formatToColombianPesos(price);

        return <span>{formattedPrice}</span>;
    }

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
                            {images.map((imageUrl, index) => (
                                <div key={index} className="image_container">
                                    <img src={imageUrl} alt={`Slide ${index}`} className="image_slider" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="info_post">
                        <div className="data_post">
                            <h1>{publication.TITLE_PUBLICATION}</h1>
                            <p> {publication.TYPE_PUBLICATION} - {publication.STATE_PUBLICATION} </p>
                            <p> Categoría -  {publication.CATEGORY_PUBLICATION} </p>
                            <h2> Descripción </h2>
                            <p className="description"> {publication.DESCRIPTION_PUBLICATION} </p>
                            <p> Precio: <ColombianPrice price={publication.PRICE_PUBLICATION} /></p>
                            <p> Ofertada en Sede / Seccional: {publication.SELLER_LOCATION} </p>
                            <p> Por  {publication.ID_USER_SELLER} </p>
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