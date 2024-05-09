import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import '../styles/Header.css';


const Navigation = ({ categories, handleSubMenuToggleEnter, handleSubMenuToggleLeave, showSubMenu,
    locations, showLocationsMenu, handleLocationsMenuToggleEnter, handleLocationsMenuToggleLeave, 
    searchTerm, handleSearchChange, handleKeyPress, handleSearch }) => {
    return (
        <nav className="mainnav">
            <div className="left_header_bottom">
                <ul className="plataform_options">
                    <li onMouseEnter={handleSubMenuToggleEnter} onMouseLeave={handleSubMenuToggleLeave}>
                        <p className="plataform_option">{"Categorías >"}</p>
                        {showSubMenu && (
                            <ul className="submenu">
                                {categories.map((category) => (
                                    <a key={category.ID_CATEGORY} href={`/search_page/${category.NAME_CATEGORY}`}>
                                        <li>{category.NAME_CATEGORY}</li>
                                    </a>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li onMouseEnter={handleLocationsMenuToggleEnter} onMouseLeave={handleLocationsMenuToggleLeave}>
                        <p className="plataform_option">{"Sedes / Seccionales >"}</p>
                        {showLocationsMenu && (
                            <ul className="submenu">
                                {locations.map((location) => (
                                    <a key={location.ID_LOCATION} href={`/search_page/${location.NAME_LOCATION}`}>
                                        <li>{location.NAME_LOCATION}</li>
                                    </a>
                                ))}
                            </ul>
                        )}
                    </li>
                    <a href="/search_page/producto" className="plataform_option"><li>Productos</li></a>
                    <a href="/search_page/servicio" className="plataform_option"><li>Servicios</li></a>
                </ul>
            </div>
            <div className="right_header_bottom">
                <ul className="module_search">
                    <li>
                        <input className="input_search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Haz una Búsqueda..." onKeyPress={handleKeyPress}></input>
                        <label className="icon_glass" onClick={handleSearch}><FaMagnifyingGlass color="#F7C600" size="1.3rem" /></label>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
