import React from 'react';
import ReactDOM from 'react-dom';
import Employee from './components/Employee';
import EmployeeDetails from './components/EmployeeDetails';
import './index.css';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Employee />,
  },
  {
    path: '/employee/:id',
    element: <EmployeeDetails />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
