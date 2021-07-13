import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";

function Messagecard({ img, username }) {
  const localdata=JSON.parse(localStorage.getItem('user-info'));
  
let message={img, username};
  
  return (

localdata?  localdata.user.username!=username?
  <>
    <div className="message_Card" onClick={()=>{
      localStorage.setItem('current_message', JSON.stringify(message));

if(window.innerWidth<630){
window.location.href='/mobileMessage'
}

    }}>
      <p
        style={{
          marginRight: "-25px",
          position: "relative",
          left: "70%",
          top: "-6px",
          fontSize: "0.7rem",
          color: "#b3b3b3",
        }}
      >
        Date
      </p>

      <Avatar style={{ height: "30px", width: "30px" }} src={img} />

      <div className="name_message">
        <h6 style={{color:'#454545'}} >{username}</h6>
        <h6 style={{ color: "gray", fontWeight: "400" }}>message...</h6>
      </div>
    </div>
    </>:null:null
  );
}

export default Messagecard;
