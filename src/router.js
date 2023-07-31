import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./app/layout/GuestLayout";
import DefaultLayout from "./app/layout/DefaultLayout";
import ForgotPassword from "./app/pages/ForgotPassword";
import Home from "./app/pages/Home";
import Login from "./app/pages/Login"
import Error404 from "./app/pages/Error404";
import MyPasses from "./app/pages/MyPasses";
import MyShifts from "./app/pages/MyShifts";
import ChangePassword from "./app/pages/ChangePassword";
import Links from "./app/pages/Links";
import ViewShifts from "./app/pages/ViewShifts";
import ScanQrCode from "./app/pages/ScanQrCode";
import Notifications from "./app/pages/Notifications";
import Instascan from "./app/pages/Instascan";


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
                path:"mypasses",
                element:<MyPasses/>
            },
            {
                path:"myshifts",
                element:<MyShifts/>
            },
            {
                path:"changepassword",
                element:<ChangePassword/>
            },
            {
                path:"links",
                element:<Links/>
            },
            {
                path:"viewshifts",
                element:<ViewShifts/>
            },
            {
                path:"scanqrcode",
                element:<ScanQrCode/>

            },
            {
                path:"notifications",
                element:<Notifications/>
            },
            {
                path:"instascan",
                element:<Instascan/>
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
                path:"forgotpassword",
                element:<ForgotPassword/>
            }
        ]
    },
    {
        path:"/*",
        element:<Error404/>
    }
    

   
   
])

export default router