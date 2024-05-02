import { TextField,Button,Box, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom/dist';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function SifreUnuttum() {
    const [signal,setSignal] = useState(false)
    const [tckn,setTckn] = useState('')
    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(()=>{
        if (signal) {
            axios({
                method:"POST",
                url:apiUrl+"/api/ForgotPassword",
                headers:{
                    Token:sessionStorage.getItem('USER_TOKEN')
                },
                data:{
                    SicilNo:tckn
                    }
            }).then(res=>console.log(res)).catch((error)=>{
                console.log(error)
            })
            
        }

    },[signal])
  return (
    <Box sx={{
      textAlign:"center",
      width:"40%",
      backgroundColor:"#ecf0f1",
      padding:"3rem 2rem",
      display:"flex",
      flexDirection:"column",
      borderRadius:"12px",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",     
      gap:"20px 0px",
      position:"fixed"        
       }}> 
        <Button sx={{position:"absolute",top:"0.5rem",left:"0.5rem",padding:"1rem",borderRadius:"1rem"}} onClick={()=>navigate(-1)}><ArrowBackIcon/></Button>      
        <Box>
            <Typography style={{fontFamily:"sans-serif"}}>Şifremi Unuttum</Typography>
        </Box>
        <Box style={{width:"100%"}}>
            <TextField sx={{width:"100%"}} value={tckn} onChange={(e)=>setTckn(e.target.value)} id="outlined-basic" label="TC Kimlik-Sicil No" variant="outlined" />
        </Box>
        <Box style={{textAlign:"start"}}>
            <Button onClick={()=>setSignal(true)} variant="outlined">Gönder</Button>
        </Box>
    </Box>  
    )
}

export default SifreUnuttum