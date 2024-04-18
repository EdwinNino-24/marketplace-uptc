import React from 'react';
import '../styles/NewPassword.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from 'react';
import Modal from 'react-modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


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
        console.log(newPassword);

        if (newPassword.length !== 0) {
            try {
                const response = await fetch('http://localhost:5000/enter_password_recover', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newPassword: newPassword, token: localStorage.getItem('token') })
                });

                if (response.ok) {
                    console.log('Contraseña actualizada correctamente');
                    // Aquí podrías redirigir al usuario a una página de inicio de sesión, por ejemplo
                    window.location.href = '/main-page';
                } else {
                    console.error('Error al actualizar la contraseña:', response.statusText);
                    // Aquí podrías mostrar un mensaje de error al usuario
                }
            } catch (error) {
                console.error('Error:', error);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        } else {
            // Aquí podrías mostrar un mensaje indicando que el campo de la contraseña es obligatorio
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
            height: '30%', // Cambia el porcentaje según tu preferencia
            margin: 'auto', // Para centrar el modal horizontalmente
            backgroundColor: 'white', // Color de fondo del modal
        },
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="bg_activate_account">
            <header className='header-login'>
                <h2 className='title_login'>MARKETPLACE - UPTC</h2>
            </header>
            <div className='body_activate_account'>
                <div className='wrapper_activate_account'>
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
                                onChange={(e) => setNewPassword(e.target.value)}
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
                            <div className='notification_account_created'>
                                <h1 className='title_notification_account_created'>Notificación</h1>
                                <h2 className='subtitle_notification_account_created'>{mensaje}</h2>
                                <div className='button_notification_account_created'>
                                    <button className="ok_notification_account_created" onClick={handleOK}>Continuar</button>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            isOpen={modal2IsOpen}
                            contentLabel="Notificación"
                            style={customStyles}
                        >
                            <div className='notification_account_created'>
                                <h1 className='title_notification_account_created'>Notificación</h1>
                                <h2 className='subtitle_notification_account_created'>{mensaje}</h2>
                                <div className='button_notification_account_created'>
                                    <button className="ok_notification_account_created" onClick={handleOK2}>Continuar</button>
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