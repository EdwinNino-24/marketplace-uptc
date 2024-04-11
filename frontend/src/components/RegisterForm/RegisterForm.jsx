import React from 'react';
import './RegisterForm.css';
import { FaUser, FaLock, FaAddressCard } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const RegisterForm = () => {
  return (
    <div class="oe">
        <div className='wrapperRegisterForm'>
        <form action="">
            <h1>REGISTRATE AHORA</h1>
            <div className='input-box2'>
                <input type="text" placeholder='Nombres' required />
                <FaAddressCard className='icon' color='black'/>
            </div>
            <div className='input-box2'>
                <input type="text" placeholder='Apellidos' required />
                <FaAddressCard className='icon' color='black'/>
            </div>
            <div className='input-box1'>
                <input type="text" placeholder='Correo Electrónico' required />
                <TfiEmail className='icon' color='black'/>
                <label className='label'>@uptc.edu.co</label>
            </div>
            <div className='input-box2'>
                <input type="password" placeholder='Contraseña' required />
                <FaLock className='icon' color='black'/>
            </div>
            <div className='input-box2'>
                <input type="password" placeholder='Confirmar Contraseña' required />
                <FaLock className='icon' color='black'/>
            </div>
            <a href="/login">
                <button type='submit'>CREAR CUENTA</button>
            </a>
            
        </form>
      
    </div>
    </div>
  )
}

export default RegisterForm
