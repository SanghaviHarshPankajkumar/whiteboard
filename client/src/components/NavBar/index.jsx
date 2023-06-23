import {AppBar,Typography,Button} from "@material-ui/core";
import {Link  } from 'react-router-dom';
// import whiteboard2 from './whiteboard2.png'
import MenuIcon from '@material-ui/icons/Menu';
import ChatIcon from '@material-ui/icons/Chat'
import useStyles from './styles.js';

const NavBar = (prop) => {
    const {handleToggleDrawer, handleToggleDrawer2, fromRoom,usersCount} = prop;
    const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color='inherit'>
        {
            fromRoom && (
                    <Button variant='outlined' style={{marginRight:"1%"}} color='primary' onClick={handleToggleDrawer}> <MenuIcon /> </Button>  
            )
        }
    <Link to="/" style={{font:'none', textDecoration:'none'}}> <Typography className={classes.heading} variant="h2" align="center"> WhiteBoard</Typography></Link>
     <img className={fromRoom? classes.image2: classes.image} src="https://www.howtogeek.com/thumbcache/600/250/dc88f51e449be7cd6915c32b906a0446/wp-content/uploads/2020/06/microsoft-whiteboard-logo.jpg" alt='main' />

     {
        fromRoom && (
            <>

            <Typography  variant='subtitle1' > {`Current Users: ${usersCount}`}  </Typography>
            <Button variant='outlined' style={{marginLeft:"7%"}} color='primary' onClick={handleToggleDrawer2} size='large'><ChatIcon fontSize='large' /></Button>
            </>
        )
     }
   </AppBar>
  )
}

export default NavBar
