
import { Container, Grid } from '@material-ui/core'
import CreateRoomForm from '../../components/CreateRoomForm'
import JoinRoomForm from '../../components/JoinRoomForm'
const Home = (prop) => {
    const { setUserJoined, setUser } = prop;
    return (
        <Container>

            <Container>
                <Grid container spacing={2} >
                    <Grid item sm={12} lg={6} md={6} >
                        <CreateRoomForm setUser={setUser} setUserJoined={setUserJoined} />
                    </Grid>
                    <Grid item sm={12} lg={6} md={6} >
                        <JoinRoomForm setUser={setUser} setUserJoined={setUserJoined} />
                    </Grid>
                </Grid>
            </Container>
        </Container>

    )
}

export default Home
