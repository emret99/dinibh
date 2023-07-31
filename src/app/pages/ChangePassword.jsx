import React, {  useEffect, useState } from 'react'
import { Button,TextField } from '@mui/material'
import {Alert} from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Grid,Typography} from "@mui/material"



function ChangePassword() {
const navigate = useNavigate()
const [newPw,setNewPw] = useState('')
const [oldPw,setOldPw] = useState('')
const [signal,setSignal] = useState(false)
const [response,setResponse]= useState()
const [err,setErr]= useState(false)
useEffect(()=>{
  if (signal) {
    
      axios({
        method:"POST",
        url:"http://213.254.134.145:6161/api/ChangePassword",
        data:{
          OldPassword:oldPw,
          NewPassword:newPw
        },
        headers:{
          Token:localStorage.getItem('USER_TOKEN')
        }
           
      }).then(res=>{
        if (res.status===200) {
          setResponse(res)
          setNewPw('')
          setOldPw('')
          setErr(false)
          res.data.Token && localStorage.setItem('USER_TOKEN',res.data.Token)
          setSignal(false)
          setTimeout(() => {
            navigate('/')
            
          }, 1500);
        }
        else{
          console.log("şifre yanlış")

        }
        

      }).catch((error)=>{
        console.log(error)
        setErr(true)
        setNewPw('')
        setOldPw('')
        setSignal(false)


      })
      
    
   
  }

 
},[signal])


  return (

  <Grid sx={{marginTop:"3rem",}} container spacing={4}>
    <Grid sx={{display:"flex",alignItems:"center",justifyContent:"end"}} item xs={6}>
        <Typography >Eski Şifre :</Typography>
    </Grid>
    <Grid item xs={6}>
      <TextField value={oldPw} onChange={e=>setOldPw(e.target.value)} id="outlined-basic" variant="outlined"  />      
    </Grid> 
    <Grid sx={{display:"flex",alignItems:"center",justifyContent:"end"}} item xs={6}>
        <Typography >Yeni Şifre:</Typography>
    </Grid>
    <Grid item xs={6}>
      <TextField value={newPw} onChange={e=>setNewPw(e.target.value)} id="outlined-basic"  variant="outlined" />  
    </Grid>
    <Grid item xs={12} sx={{textAlign:"center"}}>
      <Button sx={{width:"10rem",margin:"0 auto"}} variant="contained" onClick={()=>setSignal(true)}> Değiştir </Button>
    </Grid>
    <Grid item xs={12} sx={{textAlign:"center"}}>
      {response ? <Alert sx={{textAlign:"center"}} severity={"success"}>{response.data.InfoMessage}</Alert> : null}
      {err ? <Alert sx={{textAlign:"center"}} severity={"error"}>Kullanıcı Bilgileri Hatalı</Alert> : null}
    </Grid>
  </Grid> 
   

  )
}

export default ChangePassword