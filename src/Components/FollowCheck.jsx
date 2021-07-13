import { StepButton } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
let Localdata=JSON.parse(localStorage.getItem('user-info'));
function FollowCheck({username,checker_username}) {
const [follow_status, setfollow_status] = useState(false);
const [button, setbutton] = useState('inline');

useEffect(async()=>{
    let formdata=new FormData();
    formdata.append('username', username);
    formdata.append('followers', checker_username);
    let result=await fetch('https://dilipbackend.xyz/api/followstatus',{
      method:'POST',
      body:formdata
    });
    result=await result.json();
    if(result.follow=='true'){
      setfollow_status(true)
    }else{
      setfollow_status(false);
    }
  
  },[])

    async function follow(){
        let date=new Date();
        date=date.toString();
       let srt= date.split(' ');
        date=srt[1] + ' ' +srt[2];
        let formdata=new FormData();
        formdata.append('username', username);
        formdata.append('followers', checker_username);
        formdata.append('date', date);
    
        let result=await fetch('https://dilipbackend.xyz/api/follow',{
          method:'POST',
          body:formdata
        })
        result =await result.json();
       if(result.follow=='success'){
         setfollow_status(true)
   
       }else{
         setfollow_status(false);
       }
      
      }


  
    

    return (
        <div>
           
            { Localdata.user.username!=username? !follow_status?<button style={{background:'#1eb6f7', color:'white', border:'none', padding:'7px', borderRadius:'3px', width:'70px', cursor:'pointer'}} onClick={()=>{
    follow(username)
}}>Follow</button>:
                    <button onClick={follow} style={{background:'lightgray', color:'black', padding:'7px', width:'70px', border:'none', borderRadius:'3px', cursor:'pointer'}} >unfollow</button>
                    :
                    
                    
                    <button 
                      style={{background:'#1eb6f7', color:'white', border:'none', padding:'7px', borderRadius:'3px', width:'70px', cursor:'pointer', display:button}} >It's You!</button>
                    
                    
                    }
        </div>
    )
}

export default FollowCheck
