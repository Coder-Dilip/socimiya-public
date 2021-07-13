import React, { useEffect, useState } from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import { NavLink, useHistory } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import LiveTvOutlinedIcon from '@material-ui/icons/LiveTvOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {Avatar} from '@material-ui/core'
// import Upload from "./Upload";
function Header() {
    const history=useHistory();
    useEffect(()=>{
        let mounted=true;
        if(mounted){
            if(!localStorage.getItem('user-info')){
                history.push('/login');
                }
          }
          return () => mounted = false;
    }, [])
  const Localdata=JSON.parse(localStorage.getItem('user-info'));

  var w = window.innerWidth;
  
  const [location, setlocation] = useState('');
    
 

  setInterval(() => {
    setlocation(window.location.href)
  }, 100);

  var splits=location.split('/');
  return (
    <>
      <div className="header">
        
       <NavLink exact to='/' style={{textDecoration:'none', color:'black'}} ><div className="logo">
          <InstagramIcon />
          <h3>Socimiya</h3>
        </div></NavLink>


        <div className="navlinks">

         {Localdata? <NavLink exact style={{textDecoration:'none', color:'grey'}} activeStyle={{color:'black'}} to='/'>{splits[splits.length-1]==''?<HomeIcon style={{cursor:'pointer'}} />:<HomeOutlinedIcon style={{cursor:'pointer'}} />}</NavLink>:null}

         {Localdata? <NavLink exact style={{textDecoration:'none', color:'grey'}} activeStyle={{color:'black'}} to='/shop' >{splits[splits.length-1]=='shop'?<LocalMallIcon style={{cursor:'pointer'}} />:<LocalMallOutlinedIcon style={{cursor:'pointer'}} />}</NavLink>:null}

         {Localdata? <NavLink exact style={{textDecoration:'none', color:'grey'}} activeStyle={{color:'black'}} to='/igtv' >{splits[splits.length-1]=='igtv'?<LiveTvIcon style={{cursor:'pointer'}} />:<LiveTvOutlinedIcon style={{cursor:'pointer'}} />}</NavLink>:null}

         {Localdata? <NavLink onClick={() => window.location.href='/profile/'+Localdata.user.username} exact style={{textDecoration:'none'}}  to={  '/profile/'+Localdata.user.username} ><Avatar src={Localdata.user.status=='true'? 'https://dilipbackend.xyz/storage/profile/'+Localdata.user.username+`/profimage.png?${Date.now()}`:null} style={{height:'23px', width:'23px'}} /></NavLink>:null}

        </div>

        <div className="rightpart">

      <NavLink exact to='/likes'  style={{color:'grey'}}  activeStyle={{color:'black'}} > 
      {splits[splits.length-1]=='likes'?<FavoriteIcon style={{width:'20px',cursor:'pointer', color:'#f54242'}} />:<FavoriteBorderOutlinedIcon style={{width:'20px',cursor:'pointer'}} />}
        </NavLink>

        

       <NavLink exact to='/message' style={{color:'grey'}} activeStyle={{color:'black'}} > <SendSharpIcon  style={{width:'20px', transform:'rotate(-15deg)', position:'relative', top:'-1px',cursor:'pointer'}}  /> </NavLink>
      <NavLink exact to='/upload' > <IconButton color="primary" aria-label="upload picture" component="span" className='uploadbtn'>
          <PhotoCamera />
        </IconButton></NavLink>
      </div>

        
      </div>
    
      
      
    </>
  );
}

export default Header;
