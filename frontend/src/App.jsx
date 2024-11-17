import React from 'react';
import './index.css';
import Navbar from './components/shared/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browser from './components/Browser';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import JobSetUp from './components/admin/JobSetUp';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },

  {
    path:'/browser',
    element:<Browser/>
  },

  {
    path:'/description/:id',
    element:<JobDescription/>
  },

  {
    path:'/profile',
    element:<Profile/>
  },

  //for admins  -- all paths starts from here
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><PostJobs/></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoute><Applicants/></ProtectedRoute>
  },
  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path: '/admin/jobs/:id',
    element: <ProtectedRoute><JobSetUp/></ProtectedRoute>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  );
}

export default App;
