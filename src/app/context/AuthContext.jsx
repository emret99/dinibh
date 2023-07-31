import { createContext, useContext, useState } from "react";

 
 const Context = createContext({
 });



export function AuthProvider ({children}){
    
    const [user,setUser]= useState({});
    return(
        <Context.Provider value={{user,setUser}}>
            {children}
        </Context.Provider>

    )
}

export const useAuth = ()=>useContext(Context);



