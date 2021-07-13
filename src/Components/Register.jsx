import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'

function Register() {

let history=useHistory();
useEffect(()=>{
    if(localStorage.getItem('user-info')){
        history.push('/');
    }
}, [])
const [username, setusername] = useState('');
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const [confirmpassword, setconfirmpassword] = useState('');
const [message, setmessage] = useState('')
const status='false';
const register=async (e)=>{
    e.preventDefault();
if(username&&email&&password&&confirmpassword){
if(password===confirmpassword){
setmessage("");

let item={username,email,password,status};

console.log(item);
let result= await fetch('https://dilipbackend.xyz/api/register',{
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
let user=result;
if(jsonuser.username){
    let userobj= {user}
localStorage.setItem("user-info", JSON.stringify(userobj));
history.push('/');
}else{
    localStorage.removeItem('user-info');
}

}else{
    setmessage('*Password not matching*')
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
    <p >Sign Up to Continue</p>
</div>

<form onSubmit={register} style={{marginTop:'55px'}} action="">
    <h1>Socimiya</h1>
    <input value={username} onChange={(e)=>{
setusername(e.target.value)
    }} type="text" placeholder='Username' />
    <input value={email} onChange={(e)=>{
setemail(e.target.value)
    }} type="email" placeholder='Email' />
    <input  value={password} onChange={(e)=>{
setpassword(e.target.value)
    }} type="Password" placeholder='Password' />
    <input value={confirmpassword} onChange={(e)=>{
setconfirmpassword(e.target.value)
    }}  type="Password" placeholder='Confirm Password' />
    <input className='submit' type="submit" value='Register' />
   
{message?<p style={{textAlign:'center', color:'red', fontWeight:'bold'}}>{message}</p>:null}
<p style={{textAlign:'center',marginTop:'8px', display:'block'}}>Have an Account?  <Link style={{textDecoration:'none', color:'orangered'}} to='/login' >Login</Link> </p>
</form>

        </div>
        </>
    )
}

export default Register
