import React from 'react';
import '../styles/EnterCodeRecover.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');

const EnterCodeRecover = () => {

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [numericValue, setNumericValue] = useState('');

  const handleNumericChange = (event) => {
    const value = event.target.value;
    const regex = /^[0-9\b]+$/;
    if (value === '' || regex.test(value)) {
      setNumericValue(value);
    }
  };

  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(numericValue);

    if (numericValue.length !== 0) {
      try {
        const response = await fetch('http://localhost:5000/recover_account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ numericValue })
        });

        const data = await response.json();

        if (data.code === '0') {
          setMensaje("¡Recuperación de Cuenta Exitosa!")
          setModal2IsOpen(true);
          localStorage.setItem('token', data.token);
        }
        else if (data.code === '1') {
          setMensaje("¡El código de seguridad que ingresaste no fue el que te enviamos!")
          setModalIsOpen(true);
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
    window.location.href = '/new_password_from_recover';
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
              <FaArrowAltCircleLeft className='iconBackFromEnterCodeRecover' color='black' size='50px' onClick={handleBack} />
              <h1 className='header-title-register'>Para continuar, ingresa el código<br></br>que hemos enviado a tu correo</h1>
            </div>
            <div className='input_code_recover'>
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
              <button className='button_recover_account' onClick={handleSubmit} type='submit'>RECUPERAR CUENTA</button>
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

export default EnterCodeRecover

