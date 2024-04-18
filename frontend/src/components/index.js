import React from "react";
import IMG from "../../images/img01.jpg";
import './Products.css';

export const ListOfProducts = () => {
    return (
        <>
            <h1 className="title">PRODUCTOS</h1>
            <div className="products">
                <div className="product">
                    <a href="#">
                        <div className="product_img">
                            <img src={IMG} alt=""/>
                        </div>
                    </a>    
                    <div className="product_footer">
                        <h1> Title </h1>
                        <p> Categoría </p>
                        <p className="price">$3,99</p>
                    </div>
                    <div className="button">
                        <div>
                            <a href="#" className="btn">
                                Más Información
                            </a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product_img">
                            <img src={IMG} alt=""/>
                        </div>
                    </a>    
                    <div className="product_footer">
                        <h1> Title </h1>
                        <p> Categoría </p>
                        <p className="price">$3,99</p>
                    </div>
                    <div className="button">
                        <div>
                            <a href="#" className="btn">
                                Más Información
                            </a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product_img">
                            <img src={IMG} alt=""/>
                        </div>
                    </a>    
                    <div className="product_footer">
                        <h1> Title </h1>
                        <p> Categoría </p>
                        <p className="price">$3,99</p>
                    </div>
                    <div className="button">
                        <div>
                            <a href="#" className="btn">
                                Más Información
                            </a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product_img">
                            <img src={IMG} alt=""/>
                        </div>
                    </a>    
                    <div className="product_footer">
                        <h1> Title </h1>
                        <p> Categoría </p>
                        <p className="price">$3,99</p>
                    </div>
                    <div className="button">
                        <div>
                            <a href="#" className="btn">
                                Más Información
                            </a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product_img">
                            <img src={IMG} alt=""/>
                        </div>
                    </a>    
                    <div className="product_footer">
                        <h1> Title </h1>
                        <p> Categoría </p>
                        <p className="price">$3,99</p>
                    </div>
                    <div className="button">
                        <div>
                            <a href="#" className="btn">
                                Más Información
                            </a>
                        </div>
                    </div>
                </div>
                <div className="product">
                    <a href="#">
                        <div className="product_img">
                            <img src={IMG} alt=""/>
                        </div>
                    </a>    
                    <div className="product_footer">
                        <h1> Title </h1>
                        <p> Categoría </p>
                        <p className="price">$3,99</p>
                    </div>
                    <div className="button">
                        <div>
                            <a href="#" className="btn">
                                Más Información
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};