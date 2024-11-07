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
import Dashboard from './components/Dashboard';
import ProductList from './components/ListProduct';
import AddProduct from './components/AddProduct';
import CreateCategory from './components/CreateCategory';
import InvoiceList from './components/InvoiceList';
import UserAccountManagement from './components/UserManagement';
import AdminDashboard from './Account/AdminDashboard';
import Login from './Account/Login';
import NavigateLogin from './components/navigate-login';
import HomeMusic from './Music/home';
import Guitar from './Music/guitar';
import Piano from './Music/piano';
import Violin from './Music/violin';
import Accessory from './Music/accessory';
import MoMoPayment from './components/momo-payment';
import Order from './Account/your-order';
import Admin from './Music/admin';
import Feedback from './Account/Feedback';
import MemoryGame from './components/Game';
import PaypalButton from './components/PaypalButton';
// import { BrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "navigation",
    element: <NavigateLogin />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
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
    path: "feedback",
    element: <Feedback />,
  },
  {
    path: "mini-game",
    element: <MemoryGame />,
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
    path: "order",
    element: <Order />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "listproduct",
    element: <ProductList />,
  },
  {
    path: "addproduct",
    element: <AddProduct />,
  },
  {
    path: "addcategory",
    element: <CreateCategory />,
  },
  {
    path: "invoice",
    element: <InvoiceList />,
  },
  {
    path: "momo",
    element: <MoMoPayment />,
  },
  {
    path: "paypal",
    element: <PaypalButton />,
  },
  {
    path: "admin",
    element: <AdminDashboard />,
  },
  {
    path: "musical-instrument",
    element: <HomeMusic />,
  },
  {
    path: "guitar",
    element: <Guitar />
  },
  {
    path: "piano",
    element: <Piano />
  },
  {
    path: "violin",
    element: <Violin />
  },
  {
    path: "accessory",
    element: <Accessory />
  },
  {
    path: "dashboard",
    element: <Admin />
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
