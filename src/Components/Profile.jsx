import React, {useEffect, useState} from "react";
import {Avatar, Button} from '@material-ui/core';
import {useHistory, Link, NavLink} from 'react-router-dom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useParams } from 'react-router';
import { HashLink as Links } from 'react-router-hash-link';

function Profile() {
  let history=useHistory();

  useEffect(()=>{
    let mounted = true;
    if(mounted){
        if(!localStorage.getItem('user-info')){
            history.push('/login');
        }
      }
      return () => mounted = false;
     
  }, []);

  const [sample, setsample] = useState([]);
  const [getProfile, setgetProfile] = useState([]);

const {profile}=useParams();

  useEffect(()=>{
    let img=`https://dilipbackend.xyz/editprofile/${profile}/profimage.png`;
    let username=profile;
    localStorage.setItem('current_message', JSON.stringify({img,username}))
    let mounted=true;
    if(mounted){
        if(!localStorage.getItem('user-info')){
            history.push('/login');
            }
      }
      return () => mounted = false;
}, [])

const Localdata=JSON.parse(localStorage.getItem('user-info'));

useEffect(async()=>{
let username=profile;
let formdata=new FormData();
formdata.append('username', username);
let result=await fetch('https://dilipbackend.xyz/api/getimages', {
  method:'POST',
 
  body:formdata
}
);
setsample(await result.json());
localStorage.setItem('clicked_img_owner',JSON.stringify( {profile}))
// console.warn("images",result);

 }
,[]);

useEffect(async()=>{
let username=profile;
let formdata=new FormData();
formdata.append('username', username);
let result=await fetch('https://dilipbackend.xyz/api/getprofile', {
  method:'POST',
 
  body:formdata
}
);
setgetProfile(await result.json());

},[]);




  const [picurl, setpicurl] = useState('')
  const [window_status, setwindow_status] = useState('');
const [logout_status, setlogout_status] = useState(false);
const [current_profile, setcurrent_profile] = useState('');
const [post_status, setpost_status] = useState(true);
const [product_status, setproduct_status] = useState(false);
const [post_color, setpost_color] = useState('orangered');
const [product_color, setproduct_color] = useState('black');
const [product, setproduct] = useState([]);
const [following, setfollowing] = useState([]);

  useEffect(()=>{
    var currentLocation = window.location.href;
    const splittedLocation=currentLocation.split('/');
    if(Localdata){
      setcurrent_profile(profile);
    if(profile==Localdata.user.username){
      setwindow_status(true);
    }else{
      setwindow_status(false);
    }
}
  },[]);


  useEffect(async()=>{
    let username=profile;
    let formdata=new FormData();
    formdata.append('username', username)
let result=await fetch('https://dilipbackend.xyz/api/followingstatus',{
  method:'POST',
  body:formdata
})
result=await result.json();
setfollowing(result);

  },[])

const [followers, setfollowers] = useState([])
const [follow_status, setfollow_status] = useState(false);
const [clicked, setclicked] = useState(0);
  useEffect(()=>{
follower_count();
  },[follow_status])

async function follower_count(){
  let username=profile;
let formdata=new FormData();
formdata.append('username', username)
let result=await fetch('https://dilipbackend.xyz/api/followers',
{
  method:'POST',
  body:formdata
})
result=await result.json();
setfollowers(result);
setclicked(result.length);
}

useEffect(async()=>{
  let username=profile;
  let formdata=new FormData();
  formdata.append('username', username);
  formdata.append('followers', Localdata.user.username);

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
 

  async function follow(e){
    follower_count();
    e.preventDefault();
    let date=new Date();
    date=date.toString();
   let srt= date.split(' ');
    date=srt[1] + ' ' +srt[2];
    let username=profile;
    let formdata=new FormData();
    formdata.append('username', username);
    formdata.append('followers', Localdata.user.username);
    formdata.append('date', date);

    let result=await fetch('https://dilipbackend.xyz/api/follow',{
      method:'POST',
      body:formdata
    })
    result =await result.json();
   if(result.follow=='success'){
     setfollow_status(true)
setclicked(true);
   }else{
     setfollow_status(false);
     setclicked(false)
   }
  
  }


  const get_product= async()=>{
    let formdata=new FormData();
    formdata.append('username',profile);
   

let result=await fetch('https://dilipbackend.xyz/api/getsuggestedproduct',{
  method:'POST',
  body:formdata
})
result=await result.json();
setproduct(result);
  }
  
 
  useEffect(()=>{
 if(Localdata){setpicurl(Localdata.user.photourl);
 }
   let mounted=true;
   if(mounted){
    if(profile==Localdata.user.username){
    if(!localStorage.getItem('user-info')){
        history.push('/login');
    }else if(Localdata.user.status==='false') {
   history.push('/profileupdate')
    }
  }
     }
     return () => mounted = false;
  }, [])

function logout(){
  localStorage.clear();
  history.push('/login');
  window.location.reload()
}

if(logout_status){
  if(window.confirm('Leaving so soon?')){
logout();
return;
  }else{
    window.location.reload()
  }
}
  return (
    <>


      <div className="profile">
      
        <input type="text" placeholder="search..." />
       
<div className="profile_section">
        <div className="proflie_details">
            <div  >
            <Avatar   src={'https://dilipbackend.xyz/storage/profile/'+profile+`/profimage.png?${Date.now()}`} alt="" style={{height:'35px', width:'35px', borderRadius:'50%', position:'relative', top:'12px', left:'-6px'}} />
            </div>


            {/* <Avatar onClick={(e)=>console.log(e.target.src)} src='httpss://avatars.githubusercontent.com/u/74497003?s=60&v=4' /> */}


            <div className="profile_info">
                <div className="profile_name">
                    <h5 style={{position:'relative', left:'6px'}} >{profile}</h5>
                 
                 {!window_status?
                 <>
                    {!follow_status?<button onClick={follow} >Follow</button>:
                    <button onClick={follow} style={{background:'lightgray', color:'black'}} >unfollow</button>
                    }
                    <button onClick={()=>history.push('/mobileMessage')} >Message</button>
                    </>:null
                 }

                  
                </div>
                    {window_status?
                    <>
                    <Link to='/profileupdate'><button style={{padding:'6px 25px', backgroundColor:'#428af5', border:'none', fontWeight:'bold', color:'white', borderRadius:'3px', cursor:'pointer', position:'relative', top:'-5px', left:'7px'}} >Edit</button></Link>

                    <div onClick={()=>setlogout_status(true)} style={{position:'relative', left:'100px', top:'-30px', cursor:'pointer', color:'gray',}} ><PowerSettingsNewIcon   /></div>
                    </>:null
}
                <div className="profile_description">
                    <p>{getProfile.length>1?history.push('/'):getProfile.length==1? getProfile[0].bio:null}</p>
                    
                </div>
            </div>
        </div>

        <div className="profile_followers">
           <p onClick={()=>window.location.href=`/posts/${profile}`} >{sample.length>0?sample.length:0} <br /><span style={{fontWeight:'bold', fontSize:'.8rem'}} >posts</span></p>

           <p><Link style={{textDecoration:'none', color:'black'}} to={`/followers/${profile}`} >{followers.length>0?clicked:0} <br /><span style={{fontWeight:'bold', fontSize:'.8rem'}} >followers</span></Link></p>

           <p><Link style={{textDecoration:'none', color:'black'}} to={`/following/${profile}`} >{following.length>0?following.length:0} <br /><span style={{fontWeight:'bold', fontSize:'.8rem'}} >following</span></Link></p>
          
        </div>
        </div>

        <div className="profile_posts">
          <div style={{display:'flex', width:'100px', justifyContent:'space-between'}} >
          <h4 style={{position:'relative', left:'55px', top:'20px',  width:'39px', padding:'3px 0px', borderRadius:'2px 2px 2px 2px',  color:post_color, cursor:'pointer'}} onClick={()=>{
            setpost_status(true);
            setproduct_status(false);
            setpost_color('orangered');
            setproduct_color('black');
          }} >Posts</h4>
          <h4 onClick={()=>{
            setpost_status(false);
            setproduct_status(true);
            setpost_color('black');
            setproduct_color('orangered');
            get_product();
          }}  style={{position:'relative', left:'55px', top:'20px',  width:'39px', padding:'3px 0px', borderRadius:'2px 2px 2px 2px',  color:product_color, cursor:'pointer'}}>Products</h4>
          </div>
          <div className="post_profile">
            {sample.length>0 || product.length>0 ?<div className="prof_img">
              {post_status?
          sample.reverse().map((item)=>
<Links to={`/posts/${item.username}#section${item.id}`} ><img className='prof_sub_image' key={item.id}  src={'https://dilipbackend.xyz/storage/Posts/'+item.file_path} style={{height:'150px', width:'150px', borderRadius:'5px', margin:'10px'}}   alt="" /></Links>

            ) 
            :product.length>0?
            product.reverse().map((item)=>
            <img onClick={()=>{
              let img=item.main_img;
              let desc= item.description;
              let id=item.id;
              let price=item.price;
              let username=item.username;
let stringed={img, desc, id, price,username}
localStorage.setItem('product-info', JSON.stringify(stringed))
              
              window.location.href=`/shop/product/${item.id}`
            }} key={item.id}  src={'https://dilipbackend.xyz/storage/products/'+item.main_img} style={{height:'150px', width:'150px', borderRadius:'5px'}}  alt="" />
                        ) 
            
            :<p style={{fontWeight:'bold', textAlign:'center', color:'gray', fontSize:'.8rem', marginLeft:'14px'}}>{profile} hasn't uploaded any Products yet :(</p>}
          </div>:<p style={{fontWeight:'bold', textAlign:'center', color:'gray', fontSize:'.8rem', marginLeft:'14px'}}>{profile} hasn't uploaded any content yet :(</p>}
          </div>
        </div>
   
      </div>
     
     
    </>
  );
}

export default Profile;
