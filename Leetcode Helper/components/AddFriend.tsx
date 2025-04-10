import React, { use } from 'react'
import {UserCheck2} from "lucide-react";
import { Button } from './ui/Button';



const AddFriend = ({username} : {username : string}) => {

  const user = username;

  
    const [friends, setFriends] = useState<string[]>(() => {
      const savedFriends = localStorage.getItem("friends");
      return savedFriends ? JSON.parse(savedFriends) : [];
    });

    

    const hanldeaddfriend = (username : string) =>{

      if(username){
        const newFriends = [...friends, username];
        setFriends(newFriends);
        console.log("This is the friends", newFriends);
        localStorage.setItem("friends", JSON.stringify(newFriends));
        alert("Friend Added");
      

      }


    }


  return (
   <>

   <Button onClick={() => hanldeaddfriend(user)} >
    Add Friend
   </Button>


   
   
   
   </>
  )
}

export default AddFriend