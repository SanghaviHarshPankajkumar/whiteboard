const users = [];

const addUser = ({  userName , roomId, maker, joiner, socketId})=>{
   const  user  = {
        userName , roomId, maker, joiner, socketId
    }
    users.push(user);
    
}
const getUser = (id)=>{
 return users.find((us)=> us.socketId===id);
}

const removeUser = (id)=>{
const index = users.findIndex((us)=> us.socketId===id);
if(index!==-1){
    users.splice(index,1);
    console.log(users);
}
}

const getUsers = (roomId)=>{
  return users.filter((us)=> us.roomId===roomId);
}

export {getUser, getUsers, removeUser,addUser};