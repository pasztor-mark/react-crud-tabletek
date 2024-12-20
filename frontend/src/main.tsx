import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import TabletLista from './components/Tabletek/TabletLista';
import TabletFelvetel from './components/Tabletek/TabletFelvetel';

import Navigacio from './components/NavigacioMenu';
import TabletTorles from './components/Tabletek/TabletTorles';
import Home from './components/Tabletek/Home';
import KiemeltTablet from './components/KiemeltTablet';
import UpdateTablet from './components/Tabletek/UpdateTablet';
import Pagination from './components/Tabletek/Pagination';
import Minden from './components/Tabletek/Minden';

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
    path: "/tabletek/:id",
    element: <KiemeltTablet />,
  },
  {
    path: "/tabletekdelete",
    element: <TabletTorles />,
  },
  
  {
    path: "/updateTablet",
    element: <UpdateTablet />,
  },
  {
    path: "/oldallista",
    element: <Pagination />,
  },
  {
    path: "/tabletekfullcrud",
    element: <Minden />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navigacio/>
    <main className='w-[90vw] mx-auto mt-10' >

    <RouterProvider router={router}></RouterProvider>
    </main>
  </StrictMode>,
)
