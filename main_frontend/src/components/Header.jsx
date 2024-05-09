import React from 'react';

const Header = ({ user, href_user_profile }) => {
    return (
        <header className="header">
            <div className="box_header_top">
                <div className="isotype_header">
                    <h1 className="isotype">MARKETPLACE - UPTC</h1>
                </div>
                <div className="list_user_options">
                    <ul className="user_options">
                        <li><a className="user_option" href="/main-page">Inicio</a></li>
                        <li><a className="user_option" href="/create-publication">Publicar</a></li>
                        <li><a className="user_option" href="/my-publications-page">Mis Ofertas</a></li>
                        <li><a className="user_option" href="/my-publications-page">Mis Chats</a></li>
                        <li><a className="user_option" href={href_user_profile}>{user}</a></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;