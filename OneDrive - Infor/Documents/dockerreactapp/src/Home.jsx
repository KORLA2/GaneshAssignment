import React ,{useEffect, useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import * as AWS from 'aws-sdk'
import { TextField,Box, Button } from '@mui/material';

const Home = () => {
 let {username}=useParams();
  console.log(username)
  let [user,setuser]=useState('');
  let [Allusers,setAllusers]=useState([]);
  const docClient = new AWS.DynamoDB.DocumentClient()

 useEffect(()=>{
  var params = {
    TableName: 'Users',
    Key: {
      'UserName': username
    },
  };

  // Call DynamoDB to read the item from the table
  docClient.get(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);
      
      if(data.Item.isAdmin) fetchAllusers(0)
      else setAllusers([data.Item])
    }
  });

 },[])
console.log(Allusers)

 const fetchAllusers = async (search) => {
   const params = {
     TableName: 'Users',
    };
    
    const scanResults = [];
    let items;
    do{
        items = await docClient.scan(params).promise();
        items.Items.forEach((item) => {  if(search&&item.UserName.includes(user)||!search) scanResults.push(item);
        
        })
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    setAllusers(scanResults)
   
};

  return (
   <Box sx={{m:3}}>
      <Box  sx={{display:'flex',width:'100%',m:3,justifyContent:'center', alignItems:'center'}}>


<TextField fullWidth sx={{m:2}}  onChange={(e)=>{setuser(e.target.value)}} placeholder='Search with User Name'/>
    <Button onClick={()=>{fetchAllusers(1)}}>Search</Button>
    </Box>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>User Name </TableCell>
            <TableCell align="center"> Mail</TableCell>
            <TableCell align="center">Age</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {
         (Allusers?.map((row) => {
          if(!row.isAdmin)
          return (
            <TableRow
              key={row.UserName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="center">{row.UserName}</TableCell>
              <TableCell align="center">{row.Mail}</TableCell>
              <TableCell align="center">{row.Age}</TableCell>
            </TableRow>
          )
}
          ))

          }
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

  )
}

export default Home
