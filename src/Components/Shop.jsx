
import React, {useEffect} from 'react'
import ProductCard from './ProductCard';
import {NavLink, useHistory} from 'react-router-dom';
import { useState } from 'react';


function Shop() {
  const [sample, setsample] = useState([]);

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

useEffect(async()=>{
let result=await fetch("https://dilipbackend.xyz/api/getproducts");
result=await result.json();
setsample(result);
},[])

    return (
        <div className='shop'  style={{marginBottom:'100px'}}>
            <div className="shop_header">
          <h3>Shop</h3>
        <NavLink exact to='/upload-product' > <button style={{padding:'8px 10px', borderRadius:'5px', border:'none', fontSize:'0.8rem', color:'white', background:'#36b2ff', cursor:'pointer'}} >Upload</button></NavLink>
          </div>

          <h6 style={{borderBottom:'3px solid black', display:'inline-block', padding:'3px 0px', color:'GrayText', borderColor:'GrayText', marginTop:'30px', borderRadius:'3px',position:'sticky', top:0}} >Products</h6>
          <div className="product_images" >
{sample.reverse().map((images)=>
<ProductCard key={images.id} img={`https://dilipbackend.xyz/storage/products/${images.main_img}`} desc={images.description} price={`${images.price}`} username={images.username} id={images.id}   />
)}
          </div>
        </div>
    )
}

export default Shop
