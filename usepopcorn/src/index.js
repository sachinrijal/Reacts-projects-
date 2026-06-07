import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from './starRating'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// function Test(){
//   const [movieRating , setMovieRating] = useState(0);

//   return (
//     <>
//     <StarRating maxRating ={5} color='blue' size="32px" className='test' onSetRating={setMovieRating}  />
//     <p>{ movieRating } , is the rating of the movie . </p>
//     </>
//   )
// }
