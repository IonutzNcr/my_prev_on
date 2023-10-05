import React from 'react'
import Auth from '../Aut';
import Movie from '../movie';
import { Navbar } from './Navbar';

export const Home = () => {
  return (
   <div className="Home">
     
     <Navbar />
     < Movie/>
    </div>
  )
}
