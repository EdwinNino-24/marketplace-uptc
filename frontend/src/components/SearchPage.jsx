import React, { useState, useEffect } from "react";
import Axios from 'axios';

import Spinner from './Spinner.jsx';

import '../styles/Header.css';
import '../styles/PostsSearched.css';

import { useParams } from "react-router-dom";

import icon_not_found from '../images/ra.jpeg';

import Header from './Header';
import Navigation from './Navigation.jsx';
import { ColombianPrice } from './ColombianPrice.jsx'; 


export const SearchPage = () => {

    const { searchTermId } = useParams();

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

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        Axios.post('http://localhost:5000/get_posts_by_search', { search: searchTermId })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => console.error('Error al obtener las publicaciones:', error))
            .finally(() => {
                setLoading(false);
            });
    }, [searchTermId]);


    return (
        <div className="bg_search_page">
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

            <div className="posts_searched">
                <div className="section_title_search_page">
                    <h1 className="section_title_search">{searchTermId}</h1>
                </div>
                {posts.length === 0 && !loading ? (
                    <div className="image-with-text">
                        <img src={icon_not_found} alt="No Found Icon" />
                        <p>No se encontraron publicaciones - ¡Intenta buscar con otras palabras!</p>
                    </div>
                ) : (
                <div className="posts_found">
                    {posts.map(publication => (
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
                )}
            </div>
        </div>
    )
};