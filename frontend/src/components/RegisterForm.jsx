import React, { useState } from 'react';
import '../styles/Register.css';
import '../styles/Notification.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RegisterForm = () => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [formData, setFormData] = useState({
    "names": '',
    "lastnames": '',
    "email": '',
    "password": ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.code === '0') {
        setMensaje("¡Ya tenemos una cuenta registrada con este usuario!");
        setModalIsOpen(true);
      }
      else if (data.code === '1') {
        setMensaje("¡Se presento un error al crear tu cuenta!");
        setModalIsOpen(true);
      }
      else if (data.code === '2') {
        localStorage.setItem('token', data.token);
        window.location.href = '/activate-account';
      }
    } catch (error) {
    }
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === 'email' && value.includes(' ') || name === 'password' && value.includes(' ')) {
      processedValue = value.replace(/\s/g, '');
    }
    if (name === 'email' || name === 'names' || name === 'lastnames') {
      processedValue = processedValue.toLowerCase();
    }
    setFormData({
      ...formData,
      [name]: processedValue
    });
  };


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOK = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      width: '45%', // Cambia el porcentaje según tu preferencia
      height: '33%', // Cambia el porcentaje según tu preferencia
      margin: 'auto', // Para centrar el modal horizontalmente
      backgroundColor: 'white', // Color de fondo del modal
    },
  };


  return (
    <div className="bg_register">
      <header className="header_register">
        <h2 className="title_login">MARKETPLACE - UPTC</h2>
      </header>
      <div className="body_register">
        <div className="wrapperRegisterUserForm">
          <form onSubmit={handleSubmit}>
            <div className='header-register'>
              <FaArrowAltCircleLeft className='iconBackFromRegister' color='black' size='50px' onClick={handleBack} />
              <h1 className='header-title-register'>Completa los datos<br></br>para crear tu cuenta</h1>
            </div>
            <div className='names-lastnames'>
              <div className='input-names-register'>
                <input type="text" name="names" value={formData.names} onChange={handleChange1} placeholder='Nombres' required />
              </div>
              <div className='input-lastnames-register'>
                <input type="text" placeholder='Apellidos' name="lastnames" value={formData.lastnames} onChange={handleChange1} required />
              </div>
            </div>
            <div className='input_email_register'>
              <input type="text" name="email" value={formData.email}
                onChange={(e) => {
                  handleChange1(e);
                }}
                placeholder='Usuario Institucional' required />
              <label className='label'>@uptc.edu.co</label>
            </div>
            <div className='input_password_register'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Nueva Contraseña"
                value={formData.password}
                onChange={handleChange1}
                name="password"
                required
              />
              {passwordVisible ? (
                <FaEyeSlash
                  className="icon-eye-rg"
                  color="black"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="icon-eye-rg"
                  color="black"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <button type="submit" className="button_register">
              CREAR CUENTA
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;