import React, { useState, useEffect } from "react";
import '../styles/Header.css';
import '../styles/MyPublications.css';
import '../styles/ConfirmDialog.css';
import '../styles/Notification.css';
import '../styles/Var.css';

import Spinner from './Spinner.jsx';
import Axios from 'axios';

import Header from './Header';
import Navigation from './Navigation.jsx';
import { ColombianPrice } from './ColombianPrice.jsx';

import Footer from './Footer';
import Modal from 'react-modal';
import icon_not_found from '../images/raa.jpeg';


export const MyPublications = ({ user, href_user_profile,
    categories, showSubMenu, handleSubMenuToggleEnter, handleSubMenuToggleLeave,
    locations, showLocationsMenu, handleLocationsMenuToggleEnter, handleLocationsMenuToggleLeave,
    searchTerm, handleSearchChange, handleKeyPress, handleSearch }) => {

    const [loading, setLoading] = useState(false);

    const [selectedStates, setSelectedStates] = useState({});

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
        setLoading(true);
        fetch('http://localhost:5000/get_states')
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => console.error('Error:', error))
            .finally(() => setLoading(false));
    }, []);

    const handleOptionChange = (id, event) => {
        const newState = event.target.value;
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

    const [postIdToDelete, setPostIdToDelete] = useState(null);

    const handleDeletePost = (id) => {
        setLoading(true);
        Axios.post('http://localhost:5000/delete_post', {
            publicationId: id,
            token: localStorage.getItem('token')
        })
            .then(response => {
                console.log("Estado actualizado con éxito");
            })
            .catch(error => {
                console.error("Error al actualizar el estado:", error);
            });
        setLoading(false);
    };

    const handleRemoveButton = (id) => {
        setPostIdToDelete(id);
        setModalIsOpen(true);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleYes = () => {
        if (postIdToDelete) {
            handleDeletePost(postIdToDelete);
            setPostIdToDelete(null);
            setModalNotificationIsOpen(true);
        }
        setModalIsOpen(false);
    };

    const handleNo = () => {
        setPostIdToDelete(null);
        setModalIsOpen(false);
    };

    const [modalNotificationIsOpen, setModalNotificationIsOpen] = useState(false);

    const handleOK = () => {
        window.location.reload();
        setModalNotificationIsOpen(false);
    };

    const customStyles = {
        content: {
            width: '45%',
            height: '33%',
            margin: 'auto',
            backgroundColor: 'white',
        },
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
                locations={locations}
                showLocationsMenu={showLocationsMenu}
                handleLocationsMenuToggleEnter={handleLocationsMenuToggleEnter}
                handleLocationsMenuToggleLeave={handleLocationsMenuToggleLeave}
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
            {myPosts.length === 0 && !loading ? (
                    <div className="image-with-text1">
                        <img src={icon_not_found} alt="No Found Icon" />
                        <p>Aún no has realizado ninguna oferta - ¡Intenta crear una publicación!</p>
                    </div>
                ) : (
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
                                <button className="delete-my-publication" onClick={() => handleRemoveButton(publication.ID_PUBLICATION)}>Eliminar</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={() => setModalIsOpen(false)}
                                    contentLabel="Notificación"
                                    style={customStyles}
                                >
                                    <div className='confirm_dialog'>
                                        <h1 className='title_confirm_dialog'>Atención</h1>
                                        <h2 className='subtitle_confirm_dialog'>¿Esta seguro de querer eliminar esta publicación?</h2>
                                        <div className='button_confirm_dialog'>
                                            <button className="yes_confirm_dialog" onClick={handleYes}>Si</button>
                                            <button className="no_confirm_dialog" onClick={handleNo}>No</button>
                                        </div>
                                    </div>
                                </Modal>
                                <Modal
                                    isOpen={modalNotificationIsOpen}
                                    onRequestClose={() => setModalNotificationIsOpen(true)}
                                    contentLabel="Notificación"
                                    style={customStyles}
                                >
                                    <div className='notification'>
                                        <h1 className='title_notification'>Atención</h1>
                                        <h2 className='subtitle_notification'>¡La publicación se ha eliminado correctamente!</h2>
                                        <div className='button_notification'>
                                            <button className="ok_notification" onClick={handleOK}>Continuar</button>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                ))}
            </div>)}
            <Footer />
        </div>
    )
};