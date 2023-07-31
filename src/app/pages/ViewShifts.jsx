import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


function ViewShifts() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [dates,setDates]=useState([])
    useEffect(()=>{

        if (state) {
            localStorage.setItem('FROM',state.startDate)
            localStorage.setItem('TO',state.finishDate)
        }
        else{
            navigate(-1)
        }
       axios({
            method:"POST",
            url:"http://213.254.134.145:6161/api/MesaiTakvimi",
            headers:{Token:localStorage.getItem('USER_TOKEN')},
            data:{
                StartDate:localStorage.getItem('FROM'),
                EndDate:localStorage.getItem('TO')
            }
        }).then((res)=>{
            if (res.status===200) {
                setDates(res.data.Data)
            }
        }).catch((err)=>{
            console.log(err)
        })
    },[])



 return !dates || !dates.length ? (<CircularProgress sx={{position:"absolute",top:"50%",left:"50%"}}/>) : (
    <Box>
         <Typography sx={{textAlign:"center" , fontWeight:"900",marginY:"1rem"}}>{state.startDate}---{state.finishDate} ARASI MESAILER</Typography>
          <TableContainer sx={{overflow:"scroll",overflowY:"hidden" , width:{xs:"85vw",sm:"90vw"}}} component={Paper}>
            <Table sx={{ }} aria-label="simple table">
                <TableHead sx={{backgroundColor:"black"}}>
                <TableRow >
                    { Object.keys(dates[0]).map((item,key)=>(
                      <TableCell sx={{color:"white"}} key={key}>{item}</TableCell>

                    ))}

                </TableRow>
                </TableHead>
                <TableBody>
                  { dates.map((row,index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ID}
                      </TableCell>
                      <TableCell align="right">{row.MESAITARIH}</TableCell>
                      <TableCell align="right">{row.MESAIAD}</TableCell>
                      <TableCell align="right">{row.MESAIKODU}</TableCell>
                      <TableCell align="right">{row.GIRIS}</TableCell>

                      <TableCell align="right">{row.CIKIS}</TableCell>
                      <TableCell align="right">{row.IZINADI}</TableCell>
                      <TableCell align="right">{row.RESMITATILAD}</TableCell>
                      <TableCell align="right">{row.FAZLAMESAI}</TableCell>

                      <TableCell align="right">{row.ONAYLANANFAZLAMESAI}</TableCell>
                      <TableCell align="right">{row.RESMITATILFAZLAMESAI}</TableCell>
                      <TableCell align="right">{row.ONAYLANANRESMITATILFAZLAMESAI}</TableCell>
                      <TableCell align="right">{row.HAKEDIS}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
    
  )}
  


export default ViewShifts