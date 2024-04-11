import React from 'react';
import './EnterCodeRecoverForm.css';
import { TfiEmail } from "react-icons/tfi";

const LoginForm = () => {
  return (
    <div class="oe">
      <div className='wrapper-enter-code'>
          <form action="">
              <h1>RECUPERA TU CUENTA</h1>
              <a>Hemos enviado un código a tu correo electrónico.</a>
              <div className='input-box-code'>
                  <input type="text" placeholder='Ingresa el Código' required />
              </div>
              <button className='continue' type='submit'>CONTINUAR</button>
          </form>
      </div>
    </div>
  )
}

export default LoginForm
