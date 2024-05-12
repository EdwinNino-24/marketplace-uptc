import React, { useState } from 'react';
import Axios from 'axios';
import '../styles/Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from 'react-modal';
import Header from './HeaderTwo';
import '../styles/Var.css';

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [mensaje, setMensaje] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:5050/login', {
        username: username,
        password: password,
      });

      const data = response.data;
      const token = data.token;

      if (data.code === '3') {
        localStorage.setItem('token', token);
        window.location.href = '/main-page';
      }
      else if (data.code === '0') {
        setMensaje("¡Este usuario no esta registrado en nuestro sistema!")
        setModalIsOpen(true);
      }
      else if (data.code === '1') {
        localStorage.setItem('token', token);
        setMensaje("¡Este usuario no ha activado la cuenta!")
        setModal2IsOpen(true);
      }
      else if (data.code === '2') {
        localStorage.setItem('token', token);
        setMensaje("¡La contraseña ingresada es incorrecta!")
        setModalIsOpen(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleOK = () => {
    setModalIsOpen(false);
  };
  const handleOK2 = () => {
    setModal2IsOpen(false);
    window.location.href = '/activate-account';
  };

  const handleChange1 = (e) => {
    const { value } = e.target;
    let processedValue = value;
    if (value.includes(' ')) {
      processedValue = value.replace(/\s/g, '');
    }
    setUsername(processedValue.toLowerCase());
  };

  const customStyles = {
    content: {
      width: '45%',
      height: '33%',
      margin: 'auto',
      backgroundColor: 'white',
    },
  };

  return (
    <div className="bg_login">
      <Header />
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
                onChange={(e) => handleChange1(e)}
                required
              />
              <label className="label-uptc">@uptc.edu.co</label>
            </div>
            <div className="input-box-password-login">
              <input
                aria-label="Usuario"
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