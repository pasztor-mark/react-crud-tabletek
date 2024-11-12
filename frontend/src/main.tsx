import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
// npm install react-router-dom
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TelefonLista from './components/Telefonok/TelefonLista';
import TelefonFelvetel from './components/Telefonok/TelefonFelvetel';
import TelefonTorles from './components/Telefonok/TelefonTorles';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TelefonLista />,
  },
  {
    path: "/telefonlista",
    element: <TelefonLista />,
  },
  {
    path: "/telefonfelvetel",
    element: <TelefonFelvetel />,
  },
  {
    path: "/telefontorles",
    element: <TelefonTorles />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
