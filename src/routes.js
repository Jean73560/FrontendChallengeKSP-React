import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import CustomerListView from './views/customer/CustomerListView';
import NotFoundView from './views/errors/NotFoundView';



const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: 'employees', element: <CustomerListView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <Navigate to="/employees" />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/employees" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
