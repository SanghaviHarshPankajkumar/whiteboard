import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Snackbar } from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import { Room } from './pages/Room'
import Home from './pages/Home'
import { useEffect, useState } from 'react'
import io from 'socket.io-client';
const URL = 'https://whiteboard-server-8wu8.onrender.com';
const connectionOption = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
};
const socket = io(URL, connectionOption);
function App() {
    const [user, setUser] = useState({});
    const [userJoined, setUserJoined] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
        if (userJoined) {
            // console.log(userJoined);
            socket.emit('userJoined', user);
        }
    }, [userJoined]);

   

    useEffect(() => {
        socket.on('userJoined', (data) => {
            if (data.success) {
                setUser(data.user);
                setShowAlert(true)
            }
            else {
                console.log('something went wrong...');
            }
        })

    }, []);
   const onClose = ()=>{
        setShowAlert(false);
   }
    return (

        <div style={{ height: '100%', width: '100%' }}>
  <Snackbar open={showAlert} autoHideDuration={6000} onClose={onClose} >
        <Alert  severity="success" onClose = {onClose} sx={{ width: '100%' }}>
         User Joined Successfully
        </Alert>
        </Snackbar>
            <BrowserRouter>
                
                <Routes>
                    <Route exact path='/' Component={() => <Home setUser={setUser} setUserJoined={setUserJoined} />} />
                    {
                        (Object.keys(user).length!==0)
                        ? 
                        (<Route exact path='/:id' Component={() => <Room user={user}  socket={socket} />} />)
                        :
                      (  <Route exact path='/:id' Component={() =>(<Navigate to="/" replace/>) } />)

                    }
                    
                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default App
