import { Container, Typography,Divider } from '@material-ui/core'


const UserBar = (prop) => {
    const {users,socketId} = prop;
    console.log('inside the UserBar');
    console.log(users);

    console.log(socketId);
  return (
   <Container style={{display:'flex',alignContent:'center', flexDirection:'column', alignItems:'center', padding:'3%'}}>
    <Typography variant='h3' color='textPrimary' style={{marginBottom:'10%'}}>Users </Typography>
      <Divider style={{margin:'20px',width:'100%'}}/>
    {
        users.map((ele)=>{
           return (
            <Typography variant='h6' color='textPrimary'key={ele.socketId}> {ele.maker && "creator:"} {ele.userName} {socketId===ele.socketId && "(You)"} </Typography>
           )
        })
    }
   </Container>
  )
}

export default UserBar
