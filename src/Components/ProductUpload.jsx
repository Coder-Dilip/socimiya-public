import React from "react";
import { useState } from "react";
import "./style.css";
import {useHistory} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";


function ProductUpload() {
  let history=useHistory();
  const [state1st, setstate1st] = useState(true);
  const [state2nd, setstate2nd] = useState(true);
  const [state3rd, setstate3rd] = useState(true);
  const [state, setstate] = useState(true);
  const [fileurl, setfileurl] = useState("");
  const [fileurl1, setfileurl1] = useState("");
  const [fileurl2, setfileurl2] = useState("");
  const [file, setfile] = useState('');
  const [file1, setfile1] = useState('');
  const [file2, setfile2] = useState('');
  const [price, setprice] = useState('');
const [Desc, setDesc] = useState('');
const [unique_name, setunique_name] = useState('');
const [website, setwebsite] = useState('');
const [web_status, setweb_status] = useState('false');
  const handleChange = (e) => {
    setfileurl(URL.createObjectURL(e.target.files[0]));
    setfile(e.target.files[0]);
    setstate1st(false);
  };

  const handleChange1 = (e) => {
    setfileurl1(URL.createObjectURL(e.target.files[0]));
    setfile1(e.target.files[0]);
    setstate2nd(false);
  };

  const handleChange2 = (e) => {
    setfileurl2(URL.createObjectURL(e.target.files[0]));
    setfile2(e.target.files[0]);
    setstate3rd(false);
  };

  return (
    <div className="product_upload" style={{marginBottom:'200px'}} >
        <h4 style={{textAlign:'center', marginTop:'50px'}} >Upload Images for your Product</h4>
      {state ? (
        <>
          <div
            className="select_files_container"
            style={{
            //   height: "90vh",
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              position:'relative',
                top:'20px'
            }}
          >
            <div
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "5px",
                margin: "10px",
                marginBottom:'-100px'
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  outline: "dotted",
                  outlineColor: "#d1d1d1",
                }}
              >
                {state1st?
                <>
                <CloudUploadIcon style={{ color: "#36b2ff" }} />
                <p style={{ fontSize: ".6rem" }}>Select Image</p>
                <button
                  style={{
                    padding: "5px 15px",
                    borderRadius: "15px",
                    border: "none",
                    fontSize: "0.7rem",
                    color: "white",
                    background: "#36b2ff",
                    cursor: "pointer",
                  }}
                >
                  Upload
                </button>
                <input
                type="file"
                style={{
                    width: "60px",
                    zIndex:'10000',
                    marginBottom: "2px",
                    marginTop: "-23px",
                    opacity: "0",
                }}
                accept="image/png, image/gif, image/jpeg"
                onChange={handleChange}
                />
                </>
                :
                <>
                <img style={{borderRadius:'5px'}} src={fileurl} height='80px'  width='100%'  />
                <input type="file" style={{color:'white', position:'absolute', marginLeft:'40px', marginTop:'100px', opacity:'0', zIndex:100}}  onChange={handleChange} />
                <EditIcon style={{position:'absolute', marginLeft:'-198px', height:'15px', marginTop:'100px', color:'#008acf', zIndex:1, cursor:'pointer'}} />
                </>
                }
              </div>
            </div>
            <div
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "5px",
                margin: "10px",
                marginBottom:'-100px'
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  outline: "dotted",
                  outlineColor: "#d1d1d1",
                }}
              >
                {state2nd?
                <>
                <CloudUploadIcon style={{ color: "#36b2ff" }} />
                <p style={{ fontSize: ".6rem" }}>Optional</p>
                <button
                  style={{
                    padding: "5px 15px",
                    borderRadius: "15px",
                    border: "none",
                    fontSize: "0.7rem",
                    color: "white",
                    background: "#36b2ff",
                    cursor: "pointer",
                  }}
                >
                  Upload
                </button>
                <input
                type="file"
                style={{
                    width: "60px",
                    zIndex:'10000',
                    marginBottom: "2px",
                    marginTop: "-23px",
                    opacity: "0",
                }}
                accept="image/png, image/gif, image/jpeg"
                onChange={handleChange1}
                />
                </>
                :
                <>
                <img style={{borderRadius:'5px'}} src={fileurl1} height='80px'  width='100%'  />
                <input type="file" style={{color:'white', position:'absolute', marginLeft:'40px', marginTop:'100px', opacity:'0', zIndex:100}}  onChange={handleChange1} />
                <EditIcon style={{position:'absolute', marginLeft:'-198px', height:'15px', marginTop:'100px', color:'#008acf', zIndex:1, cursor:'pointer'}} />
                </>}
              </div>
            </div>
            <div
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "5px",
                margin: "10px",
                marginBottom:'-100px'
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  outline: "dotted",
                  outlineColor: "#d1d1d1",
                }}
              >
                {state3rd?
                <>
                <CloudUploadIcon style={{ color: "#36b2ff" }} />
                <p style={{ fontSize: ".6rem" }}>Optional</p>
                <button
                  style={{
                    padding: "5px 15px",
                    borderRadius: "15px",
                    border: "none",
                    fontSize: "0.7rem",
                    color: "white",
                    background: "#36b2ff",
                    cursor: "pointer",
                  }}
                >
                  Upload
                </button>
                <input
                type="file"
                style={{
                    width: "60px",
                    zIndex:'10000',
                    marginBottom: "2px",
                    marginTop: "-23px",
                    opacity: "0",
                }}
                accept="image/png, image/gif, image/jpeg"
                onChange={handleChange2}
                />
                </>
                :
                <>
                <img style={{borderRadius:'5px'}} src={fileurl2} height='80px'  width='100%'  />
                <input type="file" style={{color:'white', position:'absolute', marginLeft:'40px', marginTop:'100px', opacity:'0', zIndex:100}}  onChange={handleChange2} />
                <EditIcon style={{position:'absolute', marginLeft:'-198px', height:'15px', marginTop:'100px', color:'#008acf', zIndex:1, cursor:'pointer'}} />
                </>
                }
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="upload_product_container">
            <img
              src={fileurl}
              height="200px"
              width="200px"
              style={{ borderRadius: "10px" }}
              alt=""
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Product Description"
            ></textarea>
          </div>
        </>
      )}
     <p style={{textAlign:'center', position:'relative', top:'100px'}} >More Details about your Product</p>
      <form>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:'365px', marginBottom:'60px'}} >
          <input type="text" placeholder='Name/Title   eg:shoe' onChange={(e)=>setunique_name(e.target.value)} value={unique_name} style={{marginTop:'10px', padding:'5px', borderRadius:'3px', border:'1px solid #36b2ff', width:'245px'}} />
      <input style={{marginTop:'10px', padding:'5px', borderRadius:'3px', border:'1px solid #36b2ff', width:'245px'}} type="number" placeholder='Price In Dollars  eg:123' value={`${price}`} onChange={(e)=>setprice(e.target.value)} />
      <input style={{marginTop:'10px', padding:'5px', borderRadius:'3px', border:'1px solid #36b2ff', width:'245px'}} type="url" placeholder='Website (optional)' value={website} onChange={(e)=>setwebsite(e.target.value)} />
      <textarea style={{marginTop:'10px', padding:'5px', borderRadius:'3px', border:'1px solid #36b2ff', width:'245px'}} type="text" placeholder='Description' value={Desc} onChange={(e)=>setDesc(e.target.value)} />
      </div>
      {!state1st && price && Desc && unique_name? 
          <>
      <div style={{display:'grid', placeItems:'center', marginBottom:'60px'}} >    <button type='submit'
                  style={{
                    padding: "8px 15px",
                    borderRadius: "15px",
                    border: "none",
                    fontSize: "0.7rem",
                    color: "white",
                    background: "#36b2ff",
                    cursor: "pointer",
                    marginTop:'10px',
                    marginBottom:'100px'
                  }}

                  onClick={async(e)=>{
                      let localdata=JSON.parse(localStorage.getItem("user-info"));
                      e.preventDefault();
                      let formdata=new FormData();

                      formdata.append('main-image',file)
                      if(file1){
                      formdata.append('optional-first',file1)
                      formdata.append('first_status', 'true')
                      }
                      if(website){
                        formdata.append('website', website);
                        formdata.append('website_status', 'true')
                      }else{
                        formdata.append('website_status', web_status);
                      }
                      if(file2){
                      formdata.append('optional-second',file2)
                      formdata.append('second_status', 'true')
                      }
                      formdata.append('price', price)
                      formdata.append('description', Desc)
                      formdata.append('username', localdata.user.username)
                      formdata.append('unique_name',unique_name);
let result=await fetch('https://dilipbackend.xyz/api/products',{
    method:'POST',
    body:formdata,
})
result=await result.json();
history.push('/shop');
                  }}
                >
                  Submit
                </button></div>
                </>
                
:<p style={{display:'block', textAlign:'center'}} >Please fillup first for Submission!</p>}
</form>
    </div>
  );
}

export default ProductUpload;
