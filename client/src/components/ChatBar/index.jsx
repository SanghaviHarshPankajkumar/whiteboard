import { useState } from 'react'
import { Button, Container, Divider, TextField, Typography } from '@material-ui/core'
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
        <Container className={classes.container} >
            <Typography variant='h3' color='textPrimary' >Chats </Typography>
                 <Divider style={{margin:'20px',width:'100%'}}/>
                 <Container className={classes.innnerContainer}>
            {messages &&
                messages.map((ele) => {
                    return (
                    <>
                     {
                    user?.userName === ele.user ?  (
                        <div className={classes.messageSend} key={ele}>
                            <TextField multiline disabled className={classes.senderInput} variant='outlined' value= {`You : ${ele.message}`}>  </TextField>
                        </div>
                    )
                    : (
                        <div className={classes.messageRecive} key={ele}>
                            <TextField multiline disabled className={classes.reciverInput} variant='outlined' value= {`${ele.user}:${ele.message}`}>  </TextField>
                        </div>
                    )
                }
                    </>
                )
            }
                )
            }
                </Container>
                <Divider style={{margin:'20px',position:'absolute',bottom:'10%',width:'100%'}}/>
            <div className={classes.inputBox}>

                <TextField className={classes.input} size='small' variant='outlined' type='text' label="Write Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button variant='outlined' size='small' onClick={handleSend}><SendIcon style={{ color: 'green' }} /></Button>
            </div>
        </Container>
    )
}

export default ChatBar
