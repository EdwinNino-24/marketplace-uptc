import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from 'axios';

import Login from "./components/LoginForm";

import Register from "./components/RegisterForm";
import ActivateAccount from "./components/ActivateAccount";

import EnterEmail from "./components/EnterEmailForm";
import EnterCodeRecover from "./components/EnterCodeRecover";
import NewPassword from "./components/NewPasswordForm";

import { MainPage } from "./components/MainPage";
import { ViewPublication } from "./components/ViewPublication";
import { SearchPage } from "./components/SearchPage";

import { UserProfile } from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";

import { MyPublications } from "./components/MyPublications";
import CreatePublication from "./components/CreatePublicationForm";
import EditPublication from "./components/EditPublicationForm";

import ProtectedRoute from './components/ProtectedRoute';


function App() {

  const [user, setUser] = useState("Iniciar Sesión");
  const href_user_profile = localStorage.getItem('token') ? '/user-profile' : '/login';
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser("Iniciar Sesión");
      return;
    }
    Axios.post('http://localhost:5000/user_profile', { token: token })
      .then(response => {
        const user = response.data.ID_ACCOUNT;
        setUser(user ? user : "Iniciar Sesión");
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        setUser("Iniciar Sesión");
      });
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/get_categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error:', error))
      .finally();
  }, []);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const handleSubMenuToggleEnter = () => {
    setShowSubMenu(true);
  };
  const handleSubMenuToggleLeave = () => {
    setShowSubMenu(false);
  };

  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/get_locations')
      .then(response => response.json())
      .then(data => setLocations(data))
      .catch(error => console.error('Error:', error));
  }, []);
  const [showLocationsMenu, setShowLocationsMenu] = useState(false);
  const handleLocationsMenuToggleEnter = () => {
    setShowLocationsMenu(true);
  };
  const handleLocationsMenuToggleLeave = () => {
    setShowLocationsMenu(false);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
      window.location.href = `/search_page/${searchTerm}`;
    }
  };
  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/search_page/${searchTerm}`;
    }
  };

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


          <Route path="/main-page" element={<MainPage
            user={user}
            href_user_profile={href_user_profile}
            categories={categories}
            showSubMenu={showSubMenu}
            handleSubMenuToggleEnter={handleSubMenuToggleEnter}
            handleSubMenuToggleLeave={handleSubMenuToggleLeave}
            locations={locations}
            showLocationsMenu={showLocationsMenu}
            handleLocationsMenuToggleEnter={handleLocationsMenuToggleEnter}
            handleLocationsMenuToggleLeave={handleLocationsMenuToggleLeave}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
          />}
          />
          <Route path="/view-publication/:id" element={<ViewPublication
            user={user}
            href_user_profile={href_user_profile}
            categories={categories}
            showSubMenu={showSubMenu}
            handleSubMenuToggleEnter={handleSubMenuToggleEnter}
            handleSubMenuToggleLeave={handleSubMenuToggleLeave}
            locations={locations}
            showLocationsMenu={showLocationsMenu}
            handleLocationsMenuToggleEnter={handleLocationsMenuToggleEnter}
            handleLocationsMenuToggleLeave={handleLocationsMenuToggleLeave}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
          />}
          />
          <Route path='/search_page/:searchTermId' element={<SearchPage
            user={user}
            href_user_profile={href_user_profile}
            categories={categories}
            showSubMenu={showSubMenu}
            handleSubMenuToggleEnter={handleSubMenuToggleEnter}
            handleSubMenuToggleLeave={handleSubMenuToggleLeave}
            locations={locations}
            showLocationsMenu={showLocationsMenu}
            handleLocationsMenuToggleEnter={handleLocationsMenuToggleEnter}
            handleLocationsMenuToggleLeave={handleLocationsMenuToggleLeave}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
          />}
          />

          <Route path="/" element={<ProtectedRoute />}>

            <Route path="/new_password_from_recover" element={<NewPassword />} />

            <Route path="/create-publication" element={<CreatePublication />} />
            <Route path="/my-publications-page" element={<MyPublications
              user={user}
              href_user_profile={href_user_profile}
              categories={categories}
              showSubMenu={showSubMenu}
              handleSubMenuToggleEnter={handleSubMenuToggleEnter}
              handleSubMenuToggleLeave={handleSubMenuToggleLeave}
              locations={locations}
              showLocationsMenu={showLocationsMenu}
              handleLocationsMenuToggleEnter={handleLocationsMenuToggleEnter}
              handleLocationsMenuToggleLeave={handleLocationsMenuToggleLeave}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              handleKeyPress={handleKeyPress}
              handleSearch={handleSearch}
            />}
            />
            <Route path="/edit-publication/:id" element={<EditPublication />} />

            <Route path="/user-profile" element={<UserProfile
              user={user}
              href_user_profile={href_user_profile}
              categories={categories}
              showSubMenu={showSubMenu}
              handleSubMenuToggleEnter={handleSubMenuToggleEnter}
              handleSubMenuToggleLeave={handleSubMenuToggleLeave}
              locations={locations}
              showLocationsMenu={showLocationsMenu}
              handleLocationsMenuToggleEnter={handleLocationsMenuToggleEnter}
              handleLocationsMenuToggleLeave={handleLocationsMenuToggleLeave}
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              handleKeyPress={handleKeyPress}
              handleSearch={handleSearch}
            />}
            />
            <Route path="/edit-user-profile" element={<EditUserProfile />} />

          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
