import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Duyurular() {
  const [data,setData] = useState([])
    useEffect(()=>{
        axios({
            method:"GET",
            url:"SECRET"+"/api/GetDuyuruList",
            headers:{
                "Token":sessionStorage.getItem('USER_TOKEN').toString()
            }
        }).then(res=>{
            setData(res.data.Data)
            console.log(res)
        }).catch(err=>{
          console.log(err)
        })

    },[])
  return (
    <Box>
      <Typography sx={{textAlign:"center",marginY:"1rem"}}>Son Duyurular</Typography>

{  data.map((item,key)=>( <Accordion key={key}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Başlık : {item.ADI}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        {item.ACIKLAMA}
        </Typography>
      </AccordionDetails>
    </Accordion>)) }

    </Box>
  )
}

export default Duyurular
