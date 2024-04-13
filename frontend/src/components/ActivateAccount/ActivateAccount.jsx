import React from 'react';
import './ActivateAccount.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft} from "react-icons/fa";
import { useState } from 'react';

const ActivateAccount = () => {

    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };

    const [numericValue, setNumericValue] = useState('');

    const handleNumericChange = (event) => {
        const value = event.target.value;
        const regex = /^[0-9\b]+$/; 
        if (value === '' || regex.test(value)) {
        setNumericValue(value);
        }
    };

  return (
    <div class="bg_activate_account">
        <header className='header-login'>
            <h2 className='title_login'>MARKETPLACE - UPTC</h2>
        </header>
        <body className='body_activate_account'>
            <div className='wrapper_activate_account'>
                <form action="">
                    <div className='header-register'>
                        <FaArrowAltCircleLeft className='iconBack' color='black' size='50px' onClick={handleBack}/>
                        <h1 className='header-title-register'>Para continuar, ingresa el código<br></br>que hemos enviado a tu correo</h1>
                    </div>
                    <div className='input_code_activation'>
                        <input
                            id="numericInput"
                            className='title-publication'
                            type="text"
                            value={numericValue}
                            onChange={handleNumericChange}
                            placeholder='Ingresa el código'
                        />
                    </div>

                    <a href="/login">
                        <button className='button_active_account' type='submit'>ACTIVAR CUENTA</button>
                    </a>
                    
                </form>
        
            </div>
        </body>
    </div>
  )
}

export default ActivateAccount
