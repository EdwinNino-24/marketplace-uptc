import React from 'react';
import '../styles/ActivateAccount.css';
import '../styles/Notification.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ActivateAccount = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const [numericValue, setNumericValue] = useState('');

    const handleNumericChange = (event) => {
        const value = event.target.value;

        setNumericValue(value);

    };

    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        if (numericValue.length !== 0) {
            e.preventDefault();
            try {
                const response = await fetch('http://localhost:5000/code_activation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code: numericValue, token: (localStorage.getItem('token')) }) // Envías solo el código en el cuerpo de la solicitud
                });
                const data = await response.json();

                if (data.code === '0') {
                    setMensaje("¡El código que ingresaste, no fue el que te enviamos!");
                    setModalIsOpen(true);
                } else {
                    localStorage.setItem('token', data.token);
                    setMensaje("Tu cuenta ha sido activada exitosamente!");
                    setModal2IsOpen(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modal2IsOpen, setModal2IsOpen] = useState(false);

    const handleOK = () => {
        setModalIsOpen(false);
    };
    const handleOK2 = () => {
        setModal2IsOpen(false);
        window.location.href = '/main-page';
    };

    const customStyles = {
        content: {
            width: '45%', // Cambia el porcentaje según tu preferencia
            height: '33%', // Cambia el porcentaje según tu preferencia
            margin: 'auto', // Para centrar el modal horizontalmente
            backgroundColor: 'white', // Color de fondo del modal
        },
    };

    const [isDisabled, setIsDisabled] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(30); // Comienza en 30 segundos

    useEffect(() => {
        // Función que se ejecuta cada segundo
        const tick = () => {
            setSecondsLeft(prevSeconds => prevSeconds - 1);
        };

        // Si el tiempo llega a 0, habilitar el botón
        if (secondsLeft <= 0) {
            setIsDisabled(false);
            return;
        }

        // Establecer un intervalo que decrementa el contador cada segundo
        const interval = setInterval(tick, 1000);

        // Función de limpieza que limpia el intervalo
        return () => clearInterval(interval);
    }, [secondsLeft]);

    const handleClick = () => {
        // Reiniciar el contador a 30 segundos y deshabilitar el botón de nuevo
        setSecondsLeft(30);
        setIsDisabled(true);
    };

    const handleResendCode = async (e) => {
        handleClick();
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/resend_code_activation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: (localStorage.getItem('token')) }) // Envías solo el código en el cuerpo de la solicitud
            });
            const data = await response.json();


        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg_activate_account">
            <header className='header-login'>
                <h2 className='title_login'>MARKETPLACE - UPTC</h2>
            </header>
            <div className='body_activate_account'>
                <div className='wrapper_activate_account_ra'>
                    <form onSubmit={handleSubmit}>
                        <div className='header-register'>
                            <FaArrowAltCircleLeft className='iconBackFromActivateAccount' color='black' size='50px' onClick={handleBack} />
                            <h1 className='header-title-register'>Para continuar, ingresa el código<br></br>que hemos enviado a tu correo</h1>
                        </div>
                        <div className='input_code_activation'>
                            <input
                                id="numericInput"
                                className='title-publication'
                                type="text"
                                value={numericValue}
                                onChange={handleNumericChange}
                                placeholder='Ingresa el código' required
                            />
                        </div>

                        <a href="/login">
                            <button className='button_active_account' type='submit'>ACTIVAR CUENTA</button>
                        </a>
                        <button className='button_resend' onClick={handleResendCode} disabled={isDisabled}>
                            {isDisabled ? `Reenviar código, espera ${secondsLeft} segundos` : 'Reenviar código'}
                        </button>


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
                        <Modal
                            isOpen={modal2IsOpen}
                            contentLabel="Notificación"
                            style={customStyles}
                        >
                            <div className='notification'>
                                <h1 className='title_notification'>Atención</h1>
                                <h2 className='subtitle_notification'>{mensaje}</h2>
                                <div className='button_notification'>
                                    <button className="ok_notification" onClick={handleOK2}>Continuar</button>
                                </div>
                            </div>
                        </Modal>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default ActivateAccount
