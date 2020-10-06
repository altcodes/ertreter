import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/article.css';
import { BsEye } from 'react-icons/bs';

export default function Article({ value, user, remove, see = true }) {
  const navUser = `/user/${user.email}`;
  const navArticle = `/article/${value._id}`;
  return (
    <div className='article'>
      <img src={value.urlImage} className='article-img'></img>
      <div className='article-content'>
        <h3>{value.name}</h3>
        <p>{value.description}</p>
        <p>{value.createdAt.slice(0, 10)}</p>
        <NavLink to={navUser}>
          <p>@{user.firstname + '_' + user.lastname}</p>
        </NavLink>
        {see && (
          <NavLink
            to={navArticle}
            style={{
              marginLeft: 'auto',
              textDecoration: 'none'
            }}
          >
            <BsEye />
          </NavLink>
        )}
        {remove && (
          <button onClick={() => remove(value._id)} className='delete-btn'>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
