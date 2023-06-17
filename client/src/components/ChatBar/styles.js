import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(()=>({
    container:{display:'flex',alignContent:'center', flexDirection:'column', alignItems:'center', padding:'3%'},
    inputBox: {display:'flex', flexDirection:'row', alignContent:'center' ,position:'absolute',bottom: '3%',width:'100%'},
    input: {width:'75%',marginRight:'2%', marginLeft:'4%'},
    messageSend:{ border: "1px solid rgba(7,23,237,0.8)",background:'rgba(7,23,237,1)', borderRadius: '10px', marginLeft:'44%', display:'flex', alignContent:'center',width:'50%' , margin:'1%'},
    messageRecive:{ border: "1px solid black", background:'rgba(0,0,0,1)',borderRadius: '10px', marginRight:'44%',display:'flex',alignContent:'center',width:'50%',margin:'1%' },
    innnerContainer:{display:'flex',alignContent:'center', flexDirection:'column', alignItems:'center', padding:'3%',height:'68vh', overflowY:'scroll', overflowX:'hidden',
    "& ::-webkit-scrollbar" :{
        display: "none",
      },
        scrollbarWidth: "none",  /* Firefox */
},
    senderInput: {
        "& .MuiInputBase-root.Mui-disabled": {
          color: "white",
          backgroundColor:"rgba(7,23,237,0.7)"
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border:'none'
            },
      }
    },
    reciverInput: {
        "& .MuiInputBase-root.Mui-disabled": {
          color: "white",
          backgroundColor:"rgba(0,0,0,0.7)"
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border:'none'
            },
      }
    }
}))