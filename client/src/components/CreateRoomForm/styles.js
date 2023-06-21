import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
    container: { border: '1px solid black', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '50px' },
    form:{ display: 'flex', marginLeft: 0, flexDirection: 'row', marginTop: '20px', width: '100%',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },

    },

    iconButton:{ height: '40px', marginLeft: '2%',
    [theme.breakpoints.down('sm')]: {
        width: '30%',
        height:'10%'
      },
    },
    buttonContainer:{
        display: 'flex',
        flexDirection:'row',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row',
          },
        },
    
}))