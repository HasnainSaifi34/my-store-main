import {useState, useEffect} from 'react'

const ProductCard = (props)=>{
  const cartItem = props.userData.cartItems;
  const {GlobalUpdateStatus} =props;

  const pid=props.pid;
  const price = props.price;
  const {imgUrl}=props;
  const {desc}=props;
  const [quantity, setQuantity]=useState(1)
  if(props.quantity){
    // setQuantity(props.quantity)
  }
  const [cartText , SetCartText]=useState('Add to Cart')

  const AddToCart = async () => {
   const productExists = props.userData.cartItems.some((item) => item.name === props.name);

  if (productExists) {
    SetCartText('Product already in Cart');
  } else {
    cartItem.push({
      name: props.name,
      pid: pid,
      price:price,
      img_url:imgUrl,
      desc:desc,
      quantity: quantity,
      totalPrice: price * quantity,
    });

    const url = 'http://localhost:3050/users/cartitems';
    const data = {
      username: props.userData.username,
      cartItems: cartItem,
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(url, options);
    const JSONDATA = await res.json();

    console.log(JSONDATA);
    SetCartText('Added to Cart');
    GlobalUpdateStatus(true)
  }
};


return (
  <>
  <div className='product-card-inner-container '>
 <img src={props.imgUrl}/>
    <div className='product-data-container'>
 <div style={{fontSize:'22px', color:"white"}}> Name:{` ${props.name}`} </div>
 <div style={{fontSize:'22px', color:"white"}}> Price:{` ${props.price}`} </div>
 <div style={{fontSize:'15px', color:"white",textAlign:"center"}}> Description:{` ${props.desc}`} </div>
      </div>
    <div className='quantity-container'>
     <p style={{color:"white"}}> QUANTITY:</p>
<button onClick={()=>setQuantity(quantity+1)}>+</button> <input type="number" value={quantity} className='quantity-input' /> <button onClick={()=>{if(quantity>1){ setQuantity(quantity-1)}}}>-</button>

</div>
<button class="CartBtn" onClick={()=> {if(cartText!='Added to Cart'|| cartText!='Product already in Cart') {AddToCart()}} } >
  <span class="IconContainer"> 
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
  </span>
  <p class="text"> {cartText} </p>
</button>

  </div>
  </>
)

  
}


export default ProductCard