// import React, {useEffect} from "react";
// import { sample } from "../sample";
// import { Link, useHistory } from "react-router-dom";

// function Igtv() {
//   let history=useHistory();
//   useEffect(()=>{
//     let mounted = true;
//     if(mounted){
//         if(!localStorage.getItem('user-info')){
//             history.push('/login');
//         }
//       }
//       return () => mounted = false;
     
//   }, []);
//   return (
//     <div>
//       <div className="Igtv">
//         <div className="explore">
//           <Link style={{ textDecoration: "none", color: "black" }} to="/igtv">
//             {" "}
//             <h3
//               style={{
//                 marginTop: "10px",
//                 position: "relative",
//                 top: "15px",
//                 left: "25px",
//                 display: "block",
//               }}
//             >
//               Explore
//             </h3>
//           </Link>
//           <input type="text" placeholder="Search..." />
//         </div>
//         <div className="igtv_Img">
//           {sample.map((item) => (
//             <img key={item.key} src={item.img} height="" alt="" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Igtv;
import React, { useEffect } from 'react'
function Igtv() {
  return (
    <div style={{width:'100%',height:'80vh',alignItems:'center',justifyContent:'center'}} >
     <h4 style={{color:'orangered',textAlign:'center',padding:'20',position:'relative',top:'200'}} >It is Going to be Build Soon!</h4>
    </div>
  )
}

export default Igtv
