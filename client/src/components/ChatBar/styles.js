import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(()=>({
    container:{display:'flex',alignContent:'center', flexDirection:'column', alignItems:'center', padding:'3%'},
    inputBox: {display:'flex', flexDirection:'row', alignContent:'center' ,position:'absolute',bottom: '3%',width:'100%'},
    input: {width:'75%',marginRight:'2%', marginLeft:'4%'},
}))