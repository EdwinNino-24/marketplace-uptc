import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'boxicons';

import Login from "./components/LoginForm/LoginForm";
import Register from "./components/RegisterForm/RegisterForm";
import ActivateAccount from "./components/ActivateAccount/ActivateAccount";
import EnterEmail from "./components/RecoverPassword/EnterEmailForm/EnterEmailForm";
import EnterCodeRecover from "./components/RecoverPassword/EnterCodeRecoverForm/EnterCodeRecoverForm";
import NewPassword from "./components/RecoverPassword/NewPasswordForm/NewPasswordForm";

import Chat from "./components/Chats/ChatApp";

import { MainPage } from "./components/MainPage/MainPage";
import { ProductsPage } from "./components/ProductsPage/ProductsPage";
import { ServicesPage } from "./components/ServicesPage/ServicesPage";

import { UserProfile } from "./components/UserProfile/UserProfile";
import EditUserProfile from "./components/EditUserProfile/EditUserProfile";
import { MyPublications } from "./components/MyPublications/MyPublications";

import { ViewPublication } from "./components/ViewPublication/ViewPublication";
import { PublicationsPage } from "./components/PublicationsPage/PublicationsPage";


import ImageSlider from './components/ImageSlider/ImageSlider';
import ImageUploader from "./components/ImageUploader/ImageUploader";
import CreatePublication from "./components/CreatePublicationForm/CreatePublicationForm";
import EditPublication from "./components/EditPublicationForm/EditPublicationForm";


import Modal from 'react-modal';

//import { Banner } from "./components/Banner";
//import { ListOfProducts} from "./components/Products";

//import { UserProfile } from "./components/UserProfile/UserProfile";



/*
import { Header } from "./components/Header";
import { Banner } from "./components/Banner";
import { ListOfProducts} from "./components/Products";
import RecoverPasswordForm from "./components/RecoverPasswordForm/RecoverPasswordForm";
*/

import Axios from "axios";

function App() {

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/main-page" element={<MainPage/>}/>
          <Route path="/products-page" element={<ProductsPage/>}/>
          <Route path="/services-page" element={<ServicesPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/activate-account" element={<ActivateAccount/>}/>
          <Route path="/enter-email" element={<EnterEmail/>}/>
          <Route path="/enter-code-recover" element={<EnterCodeRecover/>}/>
          <Route path="/user-profile" element={<UserProfile/>}/>
          <Route path="/edit-user-profile" element={<EditUserProfile/>}/>
          <Route path="/my-publications-page" element={<MyPublications/>}/>
          <Route path="/view-publication" element={<ViewPublication/>}/>
          <Route path="/publications-page" element={<PublicationsPage/>}/>
          <Route path="/create-publication" element={<CreatePublication/>}/>
          <Route path="/edit-publication" element={<EditPublication/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
