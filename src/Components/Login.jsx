import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import {useHistory} from 'react-router-dom';


function Login() {
    let history=useHistory();
useEffect(()=>{
    let mounted = true;
    if(mounted){
        if(localStorage.getItem('user-info')){
            history.push('/');
        }
      }
      return () => mounted = false;
}, [])

const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const [message, setmessage]=useState('');

const submit=async(e)=>{
  e.preventDefault();
if(email&&password){
setmessage("");

let item={email,password};

console.log(item);
let result= await fetch('https://dilipbackend.xyz/api/login',{
   method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    },
    body:JSON.stringify(item)
});
result=await result.json();
console.warn("result",result);
let jsonuser=result;
if(jsonuser.message){
    localStorage.removeItem('user-info');
    setmessage(jsonuser.message);
}else{
   

    localStorage.setItem("user-info", JSON.stringify(result));
history.push('/');
}


}else{
setmessage('*All fields mandatory*');
}


}


    return (
        <>
        <div className='login'>
<div className="welcome">
    <h5 style={{position:'relative', top:'17px'}}>Welcome,</h5>
    <p >Sign In to Continue</p>
</div>

<form onSubmit={submit} >
    <h1>Socimiya</h1>
    <input  type="email" required={true}  value={email} onChange={(e)=>{
setemail(e.target.value);
    }}  placeholder='Email' />
    <input onChange={(e)=>{
setpassword(e.target.value);
    }}  type="Password" placeholder='Password' />
    <input  className='submit' type="submit" value='Login'  />
    {message?<p style={{textAlign:'center', color:'red'}}>{message}</p>:null}
   
<p style={{textAlign:'center', marginTop:'10px'}}>New User?  <Link style={{textDecoration:'none', color:'orangered'}} to='/register' >Sign Up</Link> </p>
</form>

        </div>
        </>
    )
}

export default Login
