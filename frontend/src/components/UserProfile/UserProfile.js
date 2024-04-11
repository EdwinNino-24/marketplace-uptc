import React from "react";
import Logo from "../../images/2.1.png";
import './Header.css';
import IMG from "../../images/3.jpeg";
import IMG1 from "../../images/4.jpeg";
import IMG2 from "../../images/img01.jpg";
import './UserProfile.css';


export const UserProfile = () => {

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          // Ejecuta la acción aquí
          window.location.href = '/publications-page';
          console.log('Se presionó Enter');
        }
    };

    return (
        <div className="ramirez">
            
            <header className="sis">
                <a href="/main-page">
                    <div className="logo">
                        <img src={Logo} alt="logo" width="150"/>
                    </div>
                </a>
                <ul>
                    <li>
                        <a href="/main-page">INICIO</a>
                    </li>
                    <li>
                        <a href="/products-page">PRODUCTOS</a>
                    </li>
                    <li>
                        <a href="/services-page">SERVICIOS</a>
                    </li>
                    <li>
                        <a href="/create-publication">VENDER</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="/user-profile">
                            <div className="login">
                                <box-icon name='user-pin' size="5rem" type='solid' color='#f6c700' ></box-icon>
                                <p className="rrr">Juan José</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <nav className="mainnav">
                    <ul>
                        <li>
                            <a className="categories">CATEGORÍAS</a>
                        </li>
                        <li>
                            <a href="/publications-page">Ropa</a>
                        </li>
                        <li>
                            <a href="/publications-page">Tecnología</a>
                        </li>
                        <li>
                            <a href="/publications-page">Accesorios</a>
                        </li>
                        <li>
                            <a href="/publications-page">Tutorías</a>
                        </li>
                        <li>
                            <a href="/publications-page">Comida</a>
                        </li>
                        <li>
                            <a className='melo' href="/publications-page">Otros</a>
                        </li>
                        <li>
                            <input className="ram" placeholder=" Haz una Búsqueda..." onKeyPress={handleKeyPress}></input>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <h1 className="title-user-profile">MI PERFIL</h1>
            <div className="settings">
                <div className="setting">
                    <div className="product_img">
                        <box-icon size="13rem" name='data'></box-icon>
                    </div>
                    <div className="general-footer">
                        <h1> Mi Cuenta </h1>
                        <p> Tus Datos Personales </p>
                    </div>
                    <div className="button-more-information">
                        <a href="/edit-user-profile">
                            <button>
                                Editar
                            </button>
                        </a>
                    </div>
                </div>
                <div className="setting">
                    <div className="product_img">
                        <box-icon size="13rem" name='cross-hair'></box-icon>
                    </div>
                    <div className="general-footer">
                        <h1> Mis Publicaciones </h1>
                        <p> Posibles Ventas </p>
                    </div>
                    <div className="button-more-information">
                        <a href="/my-publications-page">
                            <button>
                                Ver Más
                            </button>
                        </a>
                    </div>
                </div>
                <div className="setting">
                    <div className="product_img">
                        <box-icon size="13rem" name='chat'></box-icon>
                    </div>
                    <div className="general-footer">
                        <h1> Mis Chats </h1>
                        <p> Posibles Compras </p>
                    </div>
                    <div className="button-more-information">
                        <a href="/edit-user-profile">
                            <button>
                                Chatear
                            </button>
                        </a>
                    </div>
                </div>
                <div className="setting">
                    <div className="product_img">
                        <box-icon size="13rem" name='log-out'></box-icon>
                    </div>
                    <div className="general-footer">
                        <h1> Cerrar Sesión </h1>
                        <p> Hasta Luego </p>
                    </div>
                    <div className="button-more-information">
                        <a href="/login">
                            <button>
                                Salir
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
};