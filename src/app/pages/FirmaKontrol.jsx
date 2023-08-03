import { Button, TextField,Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


export  function FirmaKontrol () {
  const [signal,setSignal]= useState(false)

  useEffect(()=>{

    if (signal) {

      //API ile host bilgileri alımı ve localStorage 'a kayıdı
       axios({
        method:"GET",
        url:"http://5.253.141.203:6262/api/Firmalars/DNC,123",
      }).then(res=>{
        console.log(res)
      }) 
      
    }



  },[signal])
  return(

        
        <>

          

          <Box sx={{
                textAlign:"center",
                width:{xs:"60%",md:"40%"},
                backgroundColor:"#ecf0f1",
                padding:"3rem 2rem",
                display:"flex",
                flexDirection:"column",
                borderRadius:"12px",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",     
                gap:"20px 0px",
                position:"fixed"        
                }}> 
                <Box>
                    <Typography fontWeight={700} sx={{fontFamily:"sans-serif"}}>Firma Kayıt</Typography>
                </Box>
                <Box sx={{width:"100%",display:"flex",flexDirection:"column",gap:"1rem"}}>
                    <TextField sx={{width:"100%"}}  id="outlined-basic" label="Firma Kodu" variant="outlined" />
                    <TextField sx={{width:"100%"}}  id="outlined-basic" label="Firma Şifresi" variant="outlined" />
                </Box>
                <Box sx={{}}>
                    <Button onClick={()=>{setSignal(true)}}  variant="outlined">Giriş</Button>
                </Box>
            </Box>  

          </>
                    
       
    )

    
}
