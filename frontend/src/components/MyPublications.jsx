import React, { useState, useEffect } from "react";
import '../styles/Header.css';
import '../styles/MyPublications.css';

import Spinner from './Spinner.jsx';
import Axios from 'axios';

import Header from './Header';
import Navigation from './Navigation.jsx';
import { ColombianPrice } from './ColombianPrice.jsx';


export const MyPublications = () => {

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


    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            Axios.post('http://localhost:5000/get_my_posts', { token })
                .then(response => {
                    const data = response.data;
                    setMyPosts(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);


    return (
        <div className="bg_my_posts">
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
            />

            <div className="section_top">
                <div className="section_title_my_posts_page">
                    <h1 className="section_title_my_posts">MIS PUBLICACIONES</h1>
                </div>
                <div className="short_cut_create_post">
                    <a href="/create-publication">
                        <button className="shortcut_create_new_publication">+</button>
                    </a>
                </div>
            </div>

            <div className="my-publications">

                {myPosts.map(publication => (

                    <div className="my-publication">
                        <div className="my_publication">
                            <div className="div_image_post" key={publication.ID_PUBLICATION}
                                onClick={() => window.location.href = `/view-publication/${publication.ID_PUBLICATION}`}>
                                <img className='image_my_post' src={publication.URL_IMAGE_OFFER} alt="" />
                            </div>
                            <div className="info_my_post" key={publication.ID_PUBLICATION}
                                onClick={() => window.location.href = `/view-publication/${publication.ID_PUBLICATION}`}>
                                <h1> {publication.NAME_OFFER} </h1>
                                <p className="price"><ColombianPrice price={publication.PRICE_OFFER} /></p>
                            </div>
                            <div className="properties_my_publication">
                                <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                    <option value="DISPONIBLE">DISPONIBLE</option>
                                    <option value="PAUSADA">PAUSADA</option>
                                    <option value="FINALIZADA">FINALIZADA</option>
                                </select>
                                <button className="chats-my-publication">
                                    Chats
                                </button>
                                <button className="edit-my-publication"
                                    key={publication.ID_PUBLICATION}
                                    onClick={() => window.location.href = `/edit-publication/${publication.ID_PUBLICATION}`}>
                                    Editar
                                </button>
                                <button className="delete-my-publication">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
};