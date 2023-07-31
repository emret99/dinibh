
export  function FirmaGiris() {

    return(
        <>
                    
        <Box  >
            <Typography sx={{fontSize:"2rem"}}>Kullanıcı Girişi</Typography>
        </Box>
        <Box sx={{
          display:"flex",
          flexDirection:"column",
          gap:"2rem 0px"
          }}>
        <TextField itemID="uname"    id="outlined-controlled" label="TC Kimlik-Sicil No" variant="outlined" />
        <TextField itemID="password"    id="outlined-controlled" label="Şifre" variant="outlined"  />
        

        </Box>
        <Box sx={{marginTop:"1rem",display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},gap:{xs:"1rem"},justifyContent:"space-evenly",marginBottom:"0.5rem"}}>
          <Button   variant="outlined">Giriş Yap</Button>
          <Button  variant="text">Şifremi Unuttum</Button>
        </Box>
        </>
    )

    
}
