import React from 'react';
import '../styles/EnterEmail.css';
import '../styles/Notification.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from 'react';
import Modal from 'react-modal';
import Header from './HeaderTwo';
import '../styles/Var.css';


Modal.setAppElement('#root');

const EnterEmailForm = () => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        if (inputValue.length !== 0) {
            e.preventDefault();
            try {
                const response = await fetch('http://localhost:5050/search_account_recover', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: inputValue })
                });
                const data = await response.json();

                if (data.code === "0") {
                    setMessage('¡Este usuario no esta registrado en nuestro sistema!');
                    setModalIsOpen(true);
                }
                else if (data.code === "1") {
                    await localStorage.setItem('token', data.token);
                    setMessage('¡Este usuario no ha activado la cuenta!');
                    setModal3IsOpen(true);
                } else if (data.code === "2") {
                    await localStorage.setItem('token', data.token);
                    setModal2IsOpen(true);
                }
                else if (data.code === "3") {
                    setMessage('¡La solicitud ha fallado!');
                    setModalIsOpen(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modal2IsOpen, setModal2IsOpen] = useState(false);
    const [modal3IsOpen, setModal3IsOpen] = useState(false);

    const handleOK = () => {
        setModalIsOpen(false);
    };
    const handleOK2 = () => {
        setModal2IsOpen(false);
        window.location.href = '/enter-code-recover';
    };
    const handleOK3 = () => {
        setModal3IsOpen(false);
        window.location.href = '/activate-account';
    };

    const customStyles = {
        content: {
            width: '45%', 
            height: '33%', 
            margin: 'auto', 
            backgroundColor: 'white', 
        },
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const sanitizedValue = inputValue.replace(/\s/g, '');
        setInputValue(sanitizedValue.toLowerCase());
    };

    return (
        <div className="bg_enter_email">
            <Header />
            <div className='body_enter_email'>
                <div className='wrapper_enter_email'>
                    <form action="">
                        <div className='header_enter_email'>
                            <FaArrowAltCircleLeft className='iconBackFromEnterEmail' color='black' size='50px' onClick={handleBack} />
                            <h1 className='header_title_email'>Para continuar, ingresa tu usuario<br></br> institucional para encontrar tu cuenta</h1>
                        </div>
                        <div className='input_email'>
                            <input className='title-publication' type="text" name="email"
                                placeholder='Usuario Institucional'
                                onChange={handleInputChange}
                                value={inputValue}
                                required />
                            <label className='label_enter_email'>@uptc.edu.co</label>
                        </div>

                        <a href="/login">
                            <button className='button_get_code' onClick={handleSubmit} type='submit'>BUSCAR CUENTA</button>
                        </a>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            contentLabel="Notificación"
                            style={customStyles}
                        >
                            <div className='notification'>
                                <h1 className='title_notification'>Atención</h1>
                                <h2 className='subtitle_notification'>{message}</h2>
                                <div className='button_notification'>
                                    <button className="ok_notification" onClick={handleOK}>Continuar</button>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            isOpen={modal3IsOpen}
                            contentLabel="Notificación"
                            style={customStyles}
                        >
                            <div className='notification'>
                                <h1 className='title_notification'>Atención</h1>
                                <h2 className='subtitle_notification'>{message}</h2>
                                <div className='button_notification'>
                                    <button className="ok_notification" onClick={handleOK3}>Continuar</button>
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
                                <h2 className='subtitle_notification'>¡Hemos identificado tu cuenta!</h2>
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

export default EnterEmailForm
