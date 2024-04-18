import React, { useState, useEffect } from "react";
import '../styles/UserProfile.css';
import '../styles/Header.css';
import Axios from 'axios';

import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiFillDatabase } from "react-icons/ai";
import { PiCrosshairSimpleFill } from "react-icons/pi";
import { PiChatsFill } from "react-icons/pi";
import { GrLogout } from "react-icons/gr";


export const UserProfile = () => {

    const [user, setUser] = useState(null);

    const send_token_user = () => {
        Axios.post('http://localhost:5000/user_profile', {
            token: localStorage.getItem('token'),
        })
            .then(response => {
                const data = response.data;
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
        setUser("");
        send_token_user();
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Ejecuta la acción aquí
            window.location.href = '/publications-page';
            console.log('Se presionó Enter');
        }
    };

    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleSubMenuToggleEnter = () => {
        setShowSubMenu(true);
    };
    const handleSubMenuToggleLeave = () => {
        setShowSubMenu(false);
    };

    const handleClick = () => {
         localStorage.removeItem('token');
         setUser("Iniciar Sesión");
         localStorage.removeItem('token');
         send_token_user();
    };

    return (
        <div className="bg_my_account">

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
                                <a className="user_option" href="/products-page">Publicar</a>
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

            <div className="bg_user_profile">
                <div className="section_settings">
                    <h1 className="title_section_profile">MI PERFIL</h1>
                </div>
                <div className="settings">
                    <div className="setting">
                        <div className="icon_setting">
                            <AiFillDatabase size="150px" />
                        </div>
                        <div className="setting_footer">
                            <h1> Mi Cuenta </h1>
                            <p> Tus Datos Personales </p>
                        </div>
                        <div className="button_user_profile">
                            <a href="/edit-user-profile">
                                <button>
                                    Editar
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="setting">
                        <div className="icon_setting">
                            <PiCrosshairSimpleFill size="150px" />
                        </div>
                        <div className="setting_footer">
                            <h1> Mis Publicaciones </h1>
                            <p> Posibles Ventas </p>
                        </div>
                        <div className="button_user_profile">
                            <a href="/my-publications-page">
                                <button>
                                    Ver Más
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="setting">
                        <div className="icon_setting">
                            <PiChatsFill size="150px" />
                        </div>
                        <div className="setting_footer">
                            <h1> Mis Chats </h1>
                            <p> Posibles Compras </p>
                        </div>
                        <div className="button_user_profile">
                            <a href="/edit-user-profile">
                                <button>
                                    Chatear
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="setting">
                        <div className="icon_setting">
                            <GrLogout size="150px" />
                        </div>
                        <div className="setting_footer">
                            <h1> Cerrar Sesión </h1>
                            <p> Hasta Luego </p>
                        </div>
                        <div className="button_user_profile">
                            <a href="/login">
                                <button onClick={handleClick}>
                                    Salir
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};