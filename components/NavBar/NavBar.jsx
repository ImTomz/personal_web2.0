import React from 'react';
import Link from 'next/link';
import S_navbar from './navbar.module.scss';

const NavBar = () => {
  return (
    <div className={S_navbar.fixed_navigation}>
      <div className='container'>
        <nav className={S_navbar.main_navigation}>
          <Link href='/'>Home</Link>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
