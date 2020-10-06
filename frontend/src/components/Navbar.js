import React, { useContext } from 'react';
import '../styles/navbar.css';
import { NavLink } from 'react-router-dom';
import fire from '../firebase';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const nav = currentUser ? `/user/${currentUser.email}` : '/user/me';
  const logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        return <Redirect to='/' />;
      });
  };

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <NavLink
            to='/home'
            exact
            className='navlink'
            activeClassName='link-active'
          >
            Home
          </NavLink>{' '}
        </li>
        <li>
          <NavLink to={nav} className='navlink' activeClassName='link-active'>
            Me
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/about'
            className='navlink'
            activeClassName='link-active'
          >
            About
          </NavLink>
        </li>
        {currentUser && (
          <li>
            <p
              to='/msg'
              onClick={logout}
              style={{ color: 'red', cursor: 'pointer' }}
            >
              Logout
            </p>
          </li>
        )}
      </ul>
    </nav>
  );
}
