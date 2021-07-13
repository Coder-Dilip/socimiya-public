import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link, useHistory} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {Avatar} from '@material-ui/core'
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import ProductCard from './ProductCard';
// import "./styles.css";


// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);


function ProductPage() {
    const history=useHistory();
    let localdata=JSON.parse(localStorage.getItem('product-info'));
  let  Localdata=JSON.parse(localStorage.getItem('user-info'));
    const [get_product, setget_product] = useState([]);
const [get_products, setget_products] = useState([]);
useEffect(async()=>{
    let id=localdata.id;
    let formdata=new FormData();
    formdata.append('id', id)
let result=await fetch('https://dilipbackend.xyz/api/getproduct',{
method:'POST',
body:formdata
})
result=await result.json();
setget_product(result);
},[]);


useEffect(async()=>{
    let username=localdata.username;
    let formdata=new FormData();
    formdata.append('username', username)
let result=await fetch('https://dilipbackend.xyz/api/getsuggestedproduct',{
method:'POST',
body:formdata
})
result=await result.json();
setget_products(result);
},[]);

    return (
        <div className='product_page' >
         <span style={{display:'flex', alignItems:'center',position:'sticky', top:'0'}} ><Link to='/shop' ><ArrowBackIcon style={{height:'20px'}} /></Link><h4 style={{marginLeft:'5px', position:'relative', top:'-5px'}}>shop</h4></span>
         {get_product.length>0?
         <div style={{display:'flex',flexDirection:'column', alignItems:'center', width:'100%', height:'40px'}} >
        <Link style={{textDecoration:'none'}} to={`/profile/${get_product[0].username}`} > < Avatar src={'https://dilipbackend.xyz/storage/profile/'+get_product[0].username+`/profimage.png?${Date.now()}`} style={{height:'25px', width:'25px'}} /></Link>
<Link style={{textDecoration:'none'}} to={`/profile/${get_product[0].username}`} ><h6 style={{marginTop:'10px', color:'#6e6e6e'}} >@{get_product[0].username}</h6></Link>
         </div>
:null}
         <div className="product_Section" style={{overflow:'hidden', display:'flex', alignItems:'center',  width:'250px', margin:'auto', justifyContent:'center', marginTop:'23px'}}>
{get_product.length>0?
<>
         <Swiper
         className="mySwiper"
      draggable= {true}
      pagination={true}
    >
     
     
<SwiperSlide><img src={`https://dilipbackend.xyz/storage/products/${get_product[0].main_img}`} style={{borderRadius:'5px', paddingBottom:'25px'}} height='240px' width='240px' alt="" /></SwiperSlide>

{get_product[0].first_optional!='false'?
<SwiperSlide><img src={`https://dilipbackend.xyz/storage/products/${get_product[0].first_optional}`} height='240px' width='240px' style={{borderRadius:'5px', paddingBottom:'25px'}} alt="" /></SwiperSlide>
:null}

{get_product[0].second_optional!='false'?
<SwiperSlide><img src={`https://dilipbackend.xyz/storage/products/${get_product[0].second_optional}`} height='240px' width='240px' style={{borderRadius:'5px', paddingBottom:'25px'}} alt="" /></SwiperSlide>
:null}
            </Swiper>
            </>
:null}
         </div>
         {get_product.length!=0?
             <>
             <div style={{position:'relative', top:'-20px', width:'240px', margin:'auto'}} >
<span style={{display:'flex', alignItems:'center'}} ><p style={{fontWeight:'bold'}} >{get_product[0].unique_name}</p><p style={{position:'relative', fontSize:'.8rem', top:'1px', left:'10px'}} >{get_product[0].price}$</p></span>
<div style={{display:'flex'}} >
    <div>
<p style={{fontWeight:'bold', fontSize:'.8rem',color:'#6e6e6e', position:'relative', top:'-18px'}} >Description</p>
<p style={{fontSize:'0.8rem',color:'#6e6e6e',top:'-28px', position:'relative', width:'200px'}} >{get_product[0].description}</p>
</div>
    <>
<div  style={{textDecoration:'none', display:'flex', alignItems:'center', position:'relative',top:'13px',marginTop:'10px', left:'-218px', marginBottom:'10px'}} >
    
{get_product[0].website!='false'?
    <button onClick={()=>{
    if((get_product[0].website)[0]!='h'){
    window.open(`https://${get_product[0].website}`, '_blank');
    }else if((get_product[0].website)[0]=='h'){
        window.open(`${get_product[0].website}`, '_blank'); 
    }
}}  style={{background:'#4287f5', border:'none', color:'white', padding:'5px 20px', marginLeft:'20px', borderRadius:'3px', position:'relative' ,top:'10px',cursor:'pointer'}} >Buy</button>:null
}
{get_product[0].username==Localdata.user.username?
<Link to='/edit-product' ><button style={{ border:'2px solid #4287f5', padding:'3px 20px', marginLeft:'20px', borderRadius:'3px', position:'relative' ,top:'10px', background:'white', color:'black',cursor:'pointer'}} >Edit</button></Link>
:null}
</div>
</>
</div>
</div>
</>
:null}
{get_products.length>1 && get_product.length>0 ?
<>
<div style={{marginLeft:'30px', color:'Grey', marginBottom:'60px', marginTop:'25px'}} >
<h5 style={{borderBottom:'2px solid grey', display:'inline', paddingBottom:'5px'}} >More from {get_product[0].username}</h5>
<div style={{display:'flex', flexWrap:'wrap', marginLeft:'-20px'}} >
{get_products.reverse().map((images)=>
images.id!=get_product[0].id?
<div key={images.id} style={{ width:'250px'}} >
<ProductCard key={images.id} img={`https://dilipbackend.xyz/storage/products/${images.main_img}`} desc={images.description} price={`${images.price}`} username={images.username} id={images.id} />
</div>
:null
)}
</div>
</div>
</>
:null}

        </div>
    )
}

export default ProductPage
