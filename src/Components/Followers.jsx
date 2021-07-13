import React, {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import {Avatar} from '@material-ui/core'
import FollowCheck from './FollowCheck';
function Followers() {
    const {username}=useParams();
const [result, setresult] = useState([]);
const [follow_status, setfollow_status] = useState(false);
let Localdata=JSON.parse(localStorage.getItem('user-info'));
    useEffect(()=>{
        follower_count();
          },[])
        
        async function follower_count(){
        let formdata=new FormData();
        formdata.append('username', username)
        let result=await fetch('https://dilipbackend.xyz/api/followers',
        {
          method:'POST',
          body:formdata
        })
        result=await result.json();
      setresult(result);
        }


 
    

    return (
        <>
         <h4 style={{textAlign:'center', color:'GrayText', marginTop:'50px'}} >{username} Followers</h4>
        <div style={{display:'grid', placeItems:'center', marginTop:'30px', width:'100%'}} >
           {result.length>0?
           result.map((item)=>
           
<div  key={item.id} style={{display:'flex', alignItems:'center', width:'280px',justifyContent:'space-between', marginTop:'10px'}} >
<Link to={`/profile/${item.followers}`} ><Avatar src={'https://dilipbackend.xyz/storage/profile/'+item.followers+`/profimage.png?${Date.now()}`}  /></Link>
<p>{item.followers}</p>
<FollowCheck 
username={item.followers}
checker_username={Localdata.user.username}
/>
</div>
           ):<p style={{textAlign:'center', marginTop:'25vh'}} >{username} has no followers yet :(</p>}
           
        </div>
        </>
    )
}


export default Followers
