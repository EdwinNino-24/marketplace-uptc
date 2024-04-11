import React from 'react';
import './EnterEmailForm.css';
import { TfiEmail } from "react-icons/tfi";

const LoginForm = () => {
  return (
    <div class="oe">
      <div className='wrapper-enter-email'>
        <form action="">
            <h1>RECUPERA TU CUENTA</h1>
            <a>Ingresa tu correo electrónico para buscar tu cuenta.</a>
            <div className='input-box-email'>
                <input type="text" placeholder='Correo Electrónico' required />
                <TfiEmail className='icon' color='black'/>
                <label className='label-uptc'>@uptc.edu.co</label>
            </div>
            <a href="/enter-coder-recover">
              <button className='continue-l' type='submit'>CONTINUAR</button>
            </a>
        </form>
      
    </div>
    </div>
  )
}

export default LoginForm
