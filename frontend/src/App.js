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

import { UserProfile } from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";

import { MyPublications } from "./components/MyPublications";
import CreatePublication from "./components/CreatePublicationForm";
import EditPublication from "./components/EditPublicationForm";

import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <div className="">
      <Router>
        <Routes>

          <Route path="*" element={<Login />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/activate-account" element={<ActivateAccount />} />

          <Route path="/enter-email" element={<EnterEmail />} />
          <Route path="/enter-code-recover" element={<EnterCodeRecover />} />
          <Route path="/new_password_from_recover" element={<NewPassword />} />

          <Route path="/main-page" element={<MainPage />} />
          <Route path="/view-publication/:id" element={<ViewPublication />} />

          <Route path="/" element={<ProtectedRoute />}>

            <Route path="/create-publication" element={<CreatePublication />} />
            <Route path="/my-publications-page" element={<MyPublications />} />
            <Route path="/edit-publication" element={<EditPublication />} />

            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/edit-user-profile" element={<EditUserProfile />} />

            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
