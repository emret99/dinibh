import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./app/layout/GuestLayout";
import DefaultLayout from "./app/layout/DefaultLayout";
import Home from "./app/pages/Home";
import Login from "./app/pages/Login"
import Error404 from "./app/pages/Error404";
import Gecisler from "./app/pages/Gecisler";
import Mesailer from "./app/pages/Mesailer";
import SifreDegistir from "./app/pages/SifreDegistir";
import Linkler from "./app/pages/Linkler";
import MesaiTakvimi from "./app/pages/MesaiTakvimi";
import QrTara from "./app/pages/QrTara";
import Duyurular from "./app/pages/Duyurular";
import { FirmaKontrol } from "./app/pages/FirmaKontrol";
import SifreUnuttum from "./app/pages/SifreUnuttum";

const router = createBrowserRouter([
    {
        path:"/",
        element: <DefaultLayout/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"gecisler",
                element:<Gecisler/>
            },
            {
                path:"mesailer",
                element:<Mesailer/>
            },
            {
                path:"sifreDegistir",
                element:<SifreDegistir/>
            },
            {
                path:"linkler",
                element:<Linkler/>
            },
            {
                path:"mesaiTakvimi",
                element:<MesaiTakvimi/>
            },
            {
                path:"qrTara",
                element:<QrTara/>

            },
            {
                path:"duyurular",
                element:<Duyurular/>
            },
            
            {
                path:"*",
                element:<Error404/>
            }
            
        ]
    },
    {
        path:"/",
        element:<GuestLayout/>,
        children:[
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"sifremiUnuttum",
                element:<SifreUnuttum/>
            },
            {
                path:"test",
                element:<FirmaKontrol/>
            }
        ]
    },
    {
        path:"/*",
        element:<Error404/>
    }
    

   
   
])

export default router