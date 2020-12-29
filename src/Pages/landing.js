import React from 'react';
import CardPage from './card';
import {Link} from 'react-router-dom';

export default function LandingPage(){
  
   return(
       <div>
           <Link to="/add"><h5 style={{textAlign:"center",fontSize:20,color:"coral"}}>Write Your Notes</h5></Link>
           <CardPage/>
       </div>
   )
}