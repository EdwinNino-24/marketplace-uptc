import '../styles/NewPassword.css';
import '../styles/Notification.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from 'react';
import Modal from 'react-modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from './HeaderTwo';
import '../styles/Var.css';

Modal.setAppElement('#root');

const NewPasswordForm = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const [newPassword, setNewPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword.length !== 0) {
            try {
                const response = await fetch('http://localhost:5000/enter_password_recover', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newPassword: newPassword, token: localStorage.getItem('token') })
                });
                const data = await response.json();
                if (data.code === 0) {
                    await localStorage.setItem('token', data.token);
                    setMensaje("¡Su contraseña se ha guardado correctamente!");
                    setModal2IsOpen(true);
                } else if (data.code === 1) {
                    setMensaje("¡Ocurrió un error al actualizar la contraseña!");
                    setModalIsOpen(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
        }
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modal2IsOpen, setModal2IsOpen] = useState(false);

    const handleOK = () => {
        setModalIsOpen(false);
    };
    const handleOK2 = () => {
        setModal2IsOpen(false);
        window.location.href = '/login';
    };

    const customStyles = {
        content: {
            width: '45%', // Cambia el porcentaje según tu preferencia
            height: '33%', // Cambia el porcentaje según tu preferencia
            margin: 'auto', // Para centrar el modal horizontalmente
            backgroundColor: 'white', // Color de fondo del modal
        },
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInputChange = (event) => {
        const inputValue = event;
        const sanitizedValue = inputValue.replace(/\s/g, '');
        setNewPassword(sanitizedValue);
    };

    return (
        <div className="bg_activate_account">
            <Header />
            <div className='body_activate_account'>
                <div className='wrapper_new_password_from_recover'>
                    <form action="">
                        <div className='header-register'>
                            <FaArrowAltCircleLeft className='iconBackFromNewPassword' color='black' size='50px' onClick={handleBack} />
                            <h1 className='header-title-register'>Para finalizar, ingrese la nueva<br></br>contraseña de su cuenta</h1>
                        </div>
                        <div className='input_code_recover'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Nueva Contraseña"
                                value={newPassword}
                                onChange={(e) => handleInputChange(e.target.value)}
                                required
                            />
                            {passwordVisible ? (
                                <FaEyeSlash
                                    className="icon-eye-nwr"
                                    color="black"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <FaEye
                                    className="icon-eye-nwr"
                                    color="black"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>

                        <a href="/login">
                            <button className='button_recover_account' onClick={handleSubmit} type='submit'>CAMBIAR CONTRASEÑA</button>
                        </a>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            contentLabel="Notificación"
                            style={customStyles}
                        >
                            <div className='notification'>
                                <h1 className='title_notification'>Notificación</h1>
                                <h2 className='subtitle_notification'>{mensaje}</h2>
                                <div className='button_notification'>
                                    <button className="ok_notification" onClick={handleOK}>Continuar</button>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            isOpen={modal2IsOpen}
                            contentLabel="Notificación"
                            style={customStyles}
                        >
                            <div className='notification'>
                                <h1 className='title_notification'>Notificación</h1>
                                <h2 className='subtitle_notification'>{mensaje}</h2>
                                <div className='button_notification'>
                                    <button className="ok_notification" onClick={handleOK2}>Continuar</button>
                                </div>
                            </div>
                        </Modal>

                    </form>

                </div>
            </div >
        </div >
    )
}

export default NewPasswordForm