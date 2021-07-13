import React, {useEffect, useState} from 'react'
import {Avatar } from '@material-ui/core'
import {Link, useHistory, useParams} from 'react-router-dom'

function Comments() {
const {params}=useParams();
    const history=useHistory();
    const localComment=JSON.parse(localStorage.getItem('user-comments'))
    const localdata=JSON.parse(localStorage.getItem('user-info'));
const [comment, setcomment] = useState('');
const [getComment, setgetComment] = useState([]);


useEffect(()=>{
get_comment();
},[]);

async function get_comment(){
    let formdata=new FormData();
    formdata.append('id', localComment.id )
    let result=await fetch('https://dilipbackend.xyz/api/getsinglecomment',{
        method:'POST',
        body:formdata
    })
    result=await result.json();
    setgetComment(result);
}


    
    async function comment_submit(e){
        get_comment()
        e.preventDefault()
        let date=new Date();
        date=date.toString();
       let srt= date.split(' ');
        date=srt[1] + ' ' +srt[2];
        let commenter=localdata.user.username;
        let receiver=localComment.name
        let post_id=localComment.id
let formdata=new FormData();
formdata.append('commenter', commenter)
formdata.append('receiver', receiver)
formdata.append('post_id',post_id)
formdata.append('comment', comment)
formdata.append('date', date)

let result=await fetch('https://dilipbackend.xyz/api/comment',{
    method:'POST',
    body:formdata
})
result=await result.json()
setcomment('');
if(result){
    window.location.reload()
}
    }

    return (
        <div>
            <h4 onClick={()=>history.goBack()} style={{marginLeft:'30px', marginTop:'60px', cursor:'pointer'}} > {'<'} Comments</h4>
         <Link style={{textDecoration:'none', color:'black'}} to={`/profile/${localComment.name}`} ><div style={{display:'flex', alignItems:'center', margin:'20px', marginLeft:'30px'}} >
               <Avatar src={'https://dilipbackend.xyz/storage/profile/'+localComment.name+`/profimage.png?${Date.now()}`} alt="" style={{height:'30px', width:'30px'}} />
               <h6 style={{color:'black', marginLeft:'10px'}} >{localComment.name}</h6>
           </div></Link>
           <p style={{marginLeft:'72px', marginTop:'-30px', color:'GrayText'}} >{localComment.desc}</p>

           { getComment.length>0? getComment.map((item)=>
           <>
           <div style={{display:'flex', alignItems:'center', marginLeft:'30px'}} >
           <Link to={`/profile/${item.commenter}`} ><Avatar src={'https://dilipbackend.xyz/editprofile/'+item.commenter+'/profimage.png'} style={{height:'30px', width:'30px'}} /></Link>
           <h6 style={{color:'GrayText', marginLeft:'10px'}} >{item.commenter}</h6>
           <p style={{fontSize:'0.8rem', marginLeft:'20px'}}>{item.comment}</p>
           <p style={{fontSize:'0.5rem', marginLeft:'10px'}}>{item.date}</p>
           </div>
           </>
           ):<p style={{marginLeft:'70px', position:'relative', top:'10px'}} >Be first to comment :)</p>}
           <div style={{marginLeft:'30px', display:'flex', alignItems:'center', width:'300px'}} >
               <Avatar style={{height:'30px', width:'30px', marginTop:'-90px'}} src={'https://dilipbackend.xyz/editprofile/'+localdata.user.username+'/profimage.png'} />
               <form onSubmit={comment_submit} style={{marginTop:'-90px'}} >
<input type="text" placeholder={`comment as ${localdata.user.username}...`} style={{marginLeft:'10px', border:'none', paddingTop:'5px', paddingBottom:'5px',  background:'#f2f2f2', paddingLeft:'10px', borderRadius:'5px', outline:'none'}} onChange={(e)=>{
setcomment(e.target.value)
}} value={comment} />
<input type="submit" style={{opacity:0, position:'absolute', zIndex:-1}} />
</form>
           </div>
        </div>
    )
}

export default Comments
