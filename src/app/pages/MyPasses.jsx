import { useState,useEffect } from 'react'
import { Alert, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import qrLogo from '../../assets/qrLogo.png';
import qrlessLogo from '../../assets/qrlessLogo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPasses() {
    const [city,setCity]=useState("")
    const navigate = useNavigate()
    const [data,setData] = useState()
    const [response,setResponse] = useState()
    useEffect(()=>{
        axios({
            method:"GET",
            url:"http://213.254.134.145:6161/api/CihazListesi",
            headers:{
                Token:localStorage.getItem('USER_TOKEN')
            }           
        }).then(res=>{
            
            setData(res.data.Data)
        }).catch(err=>console.log(err))
    },[])




    function getLocation() {
        navigator.geolocation.getCurrentPosition((data)=>{sendLocation(data)},(err)=>{console.log(err)})
        
    }
    function sendLocation(location) {
        axios({
            method:"POST",
            url:"http://213.254.134.145:6161/api/GecisKaydiGonder",
            headers:{
                Token:localStorage.getItem('USER_TOKEN')
            },
            data:{
                OlayZamani:"2023-04-26 08:54:49.0007238",
                Latitude:location.coords.latitude ??"",
                Longitude:location.coords.longitude ??"",
                QrGecis:false,
                CihazId:2
            }
            
        }).then(res=>{
            console.log(res)
            setResponse(res.StatusCode)
        }).catch(err=>console.log(err))
 
            
    }
  return (

    <>  
        <FormControl sx={{ m: 1, minWidth: {minWidth:120,md:240} }} size="small">
         <InputLabel id="demo-select-small-label">Cihaz Listesi </InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={city}
                label="Age"
                onChange={(e)=>{setCity(e.target.value)}}
                
            >
                {data && data.length ? data.map((item,key)=>(
                    <MenuItem value={item.ADI}  key={key}>{item.ADI}</MenuItem>
                )):null}
                
            </Select>

        </FormControl>
    
    
         <Grid container  sx={{marginTop:"2rem",flexDirection:{flexDirection:"column",md:"row"},gap:"2rem"}}>
       
      
        <Grid item xs={6} sx={{maxWidth:{maxWidth:240,md:360},margin:"auto",marginBottom:"2rem"}} >
            
            <Card sx={{backgroundColor:"inherit",paddingY:"0.5rem",boxShadow:"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}}>
                <CardMedia
                    sx={{objectFit:"scale-down"}}
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={qrlessLogo}
                />
                <CardContent>
                    <Typography fontSize={"1.5rem"} gutterBottom variant="h5" component="div">
                    QR Kodsuz Geçiş Kaydı Oluştur
                    </Typography>
                   
                </CardContent>
                <CardActions>
                    <Button onClick={()=>getLocation()} size="small">Seç</Button>

                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={6} sx={{marginY:{xs:"2rem",sm:0},maxWidth:{maxWidth:240,md:360},margin:"auto"}}>
            <Card sx={{backgroundColor:"inherit",paddingY:"1.5rem",boxShadow:"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}} >
                <CardMedia
                    sx={{objectFit:"scale-down"}}
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={qrLogo}
                />
                <CardContent >
                    <Typography fontSize={"1.5rem"} gutterBottom variant="h5" component="div">
                    QR Kodla Geçiş Kaydı Oluştur
                    </Typography>
                    
                </CardContent>
                <CardActions sx={{}}>
                    <Button  onClick={()=>{navigate('/scanqrcode')}} size="small">Seç</Button>
                </CardActions>
            </Card>
        </Grid>
        {response===400 &&<Alert severity={response===200?"success":"error"}>{response===200 ? "basari":"error"}</Alert>}
    </Grid>
    </>
   
  )
}

export default MyPasses