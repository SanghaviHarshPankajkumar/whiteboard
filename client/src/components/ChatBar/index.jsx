import { useState } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import useStyles from './styles'
const ChatBar = (prop) => {
    const { socket, user, messages, handleUpdate } = prop;
    const [message, setMessage] = useState("");
    const classes = useStyles();

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            const data = { message, user: user.userName };
            handleUpdate(data);
            setMessage("");
        }
    }
    return (
        <Container className={classes.container}>
            <Typography variant='h3' color='textPrimary' style={{ marginBottom: '10%' }}>Chats </Typography>
            {messages &&
                messages.map((ele) => {
                    return (
                        <Typography variant='h6' color='textSecondary' key={ele}> {ele.user}:{ele.message} </Typography>
                    )
                })
            }
            <div className={classes.inputBox}>

                <TextField className={classes.input} size='small' variant='outlined' type='text' label="Write Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button variant='outlined' size='small' onClick={handleSend}><SendIcon style={{ color: 'green' }} /></Button>
            </div>
        </Container>
    )
}

export default ChatBar
