import { Button, Container, Drawer, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import WhiteBoard from '../../components/WhiteBoard';
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat'
import UserBar from '../../components/UserBar';
import ChatBar from '../../components/ChatBar';
import useStyles from './styles';
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
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const classes = useStyles();
    const handleChange = (e) => {
        setValue(e.target.value);
    }
    useEffect(() => {
        socket.emit("getUsers", { roomId: user.roomId, joiner: user.joiner });
    }, [user]);
    useEffect(() => {
        // console.log('this is logging.....');
        socket.on('messageResponse', (data) => {
            // console.log("inside the response....");
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
            setUsers(data.users);
        })
        socket.on('userLeftMessage', (data) => {
            /*Remain to add Login */
            console.log(data.name);
        })
        socket.on('allUsers', (data) => {
            // console.log('allUsers');
            setUsers(data.users);
            // console.log(users);
        });
    }, []);
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
        setOpenChat(!openChat);
    }
    return (
        <Container className={classes.container}>
            <Button variant='outlined' color='primary' onClick={handleToggleDrawer} className={classes.drawerButton}> <MenuIcon /> </Button>
            <Button variant='outlined' color='primary' onClick={handleToggleDrawer2} className={classes.drawerButton2} size='large'><ChatIcon fontSize='large' /></Button>
            <Drawer open={open} onClose={handleToggleDrawer} anchor='left' PaperProps={{ style: { width: "20%" } }}>
                <UserBar users={users} socketId={user.socketId} />
            </Drawer>
            <Drawer open={openChat} onClose={handleToggleDrawer2} anchor='right' PaperProps={{ style: { width: "30%" } }}>
                <ChatBar socket={socket} user={user} messages={messages} handleUpdate={handleUpdate} />
            </Drawer>
            <div style={{ marginLeft: '15%' }}>
                <Typography variant='h3' color='textPrimary'>Welcome to the Room</Typography>
                <Typography variant='subtitle1' > {`Current Users: ${users.length}`}  </Typography>
            </div>
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
                        <Button variant='contained' color='secondary' style={{ marginLeft: '420%' }} onClick={handleReset}>Reset</Button>
                    </div>
                </>
                )
            }
            <WhiteBoard value={value} elements={elements} setElements={setElements} socket={socket} user={user} color={color} canvasRef={canvasRef} ctxRef={ctxRef} />

        </Container>
    )
}

