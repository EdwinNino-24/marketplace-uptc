import React from 'react';
import './NewPasswordForm.css';
import { FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div class="oe">
      <div className='wrapper-new-password'>
        <form action="">
            <h1>CAMBIO DE CONTRASEÑA</h1>
            <a className='textra'>Ingresa la nueva contraseña de tu cuenta.</a>
            <div className='input-box-new-password'>
                <input type="text" placeholder='Nueva Contraseña' required />
                <FaLock className='icon' color='black'/>
            </div>
            <a href="/enter-coder-recover">
              <button className='continue-n' type='submit'>CONTINUAR</button>
            </a>
        </form>
      
    </div>
    </div>
  )
}

export default LoginForm
