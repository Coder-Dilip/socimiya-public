
import React, {useState, useEffect} from 'react'
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import {Avatar} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

function MobileMessage() {
    let localdata=JSON.parse(localStorage.getItem('user-info'));
    let localmessage=JSON.parse(localStorage.getItem('current_message'));


    const [current_message, setcurrent_message] = useState("");
    const [first_message_data, setfirst_message_data] = useState([]);

    const [send_message, setsend_message] = useState('')

    const [status, setstatus] = useState(false)

    async function getmessage(){
   let receiver=localmessage.username;
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
         if(result){
             setstatus(true);
         }
             
         
          
        setfirst_message_data(result);
          
          
          }
        useEffect(()=>{
          getmessage()
        },[current_message])


        const sentMessage=async()=>{
            let sender=localdata.user.username
            let receiver=localmessage.username
            let date=new Date();
            date=date.toString();
           let srt= date.split(' ');
            date=srt[1] + ' ' +srt[2];
            if(send_message){
        let formdata={sender,receiver,status,send_message, date };
        let result= await fetch('https://dilipbackend.xyz/api/message',{
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
        setsend_message('')
        if(result){
        
         setfirst_message_data([...first_message_data, messageobj])
        
            }
          }
        }

    return (
        <div className="mobile_box" style={{marginLeft:'10px'}} >
        {status ? (
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
                src={localmessage.img}
                onClick={()=>window.location.href=`/profile/${localmessage.username}`}
              />
              <h6>{localmessage.username}</h6>
            </div>
            <div style={{ display:'flex', flexDirection:'column',justifyContent:'space-evenly'}} >
        <div className="inbox_messages" style={{width:'90vw'}} >
{first_message_data.map((item)=>
item.sender!=localdata.user.username?
<p className='friend_child' >{item.message}</p>:
<p className='user_child' >{item.message}</p>
)}
        </div>
        <div className='send_message' style={{width:'80vw', marginLeft:'10px'}}   >
<div style={{display:'flex', alignItems:'center', position:'relative', top:'5px', justifyContent:'start'}} >
    <textarea style={{border:'none', boxSizing:'border-box',paddingTop:'10px',paddingLeft:'15px', borderRadius:'10px', width:'80%', boxShadow: '2px 0px 12px -5px rgb(0 0 0 / 35%)', outline:'none'}} type="text" placeholder='message...' onChange={(e)=>{
      setsend_message(e.target.value);
    }} value={send_message} />
    <i onClick={sentMessage} style={{color:'#0fabff', position:'relative', top:'1.8px', marginLeft:'15px', cursor:'pointer'}} ><SendIcon/></i>
    </div>

        </div>
        </div>
          </>
        ) : null}
      </div>
    )
}

export default MobileMessage
