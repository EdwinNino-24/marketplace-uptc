  import React, { useState } from 'react';
  import './RegisterForm.css';
  import { useNavigate } from 'react-router-dom';
  import { FaArrowAltCircleLeft} from "react-icons/fa";
  import { FaEye, FaEyeSlash } from 'react-icons/fa';

  const RegisterForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      "names": '',
      "lastnames": '',
      "email": '',
      "password": ''
      });

    const handleBack = () => {
      navigate(-1); // Esto te lleva a la página anterior
    };

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/crear-cuenta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
      }
      window.location.href = '/activate-account';
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


    return (
      <div className="bg_register">
        <header className="header_register">
          <h2 className="title_login">MARKETPLACE - UPTC</h2>
        </header>
        <div className="body_register">
          <div className="wrapperRegisterUserForm">
            <form onSubmit={handleSubmit}>
              <div className='header-register'>
                          <FaArrowAltCircleLeft className='iconBack' color='black' size='50px' onClick={handleBack}/>
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
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default RegisterForm;