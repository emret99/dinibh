

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