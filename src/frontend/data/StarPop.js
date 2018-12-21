import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons'
import './starPop.css'



export default function starPop(num) {
   let starNumber = Math.ceil((num - 50) / 10);
   let starOn = <FontAwesomeIcon icon={faStar} color="black" className="star" />
   let starOff = <FontAwesomeIcon icon={faCoffee} />
   return (

       Array.from(new Array(starNumber)).map(() => {
           return (
               <div className="starOn">
                   {starOn}
               </div>
           )
       })

   )
}