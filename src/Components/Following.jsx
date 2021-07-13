import React from 'react';
import { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import FollowCheck from './FollowCheck';
import {Avatar} from '@material-ui/core'

function Following() {
    const [following, setfollowing] = useState([]);
    const params=useParams();

    let Localdata=JSON.parse(localStorage.getItem('user-info'));
    useEffect(async()=>{
        let username=params.name;
        let formdata=new FormData();
        formdata.append('username', username)
    let result=await fetch('https://dilipbackend.xyz/api/followingstatus',{
      method:'POST',
      body:formdata
    })
    result=await result.json();
    setfollowing(result);
    
      },[])

        return (
        <div style={{marginTop:'40px'}} >
 <h4 style={{textAlign:'center'}} >{params.name} Following</h4>
<div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}} >
{following.map((item)=>

<div key={item.id} style={{width:'280px',  display:'flex', justifyContent:'space-evenly', alignItems:'center', marginTop:'15px'}} >
   
    <Link to={'/profile/'+item.username} ><Avatar src={'https://dilipbackend.xyz/storage/profile/'+item.username+`/profimage.png?${Date.now()}`} /></Link>
    <p>{item.username}</p>

<FollowCheck 
username={item.username}
checker_username={Localdata.user.username}
/>
</div>

)}
</div>
        </div>
    )
}

export default Following
