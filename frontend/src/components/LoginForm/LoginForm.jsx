import React, { useState } from 'react';
import Axios from 'axios';
import './LoginForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
      console.log(response.data); // Maneja la respuesta como desees
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="bg_login">
      <header className='header-login'>
        <h2 className='title_login'>MARKETPLACE - UPTC</h2>
      </header>
      <body>
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
              <div className="register-link">
                <p>
                  ¿Todavía no tienes una cuenta? <a href="/register">Registrate</a>
                </p>
              </div>
            </form>
        </div>
        </div>
      </body>
    </div>
  );
};

export default LoginForm;
