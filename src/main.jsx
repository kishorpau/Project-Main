import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";

import Dashboard from './pages/Dashboard.jsx';
import Tools from './pages/Tools.jsx';
import SendSms from './pages/SendSms.jsx';
import Analytics from './pages/Analytics.jsx';
import SmsHistory from './pages/SmsHistory.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
const baseUrl="project-main-eosin.vercel.app"
const router=createBrowserRouter([
  {
    path:'/',
    element:<div>Hello mate</div>
  },
  {
    path:`${baseUrl}/dashboard`,
    element:<Dashboard/>
  },
  {
    path:'/analytics',
    element:<Analytics/>
  },
  {
    path:'/sendsms',
    element:<SendSms/>
  },
  {
    path:'/smshistory',
    element:<SmsHistory/>
  },
  {
    path:'/tools',
    element:<Tools/>
  },
  {
    path:'*',
    element:<PageNotFound/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
