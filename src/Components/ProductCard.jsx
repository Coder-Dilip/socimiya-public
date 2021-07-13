import React from 'react'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import {useHistory} from 'react-router-dom';

function ProductCard({img, desc, price, id, username}) {
    const history=useHistory();
    const product_info={img,desc,price,id,username};
    return (
        <div className='product_Card' onClick={(e)=>{localStorage.setItem('product-info',JSON.stringify( product_info));
        history.push(`/shop/product/${id}`);
        window.location.reload();
        }} >
            <img src={img} alt="" />
            <div className="product_desc">
            <p>{desc}</p>
<BookmarkBorderIcon />
            </div>
            <p style={{marginTop:'-10px', color:'gray', fontSize:'0.8rem'}} >{price}$</p>
        </div>
    )
}

export default ProductCard
