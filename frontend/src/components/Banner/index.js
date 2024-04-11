import React from "react";
import './Banner.css';
import IMG from "../../images/3.jpeg";
import IMG1 from "../../images/4.jpeg";

export const Banner = () => {
    return (
        <>
            <div className="ramirez">
                <div className="banner">
                    <div className="text_banner">
                        <a className="ad">COMPRA Y VENDE ARTÍCULOS DE SEGUNDA MANO</a>
                    </div>
                    <div className="banner_img">
                        <img src={IMG} alt=""/>
                    </div>
                </div>
                <div className="banner1">
                    <div className="banner_img1">
                        <img src={IMG1} alt=""/>
                    </div>
                    <div className="text_banner1">
                        <a className="ad">CONTACTA CON TUTORES PARA AGENDAR UNA CITA</a>
                    </div>
                </div>
            </div>
        </>
    );
};