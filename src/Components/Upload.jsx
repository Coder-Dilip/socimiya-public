import React, {useState} from "react";
// import { NavLink } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import SettingsInputSvideoIcon from '@material-ui/icons/SettingsInputSvideo';
import EditIcon from '@material-ui/icons/Edit';
function Upload() {
  const history=useHistory();
   let localdata= JSON.parse(localStorage.getItem('user-info'));
   const [mode, setmode] = useState('');
   const [file, setfile] = useState('');
   const [fileurl, setfileurl] = useState('');
   const [display, setdisplay] = useState('flex');
   const [text, settext] = useState('');


   const handleChange1=(e)=>{
       setmode('feed');
       if(e.target.files[0]){
       setfileurl(URL.createObjectURL(e.target.files[0]))
setfile(e.target.files[0]); 
   setdisplay('none');
}}

   const handleChange2=(e)=>{
       setmode('story');
       if(e.target.files[0]){
       setfileurl(URL.createObjectURL(e.target.files[0]))
       setfile(e.target.files[0]);
       setdisplay('none');
       }; 
   }

   const editImage=(e)=>{
if(e.target.files[0]){
setfileurl(URL.createObjectURL(e.target.files[0]))
setfile(e.target.files[0])
}
   }

   const submit_post=async(e)=>{
    let date=new Date();
    date=date.toString();
   let srt= date.split(' ');
    date=srt[1] + ' ' +srt[2];
       e.preventDefault();
  let formdata=new FormData();
  formdata.append('username', localdata.user.username);
  formdata.append('file',file);
  formdata.append('text', text);
  formdata.append('mode', mode);
  formdata.append('date', date)
  let result=await fetch('https://dilipbackend.xyz/api/post_image', {
    method:'POST',
    body:formdata
}
);
result=await result.json();
console.warn("postresult",result);
if(result){
history.push('/profile/'+localdata.user.username)
}

   }

  return (
    <>
      <div className="upload_modal">
        <div className="modal_container"  style={{display:display}}>
          <h4 style={{ marginTop: "-5px" }}>Upload</h4>
          <p style={{ textAlign: "center", marginTop: "-10px" }}>
            Choose whether to post in story mode or in regular mode
          </p>
          <p style={{color:'gray', margin:'-0px', position:'relative', top:'-5px'}} >1:1 Aspect Ratio Recommended ;)</p>

          <div className="select_mode">
            <div className="regular_feed">
            <input accept="image/png, image/gif, image/jpeg" style={{position:'absolute', opacity:'0'}} type="file" onChange={handleChange1} accept="image/x-png,image/jpeg"/>
              Feed Post 
               <RssFeedIcon style={{color:'#ff9500'}} />
            </div>

            <div className="story_mode">
            <input accept="image/png, image/gif, image/jpeg" style={{position:'absolute', opacity:'0'}} type="file" onChange={handleChange2} accept="image/x-png,image/jpeg"/>
           Story Post
            <SettingsInputSvideoIcon style={{color:'#46d454'}} />
            </div>
          </div>
        <NavLink exact to={'/profile/'+ localdata.user.username} ><button style={{padding:'8px 20px', borderRadius:'5px', outline:'none', border:'none', backgroundColor:'#0099ff', color:'white', cursor:'pointer'}} >Back</button></NavLink>
        
        </div>

        {display==='none'?
    <>

    <div className="upload_img">
    <EditIcon style={{position:'absolute',background:'white', borderTopLeftRadius:'4px',padding:'5px',borderBottomRightRadius:'20px',color:'orangered',cursor:'pointer'}} />
      <input type="file" accept="image/png, image/gif, image/jpeg" onChange={editImage} style={{position:'absolute',width:'40px',opacity:0,cursor:'pointer',marginTop:'4px'}} />
    <img src={fileurl} alt="" />
<textarea style={{display:'block', width:'86%', maxHeight:'15px', padding:'20px', borderRadius:'5px', border:'1px solid gray', outline:'none'}} name="" id="" cols="30" rows="10" placeholder='Write a Caption...' value={text} onChange={(e)=>{
settext(e.target.value);
}} ></textarea>
<button onClick={submit_post} style={{padding:'7px 25px', borderRadius:'5px', outline:'none', border:'none', backgroundColor:'#0099ff', color:'white', cursor:'pointer', marginTop:'3.8px'}} >Post</button>
    </div>
    </>    
    :null}
      </div>
    </>
  );
}

export default Upload;
