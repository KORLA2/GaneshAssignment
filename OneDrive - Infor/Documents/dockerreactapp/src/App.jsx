import React, { useState } from 'react'
import {Box,Button,TextField,Typography} from '@mui/material'
const App = () => {
    let [Register,setRegister]=useState(1);
let [Error,setError]=useState('');
let [input,setinput]=useState({Name:"",Password:"",Age:'',Mail:""});
let handlesubmit=(val)=>{
let mail= /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let lower=/.*[a-z].*/;
let age=/^[0-9]*$/
let upper=/.*[A-Z]/;
let number=/.*[0-9]/;
let special=/.*[!@#\$%\^&\*]/;
if(!input.Name){setError("Enter your User Name"); return ;}
if(input.Password.length<8){setError("Password Length Must be Greater than 8") ;return; }
if(!lower.test(input.Password)){setError("Password must Contain alteast 1 lower letter"); return ;}
if(!upper.test(input.Password)){setError("Password must Contain alteast 1 upper letter"); return ;}
if(!number.test(input.Password)){setError("Password must Contain alteast 1 upper letter"); return ;}
if(!special.test(input.Password)){setError("Password must Contain alteast 1 specail character"); return ;}

if(!input.Mail.match(mail)){ setError("Enter Correct MailID");
return ;}

if(!input.Age||!input.Age.match(age)) {setError("Enter Valid Age"); return;}
}
let handleinput=(value,name)=>{
setinput({...input,[name]:value});

}
console.log(input)
  return (
    
<Box sx={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>

<Box>
    {Error?<Typography variant='body2' sx={{color:'red',}}>
        {Error}
    </Typography>:''}
</Box>
<Box sx={{width:'50%'}}>
   <Box sx={{display:'flex',width:'100%', m:2,justifyContent:'center', alignItems:'center'}}>
    <Typography variant='subtitle2' sx={{m:2}} > UserName</Typography>
    <TextField id="outlined-basic" name="Name" value={input.Name} onChange={(e)=>{
        handleinput(e.value,e.name);
    }} placeholder='UserName' variant="outlined" />
   </Box>
  <Box sx={{display:'flex',width:'100%',marginRight:3,justifyContent:'center', alignItems:'center'}}>

    <Typography variant='subtitle2'  sx={{m:2}}> Password</Typography>
    <TextField id="outlined-basic" name="Password" value={input.Password} onChange={(e)=>{
        handleinput(e.value,e.name);
    }} placeholder='Password' sx={{ml:2}} type='password'   />
</Box>
{
    Register && (
<>

    
<Box sx={{display:'flex',width:'100%',m:2,justifyContent:'center', alignItems:'center'}}>

    <Typography variant='subtitle2'  sx={{m:2}}> Mail</Typography>
    <TextField id="outlined-basic" name="Mail" value={input.Mail} onChange={(e)=>{
        handleinput(e.value,e.name);
    }} placeholder='Mail' variant="outlined" />
</Box>
        <Box sx={{display:'flex',width:'100%',m:2,justifyContent:'center', alignItems:'center'}}>

        <Typography variant='subtitle2'  sx={{m:2}}>Age</Typography>
        <TextField id="outlined-basic" name="Age" value={input.Age} onChange={(e)=>{
        handleinput(e.value,e.name);
    }} placeholder='Age' variant="outlined" />
    </Box>
    <Box  sx={{display:'flex',width:'100%',m:2,justifyContent:'center', alignItems:'center'}}>

    <Button onClick={handlesubmit(1)}>

    <Typography variant='subtitle2'>
Register As Admin
    </Typography>
    </Button>

    <Button onClick={handlesubmit(0)}>
    <Typography variant='subtitle2'>
Register As Non Admin
    </Typography>
    </Button>
</Box>

</>
   


    )}


<Box onClick={()=>{setRegister(!Register)}} sx={{display:'flex',width:'100%',m:2,justifyContent:'center', alignItems:'center'}}>

<Typography sx={{
"&:hover":{
    cursor:'pointer'
},
color:'blue'

}}>
   { 
   Register?
  " Already have an Account ?":"Don't have an account ?"}
</Typography>
</Box>

    </Box>

</Box>
    
  )
}

export default App