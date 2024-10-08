import  { useEffect ,useState} from 'react'
import { Outlet ,useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import userLogo from "../../assets/userProfile.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button,Backdrop, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {Avatar} from '@mui/material';
import axios from 'axios';

function DefaultLayout() {
  const {user,setUser}= useAuth()
  const navigate= useNavigate()
  const drawerWidth = 240;

 

/*   useEffect(()=>{ 
      axios({
      method:"POST",
      url:"http://213.254.134.145:6161/api/GenerateTokenWithRefreshToken",
      data:{RefreshToken:sessionStorage.getItem('REFRESH_TOKEN'),DeviceId:"123"}    
    }).then(res=>{
      console.log(res.data.RefreshToken)
      sessionStorage.setItem('USER_TOKEN',res.data.Token)
    }) 
 
  },[window.location.href])
 */
  useEffect(()=>{   
    if (!sessionStorage.getItem('USER_TOKEN')) {
    sessionStorage.removeItem('USER_TOKEN')
    sessionStorage.removeItem('USER_TCKN')
    navigate('/login')   

    
    }
    else{
      setUser({
        sicil:sessionStorage.getItem('USER_TCKN'),
        uname:sessionStorage.getItem('USER_NAME'),
        email:sessionStorage.getItem('USER_EMAIL'),
        
      })
    }
  
  },[])
  

  function handleLogout() {
    sessionStorage.clear()
    setUser({})
    navigate("/login")

    
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <>
       <Backdrop
       
        sx={{ display:"flex",flexDirection:"column",justifyContent:"space-around", color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box sx={{width:"70%",display:"flex", justifyContent:"space-between", alignItems:"center",border:"1px solid white",padding:"1rem",borderRadius:"0.5rem"}}>
          <Box sx={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
          <Typography>Kullanıcı Sicil : {user.sicil}</Typography>
          <Typography>Kullanıcı : {user.uname}</Typography>

          </Box>
          <Avatar   src={userLogo}></Avatar>
        </Box>
         <List>
            <ListItemButton >
              <Badge onClick={()=>{navigate('duyurular')}} sx={{marginX:"auto",cursor:"pointer"}} badgeContent={4} color="success">
                <MailIcon color="action" />
              </Badge>
            </ListItemButton>
            <ListItemButton sx={{textAlign:"center"}} onClick={()=>navigate('/')}>
              <ListItemText primary={"Ana Sayfa"}/>
            </ListItemButton>
          {Object.entries({gecisler:'Geçişlerim', linkler:'Faydalı Linkler', mesailer:'Mesailerim', sifredegistir:'Şifre değiştir'}).map(([key,value]) => (
            <ListItem key={key}>
              <ListItemButton sx={{textAlign:"center"}} onClick={()=>navigate(key)}>
                <ListItemText primary={value} />
              </ListItemButton>
            </ListItem>
          ))}
            <ListItemButton sx={{textAlign:"center"}} onClick={()=>handleLogout()}>
              <ListItemText primary={"Çıkış"}/>
            </ListItemButton>
          </List>

      </Backdrop>
      <Box sx={{position:"absolute",top:"0",width:"100%",textAlign:"center",color:"white",backgroundColor:"#3498db",display: { sm: 'block', md: 'none' }}}>
        <Button onClick={()=>handleOpen()} sx={{color:"white",width:"100vw"}}>
          <ExpandMoreIcon/>
        </Button>
      </Box>
      <Box sx={{ display: 'flex',backgroundColor:"#f5f6fa",height:"100vh"}}>
      <Drawer
        sx={{
          display:{
            display:"none",
            md:"block",
          },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:"#3498db",
            color:"white",
            
          },
        }}
        variant="permanent"
        anchor="left"
      >
         <Box style={{display:"flex",flexDirection:"column",margin:"1rem 0" ,width:"100%",alignItems:"center" ,backgroundColor:"#227093",paddingTop:"1rem",paddingBottom:"1rem",borderRadius:"0.25rem",boxShadow:"5px 5px 5px 0px rgba(0,0,0,0.3)"}}>
            <Box sx={{display:"flex"}}>
              <Avatar alt="Remy Sharp" src={userLogo} />
              <Badge onClick={()=>{navigate('duyurular')}} sx={{cursor:"pointer",marginX:"0.5rem"}} badgeContent={4} color="success">
                <MailIcon color="action" />
              </Badge>

            </Box>
            <Box sx={{marginTop:"1rem",display:"flex",justifyContent:"space-evenly" ,width:"100%"}}>
              <Box>
                <Typography sx={{fontFamily:"",fontWeight:"600",display:"block",color:"white",textAlign:"center",fontFamily:"sans-serif"}}>Kullanıcı Sicil:{user.sicil}</Typography>
                <Typography sx={{fontFamily:"",fontWeight:"600",display:"block",color:"white",textAlign:"center",fontFamily:"sans-serif",marginTop:"1rem"}}>Kullanıcı Adı:{user.uname}</Typography>

              </Box>

            </Box>
         </Box>
        <Divider />
        <List>
           <ListItem key={"/"}>
              <ListItemButton onClick={()=>navigate("/")}>
                <ListItemText primary={"Ana Sayfa"} />
              </ListItemButton>
            </ListItem>
          {Object.entries({gecisler:'Geçişler', linkler:'Faydalı Linkler', mesailer:'Mesailer', sifredegistir:'Şifre değiştir'}).map(([key,value]) => (
            <ListItem key={key}>
              <ListItemButton onClick={()=>navigate(key)}>
                <ListItemText primary={value} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem>
            <ListItemButton onClick={()=>handleLogout()}>
                <ListItemText primary={"Çıkış"}/>

            </ListItemButton>
          </ListItem>
        </List>
      
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop:"1rem" }}
      >
        <Outlet/>
      </Box>
    </Box>
    </>
    
        
  )
}

export default DefaultLayout