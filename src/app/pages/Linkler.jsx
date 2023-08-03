import  {useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';

function Linkler() {
  const [links,setLinks] = useState([])
  const navigate = useNavigate()
  useEffect(()=>{
    axios({
    method:"GET",
    url:"http://213.254.134.145:6161/api/FaydaliLinkler",
    headers: { 
      "Token":sessionStorage.getItem('USER_TOKEN')
  }}).then(res=>{
    setLinks(res.data.Data)
    console.log(res)
  })
    .catch((error)=>{
    console.log(error)
    navigate('/login')
  })

  },[])
  return (
    <Box marginTop={{xs:"2rem"}} sx={{ minWidth: 275 }}>
    {links.map((item,key)=>(
      <Card key={key}>
      <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        1. {item.ADI}
      </Typography>
      <Typography variant="body2">
        Açıklama: {item.ACIKLAMA}
      </Typography>
    </CardContent>
    <CardActions>
    <Link style={{fontFamily:"sans-serif"}} to={item.LINK}>{item.LINK}</Link>
    </CardActions>
      </Card>))}

     
      
    
    </Box>

  )
}

export default Linkler