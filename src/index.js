import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/context/AuthContext";
import router from "./router";
import  ReactDOM  from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthProvider>
      <RouterProvider router={router}/>
  </AuthProvider>
);

