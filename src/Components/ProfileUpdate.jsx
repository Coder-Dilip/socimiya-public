import React, { useEffect, useState } from 'react';
import {Avatar} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {Link} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router-dom'

function ProfileUpdate() {

    const history=useHistory();

    const [file, setfile] = useState('');
    const [username, setusername] = useState('');
    const [website, setwebsite] = useState('');
    const [bio, setbio] = useState('');
    const [warning, setwarning] = useState('');
    const [files, setfiles] = useState('');
    const [imgsrc, setimgsrc] = useState('')

    const Localdata=JSON.parse(localStorage.getItem('user-info'));
   
    let id= Localdata.user.id;
  let item={id};
    useEffect(async ()=>{
      
        let result= await fetch('https://dilipbackend.xyz/api/serveuserdata',{
   method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify(item)
});
    
        result=await result.json();
setusername(result.username);
setbio(result.bio);
setwebsite(result.website);
setimgsrc(result.photourl?'https://dilipbackend.xyz/storage/profile/'+Localdata.user.username+'/profimage.png':null);  
    },[])
    





const handleChange=(e)=>{
setfile(URL.createObjectURL(e.target.files[0]))
setfiles(e.target.files[0]); 
}

 async function profSubmit(e){
e.preventDefault();

if(files&&username&&website&&bio){
    console.log('all inputs filled');
    const formdata=new FormData();
    formdata.append('id', id);
  formdata.append('file',files)
  formdata.append('username',Localdata.user.username)
  formdata.append('website', website);
  formdata.append("bio", bio);

  let result=await fetch('https://dilipbackend.xyz/api/editprofile?_method=PUT', {
      method:'POST',
      body:formdata
  }
  );
  result=await result.json();
  console.warn("profresult",result);

if(result.user.status=='true'){
    localStorage.setItem("user-info", JSON.stringify(result));
    const Localdata=JSON.parse(localStorage.getItem('user-info'));
    history.push('/profile/'+Localdata.user.username)
    window.location.reload();
}
}else{
    setwarning('Submit input fields with updated profile pic');
}


}




    return (
        <>
         <Link to={'/profile/'+Localdata.user.username} style={{margin:'20px', position:'relative', top:'20px'}} ><ArrowBackIcon/></Link>
        <div className='update_profile' > 
        <div className='profPic_div' style={{display:'flex', justifyContent:'center', width:'100%'}} >
            <div>
              <input className='image_input' type="file" onChange={handleChange} accept="image/png"/>
        <Avatar src={file?file:imgsrc}   style={{borderRadius:'50%', height:'50px', width:'50px', filter:'brightness(.7)', boxShadow:'2px 0px 17px -5px rgb(0 0 0 / 45%)'}}/>
        < PhotoCamera  style={{position:'relative', top:'-35px', left:'15px', color:'white', height:'20px', width:'20px',boxShadow:'2px 0px 17px -5px rgb(0 0 0 / 85%)'}} />
        </div>
        </div>

<div className="insta_profile_details">
<form className='prof_form'  encType="application/x-www-form-urlencoded"  >
<input value={website} type="url" placeholder='website' required={true} onChange={(e)=>{
    setwebsite(e.target.value)
}} />
<input style={{height:'auto'}} value={bio} type="text" placeholder='Bio'required={true} onChange={(e)=>{
    setbio(e.target.value)
}}  />
<input type="submit" value='submit' onClick={profSubmit} />
</form>
{warning?<p style={{color:'orangered', textAlign:'center'}} >{warning}</p>:null}
</div>

        </div>
        </>
    )
}

export default ProfileUpdate
