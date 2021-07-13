import React, {useEffect, useState} from 'react'
import Card from './Card';
import {Avatar} from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link, useHistory} from 'react-router-dom';
import 'swiper/swiper-bundle.css';


function Home() {
  const [get_profiles, setget_profiles] = useState([]);
  const [get_stories, setget_stories] = useState([])



    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
const [imgsrc, setimgsrc] = useState('');
     

useEffect(async()=>{
  let result=await fetch('https://dilipbackend.xyz/api/getstories');
  result=await result.json();
  setget_stories(result)
  
    },[])


  let history=useHistory();
  useEffect(()=>{
    let mounted = true;
    if(mounted){
        if(!localStorage.getItem('user-info')){
            history.push('/register');
        }
      }
      return () => mounted = false;
     
  }, []);

  useEffect(async()=>{
    let result=await fetch('https://dilipbackend.xyz/api/getprofiles');
   result= await result.json();
   setget_profiles(result);   
  },[]);

  
  

    return (
        <>
       
     <div className="home">
         <div className="story_Section" style={{overflow:'hidden'}}>
         <Swiper
     breakpoints={{
         '280':{
            "slidesPerView": 3,
            "spaceBetween": 20
         },
         '350':{
            "slidesPerView": 4,
            "spaceBetween": 20
         },

         '500':{
            "slidesPerView": 5,
            "spaceBetween": 20
         },
        "640": {
          "slidesPerView": 6,
          "spaceBetween": 20
        },
        "768": {
          "slidesPerView": 6,
          "spaceBetween": 20
        },
        "1024": {
          "slidesPerView": 8,
          "spaceBetween": 20
        },

        "1424":{
            "slidesPerView": 8,
            "spaceBetween": 20  
        }
       
    
    }}
      
     
      draggable= {true}
    >
         {get_stories.length>0?get_stories.reverse().map((item)=>
<SwiperSlide key={item.id} ><Avatar onClick={()=>window.location.href=`/story/${item.id}`} src={'https://dilipbackend.xyz/storage/profile/'+item.username+`/profimage.png?${Date.now()}`} style={{cursor:'pointer'}} /></SwiperSlide>
            ):null} 
            </Swiper>
         </div>
        <div className="feed" >
            <h3 style={{marginTop:'10px', position:'relative',top:'15px', left:'25px', display:'block'}}>Feed</h3>
            <div className="cards">
            {get_profiles.map((item)=>
        
<Card
key={item.id} 
name={item.username}
desc={item.text}
profile={'https://dilipbackend.xyz/storage/profile/'+item.username+`/profimage.png?${Date.now()}`}
img={'https://dilipbackend.xyz/storage/Posts/'+item.file_path}
date={item.date}
likes={1}
id={item.id}
mode={item.mode}
/>
            
            )}  
            </div>
        </div>
     </div>
   

        
       </>
    )
}

export default Home
