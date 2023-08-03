import { Box, Typography ,Button} from "@mui/material"
import { useNavigate } from "react-router-dom"


function Error404() {
  const navigate = useNavigate();
  return (
    <Box sx={{display:"flex", flexDirection:"column",marginTop:"2rem",alignItems:"center"}}>
      <Typography variant="h1" sx={{fontWeight:"900"}}>
        404
      </Typography>
      <Box textAlign={"center"} marginTop={"2rem"}>
      <Typography>
          Aradığınız sayfa bulunamadı.
        
        </Typography>
        <Button onClick={()=>{navigate('/')}}>
          Ana sayfaya Dönün
        </Button>
      </Box>
    </Box>
  )
}

export default Error404