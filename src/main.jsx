import React from 'react';
import ReactDOM from 'react-dom';
import Employee from './components/Employee';
import EmployeeDetails from './components/EmployeeDetails';

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><Employee /></div>,
  },
  {
    path:"/employee/:id",
    element: <div><EmployeeDetails /> </div>,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);