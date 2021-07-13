import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {Avatar} from '@material-ui/core'
import { HashLink as Link } from 'react-router-hash-link';
import {useHistory} from 'react-router-dom'

function Likes() {
   const history=useHistory();

  const [getLikes, setgetLikes] = useState([]);
  const [get_followers, setget_followers] = useState([]);
  const [likes, setlikes] = useState(true);
  const [followers, setfollowers] = useState(false);
const [likesColor, setlikesColor] = useState('orangered')
const [followersColor, setfollowersColor] = useState('black')

  let Localdata = JSON.parse(localStorage.getItem("user-info"));

  let profile=Localdata.user.username;


  useEffect(async () => {
    let Formdata = new FormData();
    Formdata.append("username", Localdata.user.username);
localStorage.setItem('clicked_img_owner', JSON.stringify({profile}))
    let result = await fetch("https://dilipbackend.xyz/api/get_all_likes", {
      method: "POST",
      body: Formdata,
    });
    result = await result.json();
    setgetLikes(result);
    console.log(getLikes)
  }, []);

useEffect(async()=>{
let username=Localdata.user.username;
let formdata=new FormData();
formdata.append('username', username)
let result=await fetch('https://dilipbackend.xyz/api/followers',{
  method:'POST',
  body:formdata
});
result=await result.json();
setget_followers(result);
console.log('follower' ,result[0])
},[])

  return (
    <>
    <div style={{ margin: "30px", display:'flex', flexDirection:'column', justifyContent:'center' }}>
      <div style={{display:'flex', justifyContent:'center', width:'80%'}} >
      <h4 onClick={()=>{
        setlikesColor('orangered');
        setfollowersColor('black');
        setfollowers(false)
        setlikes(true)
      }} style={{ color: likesColor, cursor:'pointer', marginRight:'50px' }}>Likes</h4>
      <h4 onClick={()=>{
        setlikesColor('black')
        setfollowersColor('orangered')
        setfollowers(true)
        setlikes(false)
      }} style={{ color: followersColor, cursor:'pointer' }}>Followers</h4>
      </div>
      <div className="likes_container" style={{display:'flex',  flexDirection:'column', alignItems:'center'}}>
        {likes?getLikes.reverse().map((item) => (
            <>
            <Link key={item.post_id} style={{textDecoration:'none', color:
'#696969'
}} to={`/posts/${Localdata.user.username}#section${item.post_id}`}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-evenly', width:'260px', cursor:'pointer', marginTop:'10px'}} >
  {  item.liked_by!=Localdata.user.username?          
  <>
<Avatar src={'https://dilipbackend.xyz/storage/profile/'+item.liked_by+`/profimage.png?${Date.now()}`} />
<h6>{item.liked_by+' liked your post'}</h6>
<div>

  {/* i have changed url little bit cause direct url of item.img_source is different  */}
<img src={item.img_source} width='30px' style={{borderRadius:'5px'}} height='30px' alt="" />
</div>
</>
:null}
          </div>
          </Link>
         </>
        )):get_followers.length>0?
        get_followers.reverse().map((item)=>
<div key={item.id} style={{width:'270px', display:'flex', justifyContent:'space-evenly', alignItems:'center', margin:'10px'}} >
<Link style={{textDecoration:'none', color:'graytext'}} to={'/profile/'+item.followers} ><Avatar  src={'https://dilipbackend.xyz/storage/profile/'+item.followers+`/profimage.png?${Date.now()}`} /></Link>
<Link  style={{textDecoration:'none', color:'graytext'}} to={'/profile/'+item.followers}  ><p style={{fontSize:'0.8rem'}} ><strong>{item.followers}</strong> started following You</p></Link>
<p style={{fontSize:'0.5rem', fontWeight:'bold', color:'GrayText'}} >{item.date}</p>
</div>
        ):null
        
        }
      </div>
    </div>
    {(likes&&getLikes.length==0)||(likes&&getLikes.length==1&&getLikes[0].liked_by==Localdata.user.username)?<p style={{marginTop:'-300px', fontWeight:'bold', color:'orangered', display:'block', textAlign:'center'}} >No likes Yet :(</p>:null}
    {followers&&get_followers.length==0?<p style={{marginTop:'-300px', fontWeight:'bold', color:'orangered', display:'block', textAlign:'center'}} >No Followers Yet :(</p>:null}
    </>
  );
}

export default Likes;
