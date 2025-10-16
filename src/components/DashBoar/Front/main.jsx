import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Todas_Ordenes from './Componentes/Todas_Ordenes.jsx'
import Detalles_Ordenes from './Componentes/Detalles_Ordenes.jsx'
import Detalles_Usuarios from './Componentes/Detalles_Usuarios.jsx'
import Usuarios from './Componentes/Usuarios.jsx'

const router = createBrowserRouter ([
  {
    path: '/',
    element: <App/>
  },
  { 
    path: '/usuarios',
    element: <Usuarios/>
  },
  {
    path: '/ordenes',
    element: <Todas_Ordenes/>
  },
  {
    path: '/detalles_Orden',
    element: <Detalles_Ordenes/>
  },
  {
    path: '/detalles_Usuario/:id',
    element: <Detalles_Usuarios/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)
