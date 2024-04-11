import React, { useState } from 'react';
import Logo from "../../images/2.1.png";
import './Header.css';
import './ChatApp.css';

function ChatApp() {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Ejecuta la acción aquí
      window.location.href = '/publications-page';
      console.log('Se presionó Enter');
    }
  };

  const handleKeyPressSend = (event) => {
    if (event.key === 'Enter') {
      // Ejecuta la acción aquí
      handleSendMessage();
      console.log('Se presionó Enter');
    }
  };

  const [chats, setChats] = useState([
    { id: 1, name: 'Play2 Chipeada', messages: [] },
    { id: 2, name: 'Inglés IZI', messages: [] },
    { id: 3, name: ':V', messages: [] },
    { id: 4, name: 'Play2 Chipeada', messages: [] },
    { id: 5, name: 'Inglés IZI', messages: [] },
    { id: 6, name: ':V', messages: [] },
  ]);
  const [currentChat, setCurrentChat] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleChatSelection = (chat) => {
    setCurrentChat(chat);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '' && currentChat) {
      const updatedChats = chats.map(chat =>
        chat.id === currentChat.id ? { ...chat, messages: [...chat.messages, inputValue] } : chat
      );
      setChats(updatedChats);
      setCurrentChat(updatedChats.find(chat => chat.id === currentChat.id)); // Actualizar currentChat con el chat actualizado
      setInputValue('');
    }
  };

  return (
    <div className='ramirez'>
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
            <div className='big-box'>
              <div className='chats-module'>
                <div className="header-chats">
                  <h1>Chats</h1>
                  <input placeholder=' Busca un chat...'></input>
                </div>
                <div className='chats'>
                  <ul>
                    {chats.map(chat => (
                      <li key={chat.id} onClick={() => handleChatSelection(chat)}>
                        {chat.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='chat'>
                {currentChat ? (
                  <div className='oli'>
                    <h1>{currentChat.name}</h1>
                    <div className='messages-text'>
                      {currentChat.messages.map((message, index) => (
                        <div className="message-chat" key={index}>{message}</div>
                      ))}
                    </div>
                    <div className='oilo'>
                      <input className="input-chat" placeholder=' Escribe un mensaje...' type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPressSend}/>
                      <button className="send-chat" onClick={handleSendMessage}> <box-icon size="2rem" name='send' color='#b49c0c' ></box-icon> </button>
                    </div>
                  </div>
                ) : (
                  <div className='ras'>
                    <p>Selecciona un chat para comenzar a chatear</p>
                  </div>
                )}
              </div>
            </div>
    </div>
  );
}

export default ChatApp;
