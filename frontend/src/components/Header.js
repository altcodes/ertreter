import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/header.css';
import Navbar from './Navbar';
export default function Header() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className='header'>
      <div className='title-container'>
        <h1 className='title'>
          Journey
          {currentUser && <> of {currentUser.firstname}</>}
        </h1>
      </div>
      <hr />
      <div className='navbar-container'>
        <Navbar></Navbar>
      </div>
      <hr />
    </div>
  );
}
