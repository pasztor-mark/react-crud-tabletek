import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import TabletLista from './components/Tabletek/TabletLista';
import TabletFelvetel from './components/Tabletek/TabletFelvetel';

import Navigacio from './components/NavigacioMenu';
import TabletTorles from './components/Tabletek/TabletTorles';
import Home from './components/Tabletek/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/tabletek",
    element: <TabletLista />,
  },
  {
    path: "/tabletekadd",
    element: <TabletFelvetel />,
  },
  {
    path: "/tabletekdelete",
    element: <TabletTorles />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navigacio/>
    <main className='w-[90vw] mx-auto mt-10' >

    <RouterProvider router={router}></RouterProvider>
    </main>
  </StrictMode>,
)
