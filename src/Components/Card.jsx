import React, { useEffect, useState } from 'react';
import {Avatar} from '@material-ui/core'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { HashLink as Links } from 'react-router-hash-link';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {useHistory} from 'react-router-dom'

function Card({ name, desc, profile, img, date, id, mode }) {
    const history=useHistory();
const [clicked, setclicked] = useState(true);
const [like_status, setlike_status] = useState(false);
const [likes_count, setlikes_count] = useState('');
const [comments, setcomments] = useState([]);
let Localdata=JSON.parse(localStorage.getItem('user-info'));

useEffect(async()=>{
let formdata=new FormData();
formdata.append('id', id )
let result=await fetch('https://dilipbackend.xyz/api/getsinglecomment',{
    method:'POST',
    body:formdata
})
result=await result.json();
setcomments(result);
},[])


useEffect(async()=>{
    let formdata=new FormData();
    formdata.append('id', id);
    formdata.append('username', Localdata.user.username);
let result=await fetch('https://dilipbackend.xyz/api/likestatus',{
    method:'POST',
    body:formdata
})
result=await result.json();

if(result.status=='true'){
    setlike_status(true);
    setclicked(false)
    setlikes_count(result.count);
}else{
    setlike_status(false);
    setclicked(true)
    setlikes_count(result.count);
}
},[])
    const clicked_fun=()=>{

console.log(clicked);
if(clicked){
setclicked(false);
setlike_status(true)
likefun();
setlikes_count(likes_count+1);
}else{
setclicked(true)
setlike_status(false)
dislikefun();
setlikes_count(likes_count-1);
}
    }

   async function likefun(){
       let formdata=new FormData();
       formdata.append('id', id);
       formdata.append('username', Localdata.user.username);
       formdata.append('post_owner', name);
       formdata.append('img_source', img);
formdata.append('style', 'like');
let result=await fetch('https://dilipbackend.xyz/api/like',{
    method:'POST',
body:formdata
})
result=await result.json();

    }
   async function dislikefun(){
       let formdata=new FormData();
       formdata.append('id', id);
       formdata.append('username', Localdata.user.username);
formdata.append('style', 'dislike');
let result=await fetch('https://dilipbackend.xyz/api/like',{
    method:'POST',
body:formdata
})
result=await result.json();

    }
    if(mode=='story'){
return null
    }
    return (
        <>
       <div className='card' style={{minHeight:'458px'}}  >
       <Links style={{textDecoration:'none', color:'black'}} to={`/profile/${name}`} ><div className='prof_details'>
<Avatar style={{width:'35px', height:'35px', margin:'10px', position:'relative', top:'-3px'}} src={profile}/>
<div className='name_date'>
<p>{name}</p>
<p>{date}</p>
</div>
</div>
</Links>
<img onDoubleClick={clicked_fun} src={img} alt="" />
<p>{desc}</p>
<div className="image_actions">
    <div onClick={clicked_fun} >{like_status?<FavoriteIcon style={{color:'#eb4f34', cursor:'pointer'}} />:<FavoriteBorderOutlinedIcon style={{cursor:'pointer'}} />}<span style={{position:'relative', top:'2px', left:'5px', display:'block', fontSize:'.8rem', color:'#575757'}} ></span></div>
<div  onClick={()=>{
    localStorage.setItem('user-comments', JSON.stringify({id, name, desc}))
    history.push(`/comments/${id}`); window.location.reload()}}  style={{ display:'flex', width:'100px', flexDirection:'column', justifyContent:'center'}}>
<ChatBubbleOutlineIcon />
</div>
    <LabelOutlinedIcon style={{transform:'rotate(-90deg)', position:'relative', top:'-1px'}} />
</div>

<p  style={{position:'relative', left:0, top:-10}}>{likes_count>0?likes_count>1? likes_count+ ' likes':likes_count+ ' like':null}</p>
{comments.length>0?<p style={{ fontSize:'.8rem', color:'#575757', position:'relative', top:likes_count>0?'-40px':'-10px', left:'65px'}} >{comments.length} comments</p>:null}

</div>


        </>
    )
}

export default Card
