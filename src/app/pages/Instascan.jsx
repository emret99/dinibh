import { useEffect, useState } from 'react'
import {Html5QrcodeScanner} from "html5-qrcode";
import {Html5Qrcode} from "html5-qrcode";


function Instascan() {
  const [scanData,setScanData] = useState(null)
    useEffect(()=>{
      Html5Qrcode.getCameras().then(devices => {
        
   
        if (devices && devices.length) {
          var cameraId = devices[0].id;
        }
        else{
          console.log("kamera mamera yok")
        }
      }).catch(err => {
        // handle err
      });     

      const scanner =new Html5QrcodeScanner('reader',{
        qrbox:{
          width:250,
          height:250
        },
        fps:5,


      })
      scanner.render(scanSuccess,err=>{console.log(err)})

      function scanSuccess(res) {
        scanner.clear()
        setScanData(res)
        
      }



    },[])


    
  return (

    <>


    <div id='reader' style={{width:"600px"}}>
    </div>
    <p>{scanData ? scanData:"error"} </p>
    </>
  )
}

export default Instascan