import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(()=>({
    container: { border: '1px solid black', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '50px' },
    form:{ display: 'flex', marginLeft: 0, flexDirection: 'row', marginTop: '20px', width: '100%' },
    iconButton:{ height: '40px', marginLeft: '2%' },
}))