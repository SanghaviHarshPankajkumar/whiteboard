import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(()=> ({
    container: { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1%', flexDirection: 'column' },
    drawerButton:{ position: 'absolute', left: '3%', top: '3%' },
    drawerButton2:{ position: 'absolute', right: '3%', top: '3%' },
    radioGroup: { display: 'flex', flexDirection: 'row', justifyItems: 'space-between', width: '100%', justifyContent: 'center', marginLeft: '10%', marginTop: '3px' },
    colorPicker: { paddingLeft: '1%', marginTop: '5px' },
    buttonGroup: {display: 'flex', flexDirection: "row", alignSelf: 'start', marginLeft: '15%' }
}))