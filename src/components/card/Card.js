import React from 'react'

import './card.scss'

const Card = (props) => {

   const {card} = props
   
   return (
      <div className="card-item">
        { card.cover &&  
            <img 
               className="card-cover" 
               src={card.cover} 
               alt="" 
               onMouseDown={e => e.preventDefault()}
            />}
        { card.title}
      </div>
   )
}

export default Card
