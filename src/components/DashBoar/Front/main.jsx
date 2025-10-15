import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Todos_Usuarios from './Componentes/Todos_Usuarios.jsx'

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App/>
  },
  { 
    path: '/usuarios',
    element: <Todos_Usuarios/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)
