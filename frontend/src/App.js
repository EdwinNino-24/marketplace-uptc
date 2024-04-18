import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/LoginForm";

import Register from "./components/RegisterForm";
import ActivateAccount from "./components/ActivateAccount";

import EnterEmail from "./components/EnterEmailForm";
import EnterCodeRecover from "./components/EnterCodeRecover";
import NewPassword from "./components/NewPasswordForm";

import { MainPage } from "./components/MainPage";
import { ViewPublication } from "./components/ViewPublication";
import { PublicationsPage } from "./components/PublicationsPage";
import { ProductsPage } from "./components/ProductsPage";
import { ServicesPage } from "./components/ServicesPage";

import { UserProfile } from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";

import { MyPublications } from "./components/MyPublications";
import CreatePublication from "./components/CreatePublicationForm";
import EditPublication from "./components/EditPublicationForm";


function App() {

  return (
    <div className="">
      <Router>
        <Routes>

          <Route path="/login" element={<Login/>}/>

          <Route path="/register" element={<Register/>}/>
          <Route path="/activate-account" element={<ActivateAccount/>}/>
          
          <Route path="/enter-email" element={<EnterEmail/>}/>
          <Route path="/enter-code-recover" element={<EnterCodeRecover/>}/>
          <Route path="/new_password_from_recover" element={<NewPassword/>}/>

          <Route path="/main-page" element={<MainPage/>}/>
          <Route path="/products-page" element={<ProductsPage/>}/>
          <Route path="/services-page" element={<ServicesPage/>}/>

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
