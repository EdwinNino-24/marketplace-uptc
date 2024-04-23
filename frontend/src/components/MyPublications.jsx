import React, { useState, useEffect } from "react";
import '../styles/Header.css';
import '../styles/MyPublications.css';
import Axios from 'axios';


import IMG1 from "../images/1.png";
import { FaMagnifyingGlass } from "react-icons/fa6";


export const MyPublications = () => {

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

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [isOverSubList, setIsOverSubList] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubMenuToggleEnter = () => {
        setShowSubMenu(true);
    };
    const handleIsOverSubList = () => {
        setIsOverSubList(true);
    };
    const handleSubMenuToggleLeave = () => {
        setShowSubMenu(false);
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Ejecuta la acción aquí
            window.location.href = '/publications-page';
            console.log('Se presionó Enter');
        }
    };

    const href_user_profile = localStorage.getItem('token') ? '/user-profile' : '/login';

    return (
        <div className="bg_my_posts">

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

            <div className="section_top">
                <h1 className="section_title_my_posts">MIS PUBLICACIONES</h1>
                <a href="/create-publication">
                    <button className="shortcut_create_new_publication">+</button>
                </a>
            </div>

            <div className="my-publications">
                <div className="my-publication">
                    <div className="my-box-publication">
                        <div className="my-publication-image">
                            <img className='image-my-publication' src={IMG1} alt="" />
                        </div>
                        <div className="info-my-publication">
                            <h1> PLAY2 CHIPEADA </h1>
                            <p> $50.000 </p>
                        </div>
                        <div className="properties-my-publication">
                            <button className="chats-my-publication">
                                Chats
                            </button>
                            <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="PAUSADA">PAUSADA</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                            <a href="/edit-publication">
                                <button className="edit-my-publication">
                                    Editar
                                </button>
                            </a>
                            <button className="delete-my-publication">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="my-publication">
                    <div className="my_publication">
                        <div className="div_image_post">
                            <img className='image_my_post' src={IMG1} alt="" />
                        </div>
                        <div className="info_my_post">
                            <h1> PLAY2 CHIPEADA </h1>
                            <p> $50.000 </p>
                        </div>
                        <div className="properties-my-publication">
                            <button className="chats-my-publication">
                                Chats
                            </button>
                            <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="PAUSADA">PAUSADA</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                            <a href="/edit-publication">
                                <button className="edit-my-publication">
                                    Editar
                                </button>
                            </a>
                            <button className="delete-my-publication">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
};