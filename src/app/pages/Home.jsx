import { Box, Container, Typography } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"


function Home() {
   useEffect(()=>{
    fetch("http://213.254.134.145:6161/api/GecisKayitlari",
    {
      body:{    
      "StartDate":"2022-04-18 09:29:14",
      "EndDate":"2023-04-18 09:29:14"

    }}).then(res=>{
      res = res.json()
      console.log(res)
      
    }).catch(err=>{
      console.log(err)
    })
  }) 
  return (
    <Container>
        <Box>
          <Typography variant="h5">Ana Sayfa/</Typography>
        </Box>
        <Box>
          <Typography variant="h5">Geçiş Kayıtları /</Typography>

        </Box>
        

        
    </Container>
  )
}

export default Home