import React from 'react';
import '../styles/EnterEmail.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft} from "react-icons/fa";
import { useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const EnterEmailForm = () => {

    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        if(inputValue.length !== 0){
            e.preventDefault();
            try {
            const response = await fetch('http://localhost:5000/search_account_recover', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputValue }) // Envías solo el código en el cuerpo de la solicitud
            });
            const data = await response.text();
            console.log(data);
        
            if (data === "0") {
                setModalIsOpen(true);
            } else {
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
        window.location.href = '/enter-code-recover';
    };

    const customStyles = {
        content: {
          width: '45%', // Cambia el porcentaje según tu preferencia
          height: '30%', // Cambia el porcentaje según tu preferencia
          margin: 'auto', // Para centrar el modal horizontalmente
          backgroundColor: 'white', // Color de fondo del modal
        },
      };

      const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const sanitizedValue = inputValue.replace(/\s/g, '');
        setInputValue(sanitizedValue);
    };

  return (
    <div className="bg_enter_email">
        <header className='header-login'>
            <h2 className='title_login'>MARKETPLACE - UPTC</h2>
        </header>
        <div className='body_enter_email'>
            <div className='wrapper_enter_email'>
                <form action="">
                    <div className='header_enter_email'>
                        <FaArrowAltCircleLeft className='iconBackFromEnterEmail' color='black' size='50px' onClick={handleBack}/>
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
                            <div className='notification_account_created'>
                                <h1 className='title_notification_account_created'>Notificación</h1>
                                <h2 className='subtitle_notification_account_created'>¡Este usuario no esta registrado en nuestro sistema!</h2>
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
                                <h2 className='subtitle_notification_account_created'>¡Cuenta Encontrada!</h2>
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

export default EnterEmailForm