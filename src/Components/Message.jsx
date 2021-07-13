import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'

import Messagecard from "./Messagecard";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Avatar } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

function Message() {
    const history=useHistory('');
useEffect(()=>{
    if(!localStorage.getItem('user-info')){
        history.push('/login');
    }
},[]);

  const [state, setstate] = useState(false);
  const [current_message, setcurrent_message] = useState("");
 let [send_message, setsend_message] = useState('');
  const [localdata, setlocaldata] = useState(JSON.parse(localStorage.getItem('user-info')));
  const [receiverdata, setreceiverdata] = useState(1);
  // sending message
  let initialstate='hello';
  var [sender, setsender] = useState('')
  const [receiver=initialstate, setreceiver] = useState()
  const [status, setstatus] = useState('false');
  const [first_message_data, setfirst_message_data] = useState([]);
  const [realTimeMessage, setrealTimeMessage] = useState([]);

const [sample, setsample] = useState([]);
 
  
  


  useEffect(()=>{
    if(localStorage.getItem('current_message')){
   setreceiver(JSON.parse(localStorage.getItem('current_message')).username);
 
          }
  },[current_message]);

  useEffect(async()=>{
    let result=await fetch('https://dilipbackend.xyz/api/get_users');
   result= await result.json();
   setsample(result);   
 
  },[])

  const sentMessage=async()=>{
    let date=new Date();
    date=date.toString();
   let srt= date.split(' ');
    date=srt[1] + ' ' +srt[2];
    if(send_message){
let formdata={sender,receiver,status,send_message, date };
let result= await fetch('https://dilipbackend.xyz/api/message/',{
   method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify(formdata)
});
result=await result.json();
sender='';
let message=result.message;
sender=result.sender;
let id=result.id;
let messageobj={message,sender,id}
send_message='';
if(result){

 setfirst_message_data([...first_message_data, messageobj])

    }
  }


  }

  async function getmessage(){
   
let sender=localdata.user.username;
    let formdata={sender, receiver};
    let result=await fetch('https://dilipbackend.xyz/api/getmessage',{
      method:"POST",
       headers:{
           "Content-Type":"application/json",
           "Accept":"application/json"
       },
       body:JSON.stringify(formdata)
   });
   result=await result.json();
 
     
 
  
setfirst_message_data(result);
  
  
  }
useEffect(()=>{
  getmessage()
},[current_message])
 

  return (
    <div style={{ display: "flex" }}>
      <div className="message">
        <h5
          style={{
            position: "relative",
            left: "20px",
            top: "10px",
            borderBottom: "1px solid orangered",
            width: "73px",
            paddingBottom: "3px",
            color: "orangered",
          }}
        >
          Global Chat
        </h5>
        <input
          type="search"
          placeholder="search..."
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #ffbf94",
            paddingTop: "5px",
            paddingBottom: "5px",
            marginBottom: "20px",
            paddingLeft: "10px",
            width: "70%",
          }}
        />

        <div
          onClick={() => {
            setstate(true);
            if (localStorage.getItem("current_message")) {
              setcurrent_message(
                JSON.parse(localStorage.getItem("current_message"))
              );

              setsender(localdata.user.username)
setreceiver(JSON.parse(localStorage.getItem('current_message')).username)
              

            }
          }}
          className="profile_messages"
        >
          {sample.map((item) => (
            <Messagecard key={item.id} img={'https://dilipbackend.xyz/storage/profile/'+item.username+`/profimage.png?${Date.now()}`} username={item.username} />
          ))}
        </div>
      </div>
      <div className="message_box" >
        {state ? (
          <>
          
            <div onMouseOver={getmessage}
              style={{
                display: "flex",
                alignItems: "center",
                width: "80px",
                justifyContent: "space-around",
                margin: "10px",
              }}
            >
              <Avatar
                style={{ height: "30px", width: "30px" }}
                src={current_message.img}
              />
              <h6>{current_message.username}</h6>
            </div>
            <div style={{ display:'flex', flexDirection:'column',justifyContent:'space-evenly'}} >
        <div className="inbox_messages" >
{first_message_data.map((item)=>
item.sender!=localdata.user.username?
<p className='friend_child' >{item.message}</p>:
<p className='user_child' >{item.message}</p>
)}
        </div>
        <div className='send_message' >
<div style={{display:'flex', alignItems:'center', position:'relative', top:'5px', justifyContent:'start'}} >
    <textarea style={{border:'none', boxSizing:'border-box',paddingTop:'10px',paddingLeft:'15px', borderRadius:'10px', width:'80%', boxShadow: '2px 0px 12px -5px rgb(0 0 0 / 35%)', outline:'none'}} type="text" placeholder='message...' onChange={(e)=>{
      setsend_message(e.target.value);
      setsender(localdata.user.username);
setreceiver(current_message.username);
    }} value={send_message} />
    <i onClick={sentMessage} style={{color:'#0fabff', position:'relative', top:'1.8px', marginLeft:'15px', cursor:'pointer'}} ><SendIcon/></i>
    </div>

        </div>
        </div>
          </>
        ) : (
          <>
            <p
              style={{
                height: "100%",
                width: "100%",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0fabff",
                cursor: "default",
              }}
            >
              Click Profile to Get Started{" "}
              <span
                style={{
                  marginLeft: "10px",
                  position: "relative",
                  top: " 5px",
                  color: "#0fabff",
                }}
              >
                {" "}
                <ChatBubbleOutlineIcon />{" "}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
