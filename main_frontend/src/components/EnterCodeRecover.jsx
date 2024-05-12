import React from 'react';
import '../styles/EnterCodeRecover.css';
import '../styles/Notification.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Header from './HeaderTwo';
import '../styles/Var.css';


Modal.setAppElement('#root');

const EnterCodeRecover = () => {

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
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/recover_account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: numericValue, token: localStorage.getItem('token') })
      });

      const data = await response.json();

      if (data.code === '1') {
        setMensaje("¡Recuperación de Cuenta Exitosa!")
        setModal2IsOpen(true);
        await localStorage.setItem('token', data.token);
      }
      else if (data.code === '0') {
        setMensaje("¡El código de seguridad que ingresaste no fue el que te enviamos!")
        await localStorage.setItem('token', data.token);
        setModalIsOpen(true);
      }

    } catch (error) {
      console.error('Error:', error);
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
      const response = await fetch('http://localhost:5050/resend_code_recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: (localStorage.getItem('token')) }) // Envías solo el código en el cuerpo de la solicitud
      });

      const data = response.data;

      localStorage.setItem('token', data.token);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg_activate_account">
      <Header />
      <div className='body_activate_account'>
        <div className='wrapper_enter_code_recover'>
          <form onSubmit={handleSubmit}>
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
              <button className='button_recover_account' type='submit'>RECUPERAR CUENTA</button>
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
                <h1 className='title_notification'>Notificación</h1>
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

export default EnterCodeRecover

