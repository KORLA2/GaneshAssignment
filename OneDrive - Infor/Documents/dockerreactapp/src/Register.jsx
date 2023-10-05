import React, {useState} from 'react'
import {Box,Button,TextField,Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import * as AWS from 'aws-sdk'
import CryptoJS from 'crypto-js';
const Register = () => {

    let [Register,setRegister]=useState(1);
    let [Error,setError]=useState('');
    let navigate = useNavigate();
    let [input,setinput]=useState({UserName:"",Password:"",Age:'',Mail:"",isAdmin:0});
    const docClient = new AWS.DynamoDB.DocumentClient()
let handleLogin=()=>{

    var params = {
        TableName: 'Users',
        Key: {
          'UserName': input.UserName
        },
      };

      // Call DynamoDB to read the item from the table
      docClient.get(params, function(err, data) {
        if (err) {
          console.log("Error", err);
          setError("No user Exist")
        } else {
          console.log("Success", data.Item);
          var bytes = CryptoJS.AES.decrypt(data.Item.Password, 'my-secret-key@123');
  var decryptedData = (bytes.toString(CryptoJS.enc.Utf8));
          if(decryptedData===input.Password)
          navigate(`/home/${input.UserName}`)
        else setError("No user Exist")
        }
      });
}

    let handlesubmit=(val)=>{
    let mail= /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let lower=/.*[a-z].*/;
    let age=/^[0-9]*$/
    let upper=/.*[A-Z]/;
    let number=/.*[0-9]/; 
    let special=/.*[!@#\$%\^&\*]/;
    if(input.Name){setError("Enter your User Name"); return ;}
    if(input.Password.length<8){setError("Password Length Must be Greater than 8") ;return; }
    if(!lower.test(input.Password)){setError("Password must Contain alteast 1 lower letter"); return ;}
    if(!upper.test(input.Password)){setError("Password must Contain alteast 1 upper letter"); return ;}
    if(!number.test(input.Password)){setError("Password must Contain alteast 1 upper letter"); return ;}
    if(!special.test(input.Password)){setError("Password must Contain alteast 1 special character"); return ;}
    if(val==2)
    return handleLogin()
    
    

    if(!input.Mail.match(mail)){ setError("Enter Correct MailID");
    return ;}
    
    if(!input.Age||!input.Age.match(age)) {setError("Enter Valid Age"); return;}
    setError("Registration Successful");
    UploadtoDB(val)
    navigate(`/home/${input.UserName}`)

    
    }
    let UploadtoDB= async (isadmin)=>{
    let ciphertext=CryptoJS.AES.encrypt(input.Password,'my-secret-key@123').toString();;
input.Password=ciphertext;
       input.isAdmin=isadmin;
          let params={
            TableName:"Users",
            Item:input,
       
            }
      
            
             docClient.put(params,(e,d)=>{
              if(e)console.log(e)
              else console.log(d)
              })
              
     
      
      
      }
    let handleinput=(value,name)=>{
        console.log(name)
    setinput({...input,[name]:value});
    
    }
    console.log(input)
 

      return (
        
    <Box sx={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    
    
    <Box sx={{width:'50%'}}>
    <Box sx={{display:'flex',width:'100%', m:2,justifyContent:'center', alignItems:'center'}}>
    
        {Error?<Typography variant='body2' sx={{color:'red',}}>
            {Error}
        </Typography>:''}
    </Box>
       <Box sx={{display:'flex',width:'100%', m:2,justifyContent:'center', alignItems:'center'}}>
        <Typography variant='subtitle2' sx={{m:2}} > UserName </Typography>
        <TextField id="outlined-basic" name="UserName" onChange={(e)=>{
            handleinput(e.target.value,e.target.name);
        }} placeholder='UserName' variant="outlined" />
       </Box>
      <Box sx={{display:'flex',width:'100%',marginRight:3,justifyContent:'center', alignItems:'center'}}>
    
        <Typography variant='subtitle2'  sx={{m:2}}> Password</Typography>
        <TextField id="outlined-basic" name="Password"  onChange={(e)=>{
            handleinput(e.target.value,e.target.name);
        }} placeholder='Password' sx={{ml:2}} type='password'   />
    </Box>
    {
        Register ? (
    <>
    
        
    <Box sx={{display:'flex',width:'100%',m:2,justifyContent:'center', alignItems:'center'}}>
    
        <Typography variant='subtitle2'  sx={{m:2}}> Mail</Typography>
        <TextField id="outlined-basic" name="Mail"  onChange={(e)=>{
            handleinput(e.target.value,e.target.name);
        }} placeholder='Mail' variant="outlined" />
    </Box>
            <Box sx={{display:'flex',width:'100%',m:2,justifyContent:'center', alignItems:'center'}}>
    
            <Typography variant='subtitle2'  sx={{m:2}}>Age</Typography>
            <TextField id="outlined-basic" name="Age" onChange={(e)=>{
            handleinput(e.target.value,e.target.name);
        }} placeholder='Age' variant="outlined" />
        </Box>

        <Box  sx={{display:'flex',width:'100%',m:2,justifyContent:'center', alignItems:'center'}}>
    
        <Button onClick={()=>{handlesubmit(1)}}>
    
        <Typography variant='subtitle2'>
    Register As Admin
        </Typography>
        </Button>
    
        <Button onClick={()=>{handlesubmit(0)}}>
        <Typography variant='subtitle2'>
    Register As Non Admin
        </Typography>
        </Button>
    </Box>
    
    </>
       
    
    
        ): 
        <Box  sx={{display:'flex',width:'100%',m:2,justifyContent:'center', alignItems:'center'}}>
    
        <Button onClick={()=>{handlesubmit(2)}}>
    
        <Typography variant='subtitle2'>
   Login
        </Typography>
        </Button>
        </Box>
        }
    
    
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

export default Register
/*
PUT item dynamo db




*/