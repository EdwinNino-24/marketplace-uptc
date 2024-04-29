import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/EditUserProfile.css';
import Axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EditUserProfile = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const [currentPassword, setCurrentPassword] = useState(false);
    const toggleCurrentPasswordVisibility = () => {
        setCurrentPassword(!currentPassword);
    };
    const [newPassword, setNewPassword] = useState(false);
    const toggleNewPasswordVisibility = () => {
        setNewPassword(!newPassword);
    };

    const [confirmPasswordToDeleteAccount, setConfirmPasswordToDeleteAccount] = useState(false);
    const toggleConfirmPasswordToDeleteAccountVisibility = () => {
        setConfirmPasswordToDeleteAccount(!confirmPasswordToDeleteAccount);
    };

    const [user, setUser] = useState('');

    const [names, setNames] = useState('');

    const [lastnames, setLastnames] = useState('');

    const [token] = useState(localStorage.getItem('token'));

    const [formDataPersonal, setFormDataPersonal] = useState({
        "names": names,
        "lastnames": lastnames,
        "token": token
    });
    const [formDataPasswords, setFormDataPasswords] = useState({
        "current_password": '',
        "new_password": '',
        "token": token
    });
    const [formCurrentPassword, setFormCurrentPassword] = useState({
        "current_password_delete": ''
    });

    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        send_token_user();
    }, []);

    const send_token_user = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No hay token disponible.');
            return;
        }

        Axios.post('http://localhost:5000/personal_information', { token: token })
            .then(response => {
                const personal_information = response.data;
                setFormDataPersonal({
                    names: personal_information.NAMES,
                    lastnames: personal_information.LASTNAMES,
                    token: localStorage.getItem('token')
                });
                setNames(personal_information.NAMES);
                setLastnames(personal_information.LASTNAMES);
                setUser(personal_information.ID_ACCOUNT);
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
            });
    };

    useEffect(() => {
        setFormDataPersonal({
            names: names,
            lastnames: lastnames,
            token: localStorage.getItem('token')
        });
    }, [names, lastnames, token]);

    const handleSubmitPersonalInformation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/change_personal_information', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataPersonal)
            });

            const data = await response.json();

            if (data.code === 0) {
                setMensaje("¡Tu información se ha actualizado correctamente!");
                setModalIsOpen(true);
            }
        } catch (error) {
        }
    };

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (name === 'current_password' && value.includes(' ')) {
            processedValue = value.replace(/\s/g, '');
        }
        setFormDataPasswords({
            ...formDataPasswords,
            [name]: processedValue
        });
    };
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (name === 'new_password' && value.includes(' ')) {
            processedValue = value.replace(/\s/g, '');
        }
        setFormDataPasswords({
            ...formDataPasswords,
            [name]: processedValue
        });
    };

    const handleChange4 = (e) => {
        const { name, value } = e.target;
        setFormDataPersonal({
            ...formDataPersonal,
            [name]: value
        });
    };

    const handleChange5 = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (name === 'current_password_delete' && value.includes(' ')) {
            processedValue = value.replace(/\s/g, '');
        }
        setFormCurrentPassword({
            ...formDataPasswords,
            [name]: processedValue
        });
    };



    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOK = () => {
        setModalIsOpen(false);
    };

    const customStyles = {
        content: {
            width: '45%', // Cambia el porcentaje según tu preferencia
            height: '33%', // Cambia el porcentaje según tu preferencia
            margin: 'auto', // Para centrar el modal horizontalmente
            backgroundColor: 'white', // Color de fondo del modal
        },
    };

    const [isEditable, setIsEditable] = useState(false);

    const toggleEdit = () => {
        setIsEditable(!isEditable);
    };

    const [changePassword, setChangePassword] = useState(false);

    const toggleChangePassword = () => {
        setChangePassword(!changePassword);
    };

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/change_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataPasswords)
            });

            const data = await response.json();

            if (data.code === 1) {
                setMensaje("¡Tu contraseña se ha actualizado correctamente!");
                setModalIsOpen(true);
            }
            else{
                setMensaje("¡Contraseña actual incorrecta!");
                setModalIsOpen(true);
            }
        } catch (error) {
        }
    };


    const [deleteAccount, setDeleteAccount] = useState(false);

    const toggleDeleteAccount = () => {
        setDeleteAccount(!deleteAccount);
    };

    return (
        <div className="bg_edit_profile">
            <header className="header_register">
                <h2 className="title_login">MARKETPLACE - UPTC</h2>
            </header>
            <div className="body_edit_profile">
                <div className="wrapper_edit_profile">
                    <div className='header_top_profile'>
                        <div className='header_profile'>
                            <div className='icon_back_up'>
                                <FaArrowAltCircleLeft className='iconBackFromUserProfile' color='black' size='50px' onClick={handleBack} />
                            </div>
                            <div className='raaa'>
                                <h1 className='title_profile'>TU PERFIL</h1>
                            </div>
                        </div>
                    </div>
                    <div className='body_profile'>
                        <div className="personal_info" >
                            <form onSubmit={handleSubmitPersonalInformation}>
                                <div className='header-register'>
                                    <h1 className='title_personal_info' onClick={toggleEdit}>
                                        Modificar nombres y apellidos {isEditable ? '<' : '>'}
                                    </h1>
                                </div>
                                {isEditable && (
                                    <div>
                                        <div className='names-lastnames_edit'>
                                            <div className='input-names-register'>
                                                <input type="text" name="names" value={formDataPersonal.names} onChange={handleChange4} placeholder='Nombres' required />
                                            </div>
                                            <div className='input-lastnames-register'>
                                                <input type="text" placeholder='Apellidos' name="lastnames" value={formDataPersonal.lastnames} onChange={handleChange4} required />
                                            </div>
                                        </div>
                                        <div className='input_email_register_edit'>
                                            <input value={user} disabled />
                                            <label className='label_uptc'>@uptc.edu.co</label>
                                        </div>
                                        <button type="submit" className="button_save_changes_user">
                                            GUARDAR CAMBIOS
                                        </button>
                                    </div>
                                )}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={() => setModalIsOpen(false)}
                                    contentLabel="Notificación"
                                    style={customStyles}
                                >
                                    <div className='notification'>
                                        <h1 className='title_notification'>Atención</h1>
                                        <h2 className='subtitle_notification'>{mensaje}</h2>
                                        <div className='button_notification'>
                                            <button className="ok_notification" onClick={handleOK}>Continuar</button>
                                        </div>
                                    </div>
                                </Modal>
                            </form>
                        </div>
                        <div className='passwords'>
                            <form onSubmit={handleSubmitChangePassword}>
                                <div className='header-register'>
                                    <h1 className='title_personal_info' onClick={toggleChangePassword} >Cambiar la contraseña {changePassword ? '<' : '>'}</h1>
                                </div>
                                {changePassword && (
                                    <div>
                                        <div className='section_passwords'>
                                            <div className='input_password_edit'>
                                                <input
                                                    type={currentPassword ? 'text' : 'password'}
                                                    placeholder="Ingresa tu contraseña actual"
                                                    value={formDataPasswords.current_password}
                                                    onChange={handleChange1}
                                                    name="current_password"
                                                    required
                                                />
                                                {currentPassword ? (
                                                    <FaEyeSlash
                                                        className="icon-eye-rg"
                                                        color="black"
                                                        onClick={toggleCurrentPasswordVisibility}
                                                    />
                                                ) : (
                                                    <FaEye
                                                        className="icon-eye-rg"
                                                        color="black"
                                                        onClick={toggleCurrentPasswordVisibility}
                                                    />
                                                )}
                                            </div>
                                            <div className='input_password_edit'>
                                                <input
                                                    type={newPassword ? 'text' : 'password'}
                                                    placeholder="Ingresa tu nueva contraseña"
                                                    value={formDataPasswords.new_password}
                                                    onChange={handleChange2}
                                                    name="new_password"
                                                    required
                                                />
                                                {newPassword ? (
                                                    <FaEyeSlash
                                                        className="icon-eye-rg"
                                                        color="black"
                                                        onClick={toggleNewPasswordVisibility}
                                                    />
                                                ) : (
                                                    <FaEye
                                                        className="icon-eye-rg"
                                                        color="black"
                                                        onClick={toggleNewPasswordVisibility}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <button type="submit" className="button_change_password">
                                            CAMBIAR CONTRASEÑA
                                        </button>
                                    </div>
                                )}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={() => setModalIsOpen(false)}
                                    contentLabel="Notificación"
                                    style={customStyles}
                                >
                                    <div className='notification'>
                                        <h1 className='title_notification'>Atención</h1>
                                        <h2 className='subtitle_notification'>{mensaje}</h2>
                                        <div className='button_notification'>
                                            <button className="ok_notification" onClick={handleOK}>Continuar</button>
                                        </div>
                                    </div>
                                </Modal>
                            </form>
                        </div>
                        <div className='delete_account'>
                            <form onSubmit={handleSubmitPersonalInformation}>
                                <div className='header-register'>
                                    <h1 className='title_personal_info' onClick={toggleDeleteAccount}>Eliminar cuenta {deleteAccount ? '<' : '>'}</h1>
                                </div>
                                {deleteAccount && (
                                    <div>
                                        <div className='input_password_delete'>
                                            <input
                                                type={confirmPasswordToDeleteAccount ? 'text' : 'password'}
                                                placeholder="Ingresa tu contraseña para continuar"
                                                value={formCurrentPassword.current_password}
                                                onChange={handleChange5}
                                                name="current_password"
                                                required
                                            />
                                            {confirmPasswordToDeleteAccount ? (
                                                <FaEyeSlash
                                                    className="icon-eye-rg"
                                                    color="black"
                                                    onClick={toggleConfirmPasswordToDeleteAccountVisibility}
                                                />
                                            ) : (
                                                <FaEye
                                                    className="icon-eye-rg"
                                                    color="black"
                                                    onClick={toggleConfirmPasswordToDeleteAccountVisibility}
                                                />
                                            )}
                                        </div>
                                        <button type="submit" className="button_delete_account">
                                            ELIMINAR CUENTA
                                        </button>
                                    </div>
                                )}
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={() => setModalIsOpen(false)}
                                    contentLabel="Notificación"
                                    style={customStyles}
                                >
                                    <div className='notification'>
                                        <h1 className='title_notification'>Atención</h1>
                                        <h2 className='subtitle_notification'>{mensaje}</h2>
                                        <div className='button_notification'>
                                            <button className="ok_notification" onClick={handleOK}>Continuar</button>
                                        </div>
                                    </div>
                                </Modal>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditUserProfile
