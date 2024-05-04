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

    const [selectedStates, setSelectedStates] = useState({});

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


    const [selectedOption, setSelectedOption] = useState('');

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            Axios.post('http://localhost:5000/get_my_posts', { token })
                .then(response => {
                    const data = response.data;
                    setMyPosts(data);
                    const initialStateSelections = data.reduce((acc, curr) => ({
                        ...acc,
                        [curr.ID_PUBLICATION]: curr.ID_STATE
                    }), {});
                    setSelectedStates(initialStateSelections);
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    const [states, setStates] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/get_states')
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleOptionChange = (id, event) => {
        const newState = event.target.value;
        setSelectedOption(newState);

        Axios.post('http://localhost:5000/update_publication_state', {
            publicationId: id,
            newState: newState,
            token: localStorage.getItem('token')
        })
            .then(response => {
                console.log("Estado actualizado con éxito");
            })
            .catch(error => {
                console.error("Error al actualizar el estado:", error);
            });
        window.location.reload();
    };


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
                handleSearch={handleSearch}
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
                    <div className="my-publication" key={publication.ID_PUBLICATION}>
                        <div className="my_publication">
                            <div className="div_image_post"
                                onClick={() => window.location.href = `/view-publication/${publication.ID_PUBLICATION}`}>
                                <img className='image_my_post' src={publication.URL_IMAGE_OFFER} alt="" />
                            </div>
                            <div className="info_my_post"
                                onClick={() => window.location.href = `/view-publication/${publication.ID_PUBLICATION}`}>
                                <h1> {publication.NAME_OFFER} </h1>
                                <p className="price"><ColombianPrice price={publication.PRICE_OFFER} /></p>
                            </div>
                            <div className="properties_my_publication">
                                <select id="comboBox" value={selectedStates[publication.ID_PUBLICATION]} onChange={(event) => handleOptionChange(publication.ID_PUBLICATION, event)}>
                                    {states.map(state => (
                                        <option key={state.ID_STATE} value={state.ID_STATE}>{state.NAME_STATE}</option>
                                    ))}
                                </select>
                                <button className="chats-my-publication">Chats</button>
                                <button className="edit-my-publication"
                                    onClick={() => window.location.href = `/edit-publication/${publication.ID_PUBLICATION}`}>
                                    Editar
                                </button>
                                <button className="delete-my-publication">Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};