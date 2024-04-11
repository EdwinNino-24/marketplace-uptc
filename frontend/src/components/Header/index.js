import React from "react";
import Logo from "../../images/2.1.png";
import './Header.css';


export const Header = () => {
    return (
        <div className="ramirez">
            <header>
            <a href="#">
                    <div className="logo">
                        <img src={Logo} alt="logo" width="150"/>
                    </div>
                </a>
                <ul>
                    <li>
                        <a href="#">INICIO</a>
                    </li>
                    <li>
                        <a href="#">PRODUCTOS</a>
                    </li>
                    <li>
                        <a href="#">SERVICIOS</a>
                    </li>
                    <li>
                        <a href="#">VENDER</a>
                    </li>
                </ul>
                <div className="login">
                    <box-icon name='user-pin' size="5rem" type='solid' color='#f6c700' ></box-icon>
                </div>
                <nav className="mainnav">
                    <ul>
                        <li>
                            <a className="cat" href="#">CATEGORÍAS</a>
                        </li>
                        <li>
                            <a href="#">Ropa</a>
                        </li>
                        <li>
                            <a href="#">Tecnología</a>
                        </li>
                        <li>
                            <a href="#">Accesorios</a>
                        </li>
                        <li>
                            <a href="#">Tutorías</a>
                        </li>
                        <li>
                            <a href="#">Comida</a>
                        </li>
                        <li>
                            <a href="#">Otros</a>
                        </li>
                    </ul>
                </nav>
        </header>
        </div>
    )
}