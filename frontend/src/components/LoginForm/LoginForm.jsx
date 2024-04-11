import React from 'react';
import './LoginForm.css';
import { FaLock } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";


const LoginForm = () => {
  return (
    <div class="oe">
        <div className='wrapper-login'>
        <form action="">
            <h1 className='title-login'>INICIAR SESIÓN</h1>
            <div className='input-box-user-login'>
                <input type="text" placeholder='Correo' required />
                <TfiEmail className='icon' color='black'/>
                <label className='label-uptc'>@uptc.edu.co</label>
            </div>
            <div className='input-box-password'>
                <input type="password" placeholder='Contraseña' required />
                <FaLock className='icon' color='black'/>
            </div>

            <div className='remember-forgot'>
                <a href='/enter-email'>¿Olvidaste la Contraseña?</a>
            </div>

            <button className='button-login' type='submit'>ENTRAR</button>

            <div className='register-link'>
                <p>¿Todavía no tienes una cuenta? <a href='/register'>Registrate</a></p>
            </div>
        </form>
      
    </div>
    </div>
  )
}

export default LoginForm
