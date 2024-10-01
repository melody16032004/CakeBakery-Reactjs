import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Account/Home';
import Shop from './Account/Shop';
import CartPage from './Account/CartPage';
import Product from './Account/product-detail';
import Checkout from './Account/Checkout';
import Menu from './Account/Menu';
import About from './Account/AboutUs';
import Contact from './Account/Contact';
// import { BrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "menu",
    element: <Menu />,
  },
  {
    path: "aboutUs",
    element: <About />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "product-details",
    element: <Product />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
