import React, { useState, useEffect } from "react";
import '../styles/UserProfile.css';
import '../styles/Header.css';
import Axios from 'axios';

import { AiFillDatabase } from "react-icons/ai";
import { PiCrosshairSimpleFill } from "react-icons/pi";
import { PiChatsFill } from "react-icons/pi";
import { GrLogout } from "react-icons/gr";

import Header from './Header';
import Navigation from './Navigation.jsx';


export const UserProfile = () => {

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

    const handleClick = () => {
        localStorage.removeItem('token');
        setUser("Iniciar Sesión");
        localStorage.removeItem('token');
        send_token_user();
    };


    return (
        <div className="bg_my_account">

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
            />

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