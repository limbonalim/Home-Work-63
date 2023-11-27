import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <div className="Toolbar container">
      <Link to="/" className="logo">My blog</Link>
      <nav className="navigation">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/new-post">Add</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contacts">Contacts</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Toolbar;