import { Outlet } from "react-router-dom"

function GuestLayout() {
  return (
    <div style={{
      backgroundColor:"#3498db",
      width:"100vw",
      height:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"}}>

      <Outlet/>
    

    </div>
  )
}

export default GuestLayout