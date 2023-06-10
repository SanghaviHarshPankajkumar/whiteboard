import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Room } from './pages/Room'
import Home from './pages/Home'
import { useEffect, useState } from 'react'
import io from 'socket.io-client';
const URL = 'http://localhost:5000';
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
            }
            else {
                console.log('something went wrong...');
            }
        })

    }, []);

    return (

        <div style={{ height: '100%', width: '100%' }}>

            <BrowserRouter>
                <Routes>
                    <Route exact path='/' Component={() => <Home setUser={setUser} setUserJoined={setUserJoined} />} />
                    <Route exact path='/:id' Component={() => <Room user={user} socket={socket} />} />
                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default App
