import React, { useState } from 'react';
import Modal from 'react-modal';
import './EditUserProfile.css';
import { FaUser, FaLock, FaAddressCard } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const EditUserProfile = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleConfirm = () => {
        // Lógica para manejar la confirmación
        console.log('Confirmado');
        setModalIsOpen(false);
    };

    const handleCancel = () => {
        // Lógica para manejar la cancelación
        console.log('Cancelado');
        setModalIsOpen(false);
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
    <div class="oe">
        <div className='wrapperRegisterForm'>
        <form action="">
            <h1>TU CUENTA</h1>
            <div className='input-box2'>
                <input type="text" placeholder='Edita tus Nombres' required />
                <FaAddressCard className='icon' color='black'/>
            </div>
            <div className='input-box2'>
                <input type="text" placeholder='Edita tus Apellidos' required />
                <FaAddressCard className='icon' color='black'/>
            </div>
            <div className='input-box1'>
                <input type="text" placeholder='Correo Electrónico' disabled required />
                <TfiEmail className='icon' color='black'/>
                <label className='label'>@uptc.edu.co</label>
            </div>
            <div className='aaa'>
                <a>CAMBIAR CONTRASEÑA</a>
            </div>
            <div className='input-box2'>
                <input type="password" placeholder='Ingresa tu Antigua Contraseña' required />
                <FaLock className='icon' color='black'/>
            </div>
            <div className='input-box2'>
                <input type="password" placeholder='Ingresa tu Nueva Contraseña' required />
                <FaLock className='icon' color='black'/>
            </div>
            <div className='input-box2'>
                <input type="password" placeholder='Confirma tu Nueva Contraseña' required />
                <FaLock className='icon' color='black'/>
            </div>
            <div className='buttons-user-profile'>
                <a className="delete-account" href="/login">
                    <button type='submit' onClick={() => setModalIsOpen(true)}>ELIMINAR MI CUENTA</button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            contentLabel="Confirmación"
                            style={customStyles}
                        >
                            <div className='raaa'>
                                <h1 className='raaaa'>¿Estás seguro de querer eliminar tu cuenta?</h1>
                                <div className='buttons-ar'>
                                    <button className="raaaaa-confirm" onClick={handleConfirm}>Confirmar</button>
                                    <button className="raaaaa-cancel" onClick={handleCancel}>Cancelar</button>
                                </div>
                            </div>
                        </Modal>
                </a>
                <a className="save-changes-account" href="/login">
                    <button type='submit'>GUARDAR CAMBIOS</button>
                </a>
            </div>
            
        </form>
      
    </div>
    </div>
  )
}

export default EditUserProfile
