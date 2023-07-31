import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {  useState } from 'react';
import { Button, Typography,Grid,Alert } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';



function MyShifts() {
    const [startDate,setStartDate] = useState(new Date());
    const [finishDate,setFinishDate] = useState(new Date());
    const [signal,setSignal] = useState(false)
    const [err,setErr] = useState(false)
    const navigate = useNavigate()
    const dates = {
        startDate:startDate.$y+"-"+(startDate.$M+1)+"-"+startDate.$D,
        finishDate:finishDate.$y+"-"+(finishDate.$M+1)+"-"+finishDate.$D,

        }
    function checkDates() {
        if (startDate.$y>finishDate.$y) {
            return false
            
        }
        else{
            if (startDate.$M>finishDate.$M) {
                 return false               
            }
            else{
                if (startDate.$D>finishDate.$D || startDate.$D===finishDate.$D) {
                    return false                    
                }
                else{
                    return true
                }
                
            }
        }

        
    }
    useEffect(()=>{  
        if (signal) {
            if (checkDates()) {
                navigate('/viewshifts',{state:{...dates}})             
            }
            else{
                setErr(true)
                setSignal(false)
            }                   
        }               
    },[signal])

    
  return (
    <>
    <Grid sx={{marginTop:"3rem",}} container spacing={4}>
        <Grid sx={{display:"flex",alignItems:"center",justifyContent:"end"}} item xs={6}>
            <Typography >Başlangıç tarihi :</Typography>
        </Grid>
        <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format='DD-MM-YYYY' selected={startDate} onChange={date=>setStartDate(date)} />
            </LocalizationProvider>        </Grid>
        <Grid sx={{display:"flex",alignItems:"center",justifyContent:"end"}} item xs={6}>
            <Typography >Bitiş tarihi :</Typography>
        </Grid>
        <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker format='DD-MM-YYYY' selected={finishDate} onChange={date=>setFinishDate(date)} />
            </LocalizationProvider>        
        </Grid>
        <Grid item xs={12} sx={{textAlign:"center"}}>
            <Button onClick={()=>setSignal(true)} variant='contained' sx={{paddingX:"3rem"}}>Gönder</Button>
            {err ? <Alert sx={{marginTop:"1rem",display:"flex",justifyContent:"center"}} severity={"error"}>Tarih Bilgileri Hatalı veya Geçersiz Tarih</Alert> : null}
        </Grid>
    </Grid> 
    </> 

  
  )
}

export default MyShifts