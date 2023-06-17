import {AppBar,Typography} from "@material-ui/core";
import {Link  } from 'react-router-dom';
import image from '../../assets/whiteboard2.png'
import useStyles from './styles.js';

const NavBar = () => {
    const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color='inherit'>
    <Link to="/" style={{font:'none', textDecoration:'none'}}> <Typography className={classes.heading} variant="h2" align="center"> WhiteBoard</Typography></Link>
     <img className={classes.image} src={image} alt='main' />
   </AppBar>
  )
}

export default NavBar
