import React, { useState } from 'react';
import Axios from 'axios';
import './LoginForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from 'react-modal';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:5000/login', {
        username: username,
        password: password,
      });
      // Guardar el token en localStorage
      const data = response.data;
      console.log(data.code);
      const token = data.token;
      console.log(token);
      localStorage.setItem('token', token);
      console.log(data.code);
      if (data.code === '0') {
        setMensaje("¡Inicio de Sesión Exitosa!")
        setModal2IsOpen(true);
      }
      else if (data.code === '1') {
        setMensaje("¡La contraseña ingresada es incorrecta!")
        setModalIsOpen(true);
      }
      else if (data.code === '2') {
        setMensaje("¡El usuario ingresado no esta registrado en nuestro sistema!")
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const getTokenFromLocalStorage = () => {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  };

  const [mensaje, setMensaje] = useState('');

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
    <div className="bg_login">
      <header className='header-login'>
        <h2 className='title_login'>MARKETPLACE - UPTC</h2>
      </header>
      <div className='body_login'>
        <div className='title_body'>
          <h1 className='t1'>Inicia sesión con tu usuario y contraseña</h1>
        </div>
        <div className="wrapper-login">
          <form onSubmit={handleSubmit}>
            <div className="input-box-user-login">
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="label-uptc">@uptc.edu.co</label>
            </div>
            <div className="input-box-password-login">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordVisible ? (
                <FaEyeSlash
                  className="icon-eye"
                  color="black"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="icon-eye"
                  color="black"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div className="remember-forgot">
              <a href="/enter-email">¿Olvidaste la Contraseña?</a>
            </div>
            <div>
              <button className="button-login" type="submit">
                ENTRAR
              </button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Notificación"
              style={customStyles}
            >
              <div className='notification_account_created'>
                <h1 className='title_notification_account_created'>Atención</h1>
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
            <div className="register-link">
              <p>
                ¿Todavía no tienes una cuenta? <a href="/register">Registrate</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
