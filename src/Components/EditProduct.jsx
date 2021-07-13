import React, {useState, useEffect} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
function EditProduct() {
    const history=useHistory();
const [get_product, setget_product] = useState([]);
let localproduct=JSON.parse(localStorage.getItem('product-info'));
let Localdata=JSON.parse(localStorage.getItem('user-info'));

const [fileurl1, setfileurl1] = useState('');
const [fileurl2, setfileurl2] = useState('');
const [fileurl3, setfileurl3] = useState('');

const [file1, setfile1] = useState('');
const [file2, setfile2] = useState('');
const [file3, setfile3] = useState('');

const [state1st, setstate1st] = useState(false);
const [state2nd, setstate2nd] = useState(false);
const [state3rd, setstate3rd] = useState(false);

const [desc, setdesc] = useState('');
const [price, setprice] = useState('');
const [website, setwebsite] = useState('');

const [message, setmessage] = useState('')

    useEffect(async()=>{
        let id=localproduct.id;
        let formdata=new FormData();
        formdata.append('id', id)
       let result=await fetch('https://dilipbackend.xyz/api/getproduct',{
           method:'POST',
           body:formdata
       })
       result=await result.json();
       setget_product(result);
   setdesc(result[0].description);
   setprice(result[0].price);
   if(result[0].website!='false'){
       setwebsite(result[0].website)
   }
       },[]);

const handleChange1=(e)=>{
    setfileurl1(URL.createObjectURL(e.target.files[0]));
    setfile1(e.target.files[0]);
    setstate1st(true);
}
const handleChange2=(e)=>{
    setfileurl2(URL.createObjectURL(e.target.files[0]));
    setfile2(e.target.files[0]);
    setstate2nd(true);
}
const handleChange3=(e)=>{
    setfileurl3(URL.createObjectURL(e.target.files[0]));
    setfile3(e.target.files[0]);
    setstate3rd(true);
}

const handle_Submit=async()=>{
let formdata=new FormData();
let id=localproduct.id;
if(desc && price){
    formdata.append('username', Localdata.user.username)
formdata.append('id', id);
if(fileurl1){
    formdata.append('main_img', file1)
    formdata.append('first_status', 'true')
}else{
    formdata.append('first_status', 'false')
}

if(fileurl2){
    formdata.append('first_optional', file2)
    formdata.append('second_status', 'true')
}else{
    formdata.append('second_status', 'false')
}

if(fileurl3){
    formdata.append('second_optional', file3)
    formdata.append('third_status', 'true')
}else{
    formdata.append('third_status', 'false')
}

formdata.append('description', desc);
formdata.append('price', price);

if(website){
    formdata.append('website', website)
    formdata.append('website_status', 'true')
}else{
    formdata.append('website_status', 'false')
}

let result=await fetch('https://dilipbackend.xyz/api/updateproduct',{
method:'POST',
body:formdata
})

result=await result.json();
history.push('/shop');

}else{
setmessage(' Not Marked as Optional Fields are Mandatory!');
}



}

    return (
        <>
        {get_product.length>0?
        <div style={{marginBottom:'200px'}} >
     
<h4 style={{marginLeft:'20px'}} >Update Images</h4>
<h6 style={{marginLeft:'20px', color:'GrayText', position:'relative', top:'20px'}} >Click the Images to get Started</h6>
        <div className='edit_product' >
            <div className='product_img_container'>
<div className="each_img">
    <EditIcon style={{padding:'10px', color:'blue', cursor:'pointer'}} />
    <input type="file" onChange={handleChange1} style={{position:'absolute',marginLeft:'-30px', marginTop:'9px', zIndex:'100', opacity:'0', height:'100%', width:'100%'}} />
 {get_product.length>0?   
<img src={fileurl1?fileurl1:`https://dilipbackend.xyz/storage/products/${get_product[0].main_img}`} style={{height:'100%', width:'100%', position:'absolute',marginLeft:'-43px', zIndex:'10'}} alt="" />
:null}
</div>

<div className="each_img">
    <EditIcon style={{padding:'10px', color:'blue', cursor:'pointer'}} />
    <input type="file" onChange={handleChange2} style={{position:'absolute',marginLeft:'-30px', marginTop:'9px', zIndex:'100', opacity:'0', height:'100%', width:'100%'}} />
 {get_product.length>0?  
get_product[0].first_optional!='false'? 
<>
<img src={fileurl2?fileurl2:`https://dilipbackend.xyz/storage/products/${get_product[0].first_optional}`} style={{height:'100%', width:'100%', position:'absolute',marginLeft:'-43px', zIndex:'10'}} alt="" />
</>
:null:null}
{fileurl2?<img src={fileurl2} style={{zIndex:-1, width:'100px', height:'100px', position:'relative', top:'-47px'}} alt=""  />:null}
</div>

<div className="each_img">
    <EditIcon style={{padding:'10px', color:'blue', cursor:'pointer'}} />
    <input type="file" onChange={handleChange3} style={{position:'absolute',marginLeft:'-30px', marginTop:'9px', zIndex:'100', opacity:'0', height:'100%', width:'100%'}} />
 {get_product.length>0?  
 get_product[0].second_optional!='false'? 
 <>
<img src={fileurl3?fileurl3:`https://dilipbackend.xyz/storage/products/${get_product[0].second_optional}`} style={{height:'100%', width:'100%', position:'absolute',marginLeft:'-43px', zIndex:'10'}} alt="" />
</>
:null:null}
{fileurl3?<img src={fileurl3} style={{zIndex:-1, width:'100px', height:'100px', position:'relative', top:'-47px'}} alt=""  />:null}
</div>

            </div>

        </div>
<p style={{marginLeft:'20px', fontWeight:'bold', marginBottom:'30px'}} >Update the Product Details</p>
<textarea style={{padding:'10px', display:'block', marginBottom:'15px', marginLeft:'20px', outline:'none', borderRadius:'3px', border:'2px solid GrayText', width:'200px'}} type="text" placeholder='Description' value={desc} onChange={(e)=>setdesc(e.target.value)} />
<input style={{padding:'10px', display:'block', marginBottom:'15px', marginLeft:'20px', outline:'none', borderRadius:'3px', border:'2px solid GrayText', width:'200px'}} type="number" placeholder='Price' value={price} onChange={(e)=>setprice(e.target.value)} />
<input style={{padding:'10px', display:'block', marginBottom:'15px', marginLeft:'20px', outline:'none', borderRadius:'3px', border:'2px solid GrayText', width:'200px'}} type="text" placeholder='website' value={website} onChange={(e)=>setwebsite(e.target.value)} />
<button style={{marginBottom:'50px', marginLeft:'20px', marginTop:'20px', padding:'7px 20px', borderRadius:'5px', border:'none', color:'white', background:'#4287f5', cursor:'pointer'}}  onClick={handle_Submit} >Submit</button>
{message?<p style={{color:'orangered', textAlign:'center', width:'80%',margin:'auto', position:'relative', top:'-45px'}} >{message}</p>:null}
</div>
:null}
</>
    )
}

export default EditProduct
