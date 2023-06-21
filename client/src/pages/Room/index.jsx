import { Button, Container, Drawer, FormControl, FormControlLabel, Radio, RadioGroup, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useEffect, useRef, useState } from 'react'
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import WhiteBoard from '../../components/WhiteBoard';

import UserBar from '../../components/UserBar';
import ChatBar from '../../components/ChatBar';
import NavBar from '../../components/NavBar';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';
export const Room = (prop) => {
    const { socket, user } = prop;
    const [open, setOpen] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [value, setValue] = useState('pencil');
    const [color, setColor] = useState('#000000');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const [showAlertOnUsers, setShowAlertOnUsers] = useState(false)
    const [showAlertOnUsers2, setShowAlertOnUsers2] = useState(false)
    const [messageAlert,setMessageAlert] = useState(false);
    const [deletedUser, setDeletedUser] = useState("");
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        window.onbeforeunload = function () {
            navigate('/');
        };
    }, []);
    useEffect(() => {
        socket.emit("getUsers", { roomId: user.roomId, joiner: user.joiner });
    }, [user]);
    useEffect(() => {
        // console.log('this is logging.....');
        socket.on('messageResponse', (data) => {
            // console.log("inside the response....");
            setMessageAlert(true);
            setMessages((prev) => [...prev, data.message]);
        });
        socket.on('messageResponsetoUser', (data) => {
            // console.log(data);
            // console.log(data.message);
            setMessages((prev) => [...prev, data.message]);

            console.log("inside the user response");
        });
    }, [])

    useEffect(() => {

        socket.on('AllUsers', (data) => {
                setShowAlertOnUsers(true);
                setUsers(data.users);
        })
        socket.on('userLeftMessage', (data) => {
            /*Remain to add Login */
            console.log(data.name);
            setShowAlertOnUsers2(true);
            setShowAlertOnUsers(false);
            setDeletedUser(data.name);
        })
        socket.on('allUsers', (data) => {
            // console.log('allUsers');
            setShowAlertOnUsers(false);
            setUsers(data.users);
            // console.log(users);
        });
    }, []);
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const handleUndo = () => {
        setHistory((prev) => [...prev, elements[elements.length - 1]]);
        if (elements.length === 1) {
            reset();
        }
        else setElements((prev) => prev.filter((ele, i) => i !== prev.length - 1));
    }
    const handleRedo = () => {
        setElements((prev) => [...prev, history[history.length - 1]]);
        if (history.length === 1) setHistory([]);
        else setHistory((prev) => prev.filter((ele, i) => i !== prev.length - 1));

    }
    const reset = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        setElements([]);
    }
    const handleReset = () => {

        setHistory([]);
        reset();

    }
    const handleUpdate = (mess) => {
        // console.log("inside the mess....");
        socket.emit('message', { mess });
    }
    const handleToggleDrawer = () => {
        setOpen(!open);
    }
    const handleToggleDrawer2 = () => {
        setMessageAlert(false);
        setOpenChat(!openChat);
    }

    const onCloseUserAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setShowAlertOnUsers(false);
    }
    const onCloseLeft = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setShowAlertOnUsers2(false);
        setDeletedUser("");
    }
    const onCloseMess = (event,reason)=>{
        if (reason === 'clickaway') {
            return;
          }
        setMessageAlert(false);
    }
    return (
        <>
            <NavBar fromRoom={true} handleToggleDrawer={handleToggleDrawer} handleToggleDrawer2={handleToggleDrawer2} usersCount={users.length} />
            <Container className={classes.container}>

                <Drawer open={open} onClose={handleToggleDrawer} anchor='left' PaperProps={{ style: { width: "20%" } }}>
                    <UserBar users={users} socketId={user.socketId} />
                </Drawer>
                <Drawer open={openChat} onClose={handleToggleDrawer2} anchor='right' PaperProps={{ style: { width: "30%" } }}>
                    <ChatBar socket={socket} user={user} messages={messages} handleUpdate={handleUpdate} />
                </Drawer>

                {
                    user?.maker &&
                    (<>
                        <div className={classes.radioGroup}>
                            <FormControl>
                                <RadioGroup
                                    row name='select draw type'
                                    onChange={handleChange}
                                    value={value}
                                >
                                    <FormControlLabel value="pencil" control={<Radio />} label="Pencil" />
                                    <FormControlLabel value="Rect" control={<Radio />} label="Rectangle" />
                                    <FormControlLabel value="Line" control={<Radio />} label="LIne" />
                                </RadioGroup>
                            </FormControl>
                            <div className={classes.colorPicker}>

                                <label htmlFor="color" style={{ fontSize: '18px' }}> Select Color: </label>
                                <input type='color' name='color' value={color} onChange={(e) => setColor(e.target.value)} id='color' />
                            </div>
                        </div>
                        <div className={classes.buttonGroup}>
                            <Button variant='outlined' color='primary' size='small' style={{ margin: '1%' }} onClick={handleUndo} disabled={elements.length === 0}><UndoIcon /> </Button>
                            <Button variant='outlined' color='primary' size="small" style={{ margin: '1%' }} onClick={handleRedo} disabled={history.length === 0}><RedoIcon /> </Button>
                            <Button variant='contained' color='secondary' style={{ margin: '1%' }} onClick={handleReset}>Reset</Button>
                        </div>

                        {/* New User Join Alert */}
                        <Snackbar open={ !showAlertOnUsers2 && showAlertOnUsers} autoHideDuration={6000} onClose={onCloseUserAlert} >
                            <Alert severity="success" onClose={onCloseUserAlert} sx={{ width: '100%' }}>
                                New User Joined
                            </Alert>
                        </Snackbar>
                        {/* User Left Alert */}
                        <Snackbar open={showAlertOnUsers2} autoHideDuration={6000} onClose={onCloseLeft} >
                            <Alert severity="error" onClose={onCloseLeft} sx={{ width: '100%' }}>
                                {deletedUser} Left
                            </Alert>
                        </Snackbar>
                        <Snackbar open={messageAlert && !openChat} autoHideDuration={6000} onClose={onCloseMess} >
                            <Alert severity="info" onClose={onCloseMess} sx={{ width: '100%' }}>
                              Get New Message!!!
                            </Alert>
                        </Snackbar>
                    </>
                    )
                }
                <WhiteBoard value={value} elements={elements} setElements={setElements} socket={socket} user={user} color={color} canvasRef={canvasRef} ctxRef={ctxRef} />

            </Container>
        </>
    )
}

