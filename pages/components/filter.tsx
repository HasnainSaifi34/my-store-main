import {useState, useEffect} from 'react'


const Filter = (props)=>{
  const [maxPrice, setMaxPrice]=useState(null);
  const [minPrice, setMinPrice]=useState(null);
  const category = props.category;
  
const handleChange = (e, state)=>{
  state(e.target.value)
}

  
  return(
    <>
    <div className='filer-container'>
   <div className='min-price'> MINPRICE:<input type="number"onChange={(e)=>handleChange(e,setMinPrice)}/> </div>
    <div className='max-price'>  MAXPRICE:<input type="number"onChange={(e)=>handleChange(e,setMaxPrice)} /> </div>
     <div> <button className='filter-btn' onClick={()=>props.fetch(category,minPrice,maxPrice)} >Filter</button> </div>
    
    </div>
    
    
    </>
  )
}

export default Filter ;
