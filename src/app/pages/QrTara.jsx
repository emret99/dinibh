import { Typography,Button,Box,Alert,AlertTitle} from '@mui/material'
import axios from 'axios';
import React, { useEffect,useState } from 'react'
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import ReplayIcon from '@mui/icons-material/Replay';

function QrTara() {
    const [capture,_setCapture]=useState(false)
    const [data, setData] = useState("");
    const [location,setLocation]=useState({})

    function setCapture() {
      _setCapture(!capture)
      navigator.geolocation.getCurrentPosition(res=>{setLocation(res.coords)},err=>{console.log(err)})
      setData("")
    }




    useEffect(()=>{
      // Random bir tarih oluşturma
      const start = new Date(2023, 3, 24); // Tarih aralığının başlangıcı
      const end = new Date(); // Tarih aralığının sonu (şu anki tarih)
      const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

      // Tarihi formatlama
      const year = randomDate.getFullYear();
      const month = String(randomDate.getMonth() + 1).padStart(2, '0');
      const day = String(randomDate.getDate()).padStart(2, '0');
      const hours = String(randomDate.getHours()).padStart(2, '0');
      const minutes = String(randomDate.getMinutes()).padStart(2, '0');
      const seconds = String(randomDate.getSeconds()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      if (data) {
          axios({
            method:"POST",
            url:"http://213.254.134.145:6161/api/GecisKaydiGonder",
            headers:{
              Token:sessionStorage.getItem('USER_TOKEN')
            },
            data:{
              Data:data,
              Latitude:location.latitude,
              Longitude:location.longitude,
              OlayZamani: formattedDate,
              CihazId: "2",
              QrGecis:true

            }
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
        
      }


        },[data])

  return (
 /*    <ul style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
    <div style={{position:"relative",display:"inline"}}>
      <img src="https://picsum.photos/200" alt="" />
      <CloseIcon style={{position:"absolute",right:"5%",paddingTop:"%4"}}></CloseIcon>
    </div>


    </ul> */
  
    <Box sx={{marginTop:"1rem", display:"flex",justifyContent:"center",flexDirection:"column",gap:"1rem"}}>
      <Button variant='contained' sx={{width:"35vw",fontSize:"1rem",marginX:"auto"}} onClick={()=>{setCapture()}}>QR Tara</Button>
      <Typography sx={{textAlign:"center"}}>{capture ? "Qr kodunuzu kameraya yakınlaştırın":"Qr tarama için butona basın"}</Typography>
     {capture && <Box sx={{ width:{xs:"50vw"}, display:"flex",flexDirection:"column",justifyContent:"center",marginLeft:{xs:"4rem"},alignItems:{xs:"center",sm:"end",md:"end"}}}>
         <BarcodeScannerComponent
        
        width={400}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          
        }}
      />
        <Box sx={{display:"flex" ,width:{xs:"100%",sm:"60%",md:"60%"},flexDirection:{xs:"column"}}}>
          
        <Alert sx={{}} severity={data ? "success":"warning"}>
          <AlertTitle >{data ? "Qr tanıma başarılı" :"Qr Tanımlanamadı"}</AlertTitle>    
        </Alert>
          <Box sx={{display:data ? "flex":"none",flexDirection:"column",alignItems:"center"}}>
            <ReplayIcon onClick={()=>{setData('')}} sx={{"&:hover":{cursor:"pointer"}}}></ReplayIcon>  
            <Typography>Yeniden Dene</Typography>  

          </Box>
        </Box>

        <Typography>{data}</Typography>
      </Box>}

      
      
    </Box>
  )

}

export default QrTara