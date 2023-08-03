
import { Button, TextField,Alert,Box, Typography } from "@mui/material";
import '@fontsource/roboto/500.css';
import { useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
function Login() { 
  
  
  const navigate = useNavigate()
  const [tckn,setTckn]=useState('')
  const [password,setPassword]=useState('')
  const {user,setUser}= useAuth()
  const [err,setErr] = useState(false)
  const [signal,setSignal] = useState(false)
  
useEffect(()=>{
  
    if (signal) {
 
      axios(
        {method:"POST",
        url: "http://213.254.134.145:6161/api/GetToken",
        headers:{},
        data:{SicilNo:tckn,Password:password,DeviceId:"123"}
        })
      .then(res=>{
        if (res.data.StatusCode===200) {
          sessionStorage.setItem('REFRESH_TOKEN',res.data.RefreshToken)
          sessionStorage.setItem('USER_TOKEN',res.data.Token)
          sessionStorage.setItem('USER_TCKN',tckn)
          sessionStorage.setItem('USER_NAME',res.data.Data.SicilInfo.ADI+" "+res.data.Data.SicilInfo.SOYADI)
          sessionStorage.setItem('USER_EMAIL',res.data.Data.SicilInfo.EMAIL)
          
          setUser({
            tckn:tckn,
            userToken:sessionStorage.getItem('USER_TOKEN'),
          }) 
        navigate("/")
       }
      }
      ).catch((error)=>{
        console.log(error)
        setErr(true)
      }).finally(()=>{
        setSignal(false)
      })
      
    }
})


  
  return (
    <Box sx={{
      textAlign:"center",
      width:{xs:"65%",sm:"40%"},
      backgroundColor:"#ecf0f1",
      padding:"3rem 1.5rem",
      borderRadius:"12px",
      
      
       }}>
        
        <Box  >
            <Typography sx={{fontSize:"2rem"}}>Kullanıcı Girişi</Typography>
        </Box>
        <Box sx={{
          display:"flex",
          flexDirection:"column",
          gap:"2rem 0px"
          }}>
        <TextField itemID="tckn" error={err} value={tckn} onChange={e=>setTckn(e.target.value)} id="outlined-controlled" label="TC Kimlik-Sicil No" variant="outlined" />
        <TextField itemID="password" error={err} value={password} onChange={e=>setPassword(e.target.value)} id="outlined-controlled" label="Şifre" variant="outlined"  />
        

        </Box>
        <Box sx={{marginTop:"1rem",display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},gap:{xs:"1rem"},justifyContent:"space-evenly",marginBottom:"0.5rem"}}>
          <Button  onClick={()=>setSignal(true)} variant="outlined">Giriş Yap</Button>
          <Button  onClick={()=>navigate('/sifremiunuttum')} variant="text">Şifremi Unuttum</Button>
        </Box>
        {err && <Alert severity="error">TC Kimlik-Sicil No veya Şifre Hatalı</Alert>}

       
    </Box>
  )
}

export default Login