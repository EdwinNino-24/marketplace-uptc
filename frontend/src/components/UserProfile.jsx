import React from "react";
import '../styles/UserProfile.css';
import '../styles/Header.css';

import { AiFillDatabase } from "react-icons/ai";
import { PiCrosshairSimpleFill } from "react-icons/pi";
import { PiChatsFill } from "react-icons/pi";
import { GrLogout } from "react-icons/gr";

import Header from './Header';
import Navigation from './Navigation.jsx';
import Footer from './Footer';


export const UserProfile = ({ user, href_user_profile,
    categories, showSubMenu, handleSubMenuToggleEnter, handleSubMenuToggleLeave,
    locations, showLocationsMenu, handleLocationsMenuToggleEnter, handleLocationsMenuToggleLeave,
    searchTerm, handleSearchChange, handleKeyPress, handleSearch }) => {

    const handleLogout = () => {
        localStorage.removeItem('token');
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
                locations={locations}
                showLocationsMenu={showLocationsMenu}
                handleLocationsMenuToggleEnter={handleLocationsMenuToggleEnter}
                handleLocationsMenuToggleLeave={handleLocationsMenuToggleLeave}
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                handleKeyPress={handleKeyPress}
                handleSearch={handleSearch}
            />
            <div className="bg_user_profile">
                <div className="section_settings">
                    <h1 className="title_section_profile">MI PERFIL</h1>
                </div>
                <div className="settings">
                    <div className="setting">
                        <div className="icon_setting">
                            <AiFillDatabase size="125px" />
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
                            <PiCrosshairSimpleFill size="125px" />
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
                            <PiChatsFill size="125px" />
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
                            <GrLogout size="125px" />
                        </div>
                        <div className="setting_footer">
                            <h1> Cerrar Sesión </h1>
                            <p> Hasta Luego </p>
                        </div>
                        <div className="button_user_profile">
                            <a href="/login">
                                <button onClick={handleLogout}>
                                    Salir
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};