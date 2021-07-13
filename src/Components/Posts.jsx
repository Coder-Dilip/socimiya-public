import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Card from './Card';
import './style.css';
function Posts() {
    const [sample, setsample] = useState([]);
 
    
let localdata=JSON.parse(localStorage.getItem('user-info'))
    useEffect(async()=>{
        let url=window.location.href
        let splitted=url.split('/')
        let profile_part=splitted[splitted.length-1]
        let secondsplit=profile_part.split('#');
        let username=secondsplit[0];
        let formdata=new FormData();
        formdata.append('username', username);
        let result=await fetch('https://dilipbackend.xyz/api/getimages', {
          method:'POST',
          body:formdata
        }
        );
    result=await result.json();
        setsample(result);
    
         }
        ,[]);
    return (
        <div style={{display:'flex', alignItems:'center', flexDirection:'column',width:'100%'}} >
           {sample.reverse().map((item)=>
           <>
           <div key={item.id}  className='posts_cards' id={'section'+item.id} >
<Card
key={item.id} 
name={item.username}
desc={item.text}
profile={'https://dilipbackend.xyz/storage/profile/'+item.username+`/profimage.png?${Date.now()}`}
img={'https://dilipbackend.xyz/storage/Posts/'+item.file_path}
date={item.date}
id={item.id}
/>
</div>

</>
            )} 
        </div>
    )
}

export default Posts
