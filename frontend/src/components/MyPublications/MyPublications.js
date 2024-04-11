import React, {useState} from "react";
import Logo from "../../images/2.1.png";
import './Header.css';
import './MyPublications.css';

import IMG1 from "../../images/1.png";


export const MyPublications = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
            
            <div className="hello">
                <h1 className="title-my-publications">MIS PUBLICACIONES</h1>
                <a href="/create-publication">
                    <button className="create-new-publication">+</button>
                </a>
            </div>
            <div className="my-publications">
                
                <div className="my-publication">
                    <div className="my-box-publication">
                        <div className="my-publication-image">
                            <img className='image-my-publication' src={IMG1} alt=""/>
                        </div>
                        <div className="info-my-publication">
                            <h1> PLAY2 CHIPEADA </h1>
                            <p> $50.000 </p>
                        </div>
                        <div className="properties-my-publication">
                            <button className="chats-my-publication">
                                Chats
                            </button>
                            <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="PAUSADA">PAUSADA</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                            <a href="/edit-publication">
                                <button className="edit-my-publication">
                                    Editar
                                </button>
                            </a>
                            <button className="delete-my-publication">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-publication">
                    <div className="my-box-publication">
                        <div className="my-publication-image">
                            <img className='image-my-publication' src={IMG1} alt=""/>
                        </div>
                        <div className="info-my-publication">
                            <h1> PLAY2 CHIPEADA </h1>
                            <p> $50.000 </p>
                        </div>
                        <div className="properties-my-publication">
                            <button className="chats-my-publication">
                                Chats
                            </button>
                            <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="PAUSADA">PAUSADA</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                            <a href="/edit-publication">
                                <button className="edit-my-publication">
                                    Editar
                                </button>
                            </a>
                            <button className="delete-my-publication">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-publication">
                    <div className="my-box-publication">
                        <div className="my-publication-image">
                            <img className='image-my-publication' src={IMG1} alt=""/>
                        </div>
                        <div className="info-my-publication">
                            <h1> PLAY2 CHIPEADA </h1>
                            <p> $50.000 </p>
                        </div>
                        <div className="properties-my-publication">
                            <button className="chats-my-publication">
                                Chats
                            </button>
                            <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="PAUSADA">PAUSADA</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                            <a href="/edit-publication">
                                <button className="edit-my-publication">
                                    Editar
                                </button>
                            </a>
                            <button className="delete-my-publication">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-publication">
                    <div className="my-box-publication">
                        <div className="my-publication-image">
                            <img className='image-my-publication' src={IMG1} alt=""/>
                        </div>
                        <div className="info-my-publication">
                            <h1> PLAY2 CHIPEADA </h1>
                            <p> $50.000 </p>
                        </div>
                        <div className="properties-my-publication">
                            <button className="chats-my-publication">
                                Chats
                            </button>
                            <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="PAUSADA">PAUSADA</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                            <a href="/edit-publication">
                                <button className="edit-my-publication">
                                    Editar
                                </button>
                            </a>
                            <button className="delete-my-publication">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-publication">
                    <div className="my-box-publication">
                        <div className="my-publication-image">
                            <img className='image-my-publication' src={IMG1} alt=""/>
                        </div>
                        <div className="info-my-publication">
                            <h1> PLAY2 CHIPEADA </h1>
                            <p> $50.000 </p>
                        </div>
                        <div className="properties-my-publication">
                            <button className="chats-my-publication">
                                Chats
                            </button>
                            <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="PAUSADA">PAUSADA</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                            <a href="/edit-publication">
                                <button className="edit-my-publication">
                                    Editar
                                </button>
                            </a>
                            <button className="delete-my-publication">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-publication">
                    <div className="my-box-publication">
                        <div className="my-publication-image">
                            <img className='image-my-publication' src={IMG1} alt=""/>
                        </div>
                        <div className="info-my-publication">
                            <h1> PLAY2 CHIPEADA </h1>
                            <p> $50.000 </p>
                        </div>
                        <div className="properties-my-publication">
                            <button className="chats-my-publication">
                                Chats
                            </button>
                            <select id="comboBox" value={selectedOption} onChange={handleOptionChange}>
                                <option value="DISPONIBLE">DISPONIBLE</option>
                                <option value="PAUSADA">PAUSADA</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                            <a href="/edit-publication">
                                <button className="edit-my-publication">
                                    Editar
                                </button>
                            </a>
                            <button className="delete-my-publication">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
};