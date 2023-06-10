import { Button, Container, TextField, Typography } from "@material-ui/core"
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CropIcon from '@material-ui/icons/Crop'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import short from 'shortid';
import useStyles from './styles'
const CreateRoomForm = (prop) => {
    const { setUserJoined, setUser } = prop;
    const [userName, setUserName] = useState("");
    const [roomId, setRoomId] = useState("");
    const history = useNavigate();
    const classes = useStyles();
    useEffect(() => {
        setRoomId(short());
    }, []);
    const handleJoin = (e) => {
        e.preventDefault();
        const roomData = {
            userName: userName,
            roomId: roomId,
            maker: true,
            joiner: false,
        }
        setUser(roomData);
        setUserJoined(true);
        console.log(roomData);
        history(`/${roomId}`);
    }
    const genrate = () => {
        setRoomId(short());
    }
    return (
        <Container className={classes.container} >
            <Typography variant="h5" color="textPrimary" > Create Room</Typography>
            <TextField style={{ marginTop: '20px' }} type="text" name="UserName" required variant='outlined' fullWidth label="Enter your name" size="small" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
            <div className={classes.form}>
                <TextField style={{ width: "100%" }} type="text" name="RoomId" variant='outlined' label="Room Id" size="small" value={roomId} disabled />
                <Button variant="contained" color="primary" className={classes.iconButton} onClick={genrate}><CropIcon fontSize='small' />  </Button>
                <Button variant="contained" className={classes.iconButton} > <FileCopyIcon fontSize="small" /> </Button>
            </div>
            <Button variant="contained" style={{ marginTop: "20px" }} color="primary" fullWidth size="small" onClick={handleJoin} > Join Room </Button>
        </Container>
    )
}

export default CreateRoomForm
