import React from 'react';
import ReactDOM from 'react-dom';
import Userlist from './components/Userlist';
import UserDetailsPage from './components/UserDetailsPage';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Userlist /></div>,
  },
  {
    path: "/user/:userId",
    element: <UserDetailsPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);