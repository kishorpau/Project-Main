import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Calender from './pages/Calender';
import Notification from './pages/Notification';
import SendSms from './pages/SendSms';
import SmsHistory from './pages/SmsHistory';
import Tools from './pages/Tools';


const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/Dashboard',
    element:<Dashboard/>
  },
  {
    path:'/Calender',
    element:<Calender/>
  },
  {
    path:'/Analytics',
    element:<Analytics/>
  },
  {
    path:'/Tools',
    element:<Tools/>
  },
  {
    path:'/Notification',
    element:<Notification/>
  },
  {
    path:'/SendSms',
    element:<SendSms/>
  },
  {
    path:'/SmsHistory',
    element:<SmsHistory/>
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
