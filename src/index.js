import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import './index.css';
import App from './App';

// localStorage.setItem('userId', '');

const router = createBrowserRouter([
  {
    path: "",
    element: localStorage.getItem('userId') !== '' ? <App /> : <Navigate to="/authorization" />,
  },
  {
    path: "/",
    element: localStorage.getItem('userId') !== '' ? <App /> : <Navigate to="/authorization" />,
  },
  {
    path: "/authorization",
    element: localStorage.getItem('userId') === '' ? <App /> : <Navigate to="/" />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);