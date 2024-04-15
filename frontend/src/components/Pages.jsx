import React from 'react';
import { Link } from "react-router-dom";

const links = [
    {
        name: "Login",
        href: "/login",
    },
    {
        name: "Register",
        href: "/register",
    },
    {
        name: "ActivateAccount",
        href: "/activate-account",
    },
    {
        name: "EnterEmail",
        href: "/enter-email",
    },
    {
        name: "EnterCoderRecover",
        href: "/enter-coder-recover",
    },
    {
        name: "NewPassword",
        href: "/new_password_from_recover",
    },
    {
        name: "Main",
        href: "/main",
    },
    {
        name: "MainPage",
        href: "/main-page",
    },
    {
        name: "ProductsPage",
        href: "/products-page",
    },
    {
        name: "ServicesPage",
        href: "/services-page",
    },
    {
        name: "UserProfile",
        href: "/user-profile",
    },
    {
        name: "EditUserProfile",
        href: "/edit-user-profile",
    },
    {
        name: "MyPublicationsPage",
        href: "/my-publications-page",
    },
    {
        name: "ViewPublication",
        href: "/view-publication",
    },
    {
        name: "CreatePublication",
        href: "/create-publication",
    },
    {
        name: "EditPublication",
        href: "/edit-publication",
    },
    {
        name: "PublicationsPage",
        href: "/publications-page",
    },
];


const Pages = () => {
  return (
    <div>
        {links.map(x => (
            <Link to={x.href}>{x.name}</Link>
        ))}
    </div>
  );
};

export default Pages;
