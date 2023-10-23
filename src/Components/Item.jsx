import { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';

const Item = forwardRef(({ id, tags, withOpacity, isDragging, style, ...props }, ref) => {
  const[ size, setSize] = useState("cover")
  const inlineStyles = {
    opacity: withOpacity ? '0.5' : '1',
    transformOrigin: '50% 50%',
    borderRadius: '10px',
    zIndex:"0",
    backgroundImage:`url(${id})`,
    cursor: isDragging ? 'grabbing' : 'grab',
    display: 'flex',
    backgroundPosition:"center",
    backgroundSize:`${size}`,
    backgroundRepeat:"no-repeat",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: isDragging
      ? '(63, 63rgba, 68, 0.05) 0px 2px 0px 2px, rgba(34, 33, 81, 0.15) 0px 2px 3px 2px'
      : 'rgba(63, 63, 68, 0.05) 0px 0px 0px 1px, rgba(34, 33, 81, 0.15) 0px 1px 3px 0px',
    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
    padding:"10",
    width: '20vw', // Set the width from props
    height: '20vw', // Set the height from props
    ...style,
  };
useEffect(()=>{
  setSize("cover")
},[size])


  return (
    <div ref={ref} style={inlineStyles} {...props}>
      
    </div>
  );
});

Item.displayName = 'Item';

export default Item;