import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Avatar} from '@material-ui/core'
function Story() {
    const params=useParams();
const [get_stories, setget_stories] = useState([])
const [backcolor, setbackcolor] = useState('white')
const [backcolor2, setbackcolor2] = useState('white')
const [current_id, setcurrent_id] = useState(Number(params.id))
const [current_index, setcurrent_index] = useState('');
const [first_display, setfirst_display] = useState(1)
const [second_display, setsecond_display] = useState(1)
useEffect(async()=>{
    let formdata=new FormData();
    formdata.append('id', current_id)
let result=await fetch('https://dilipbackend.xyz/api/checkstory')
result=await result.json()
if(current_id<result[0].id){
    window.location.href=`/story/${result[0].id}`
}else if(current_id>result[1].id){
    window.location.href=`/story/${result[1].id}`
}else if(current_id==result[0].id){
    setfirst_display(0)
}else if(current_id==result[1].id){
    setsecond_display(0);
}
},[])



function returnd(id, file_path, username, text,i){
    if(id==current_id){
    localStorage.setItem('current_index',JSON.stringify({i}))
       return  (
       <>
       <img style={{height:'405px', width:'250px', position:'relative', top:'-75px', borderRadius:'15px', zIndex:-1}} src={'https://dilipbackend.xyz/storage/Posts/'+file_path} alt="" />
       <p style={{fontSize:'1em', position:'absolute', marginTop:'-150px', color:'white', fontWeight:'bold', marginLeft:'14px', width:'200px',  textShadow:'0px 0px 4px rgba(0,0,0,0.45)'}} >{text}</p>
       <div onClick={()=>{
           window.location.href=`/profile/${username}`
       }}  style={{position:'relative', top:'-70px', display:'flex', alignItems:'center', cursor:'pointer'}} >
           <Avatar style={{height:'30px', width:'30px'}} src={'https://dilipbackend.xyz/storage/profile/'+username+`/profimage.png?${Date.now()}`} />
       <p style={{marginLeft:'10px', fontWeight:'bold', fontSize:'0.8rem', color:'GrayText'}} >{username}</p>
    
       </div>
       </>
       )   
   }
}

    useEffect(async()=>{
        let result=await fetch('https://dilipbackend.xyz/api/getstories');
        result=await result.json();
        setget_stories(result)
        console.log(result)
          },[])

          const previous=()=>{
              setbackcolor('lightblue')
              setTimeout(() => {
                  setbackcolor('white')
              }, 150);
       
             
            //     let formdata=new FormData();
            //     formdata.append('id', current_id-1)
            //     let result=await fetch('https://dilipbackend.xyz/api/story_status', {
            //         method:'POST',
            //         body:formdata
            //     })
            // result=await result.json()
            // if(result.count==0){
                
            //         window.location.href=`/story/${current_id-2}`  
                
            // }else{
                
            //     window.location.href=`/story/${current_id-1}`
            // }
            let id=JSON.parse(localStorage.getItem('current_index'))
           let current_story=id.i
            if(current_story>0){
                    window.location.href=`/story/${get_stories[current_story-1].id}`
            }
            

           
       
// setcurrent_id(get_stories[current_index-1].id)


          }

          const next=()=>{
            
              setbackcolor2('lightblue')
              setTimeout(() => {
                  setbackcolor2('white')
              }, 150);
            
            //   const check_story=async()=>{
            //     let formdata=new FormData();
            //     formdata.append('id', current_id+1)
            //     let result=await fetch('https://dilipbackend.xyz/api/story_status', {
            //         method:'POST',
            //         body:formdata
            //     })
            // result=await result.json()
            // if(result.count==0){
                
            //         window.location.href=`/story/${current_id+2}`  
                
            // }else{
                
            //     window.location.href=`/story/${current_id+1}`
            // }
            // }

            // check_story();
            let id=JSON.parse(localStorage.getItem('current_index'))
            let current_story=id.i
             if(current_story<get_stories.length-1){
                     window.location.href=`/story/${get_stories[current_story+1].id}`
             }

          }

if(get_stories.length>0){
    return (
        <div className='stories_container' style={{display:'flex', flexDirection:'column', alignItems:'center',  marginTop:'30px', justifyContent:'center', width:'100%', marginBottom:'50px'}} >
            <div className='stories' style={{height:'400px', width:'250px', borderRadius:'15px', boxShadow:'2px 0px 17px -5px rgb(0 0 0 / 25%)'}} >
<div style={{width:'90%', display:'flex', justifyContent:'space-between', position:'relative', top:'40%', left:'12px'}} >

    <h3 onClick={previous} style={{background:backcolor, boxShadow:'2px 0px 17px -5px rgb(0 0 0 / 25%)', display:'inline', borderRadius:'1000px', padding:'3px 10px', cursor:'pointer', paddingBottom:'6px', opacity:first_display}} >{'<'}</h3>

    <h3  onClick={next} style={{background:backcolor2, boxShadow:'2px 0px 17px -5px rgb(0 0 0 / 25%)', display:'inline', borderRadius:'1000px', padding:'3px 10px', cursor:'pointer', paddingBottom:'6px', opacity:second_display}} >{'>'}</h3>
</div>
           
          <div>
              {
              get_stories.map((item,i)=>
         returnd(item.id, item.file_path, item.username, item.text,i)
              )}
              </div> 
            </div>
        </div>
    )
}
return null
}

export default Story


