import { Button, Container, TextField, Typography } from "@material-ui/core"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import useStyles from './styles'
const JoinRoomForm = (prop) => {
    const { setUser, setUserJoined } = prop
    const [userName, setUserName] = useState("");
    const [roomId, setRoomId] = useState("");
    const history = useNavigate();
    const classes = useStyles();
    const handleJoin = (e) => {
        e.preventDefault();
        const roomData = {
            userName: userName,
            roomId: roomId,
            maker: false,
            joiner: true,
        }
        setUser(roomData);
        setUserJoined(true);
        console.log(roomData);
        history(`/${roomId}`);
    }
    return (
        <Container className={classes.container} >
            <Typography variant="h5" color="textPrimary" > Join Room</Typography>
            <TextField style={{ marginTop: '20px' }} type="text" name="UserName" variant='outlined' fullWidth label="Enter your name" size="small" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
            <TextField style={{ marginTop: '20px' }} type="text" name="RoomId" variant='outlined' fullWidth label="Enter Room Id" size="small" value={roomId} onChange={(e) => { setRoomId(e.target.value) }} />
            <Button variant="contained" style={{ marginTop: "20px" }} color="primary" fullWidth size="small" onClick={handleJoin}> Join Room </Button>
        </Container>
    )
}

export default JoinRoomForm
