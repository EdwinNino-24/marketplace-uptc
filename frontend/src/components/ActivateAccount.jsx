import React from 'react';
import '../styles/ActivateAccount.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft} from "react-icons/fa";
import { useState } from 'react';
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
        if(numericValue.length !== 0){
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
          height: '30%', // Cambia el porcentaje según tu preferencia
          margin: 'auto', // Para centrar el modal horizontalmente
          backgroundColor: 'white', // Color de fondo del modal
        },
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
                        <FaArrowAltCircleLeft className='iconBackFromActivateAccount' color='black' size='50px' onClick={handleBack}/>
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
                        <button className='button_active_account' onClick={handleSubmit} type='submit'>ACTIVAR CUENTA</button>
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
        </div>
    </div>
  )
}

export default ActivateAccount
