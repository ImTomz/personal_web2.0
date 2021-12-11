import React from 'react';
import Link from 'next/link';
import S_navbar from './navbar.module.scss';

const NavBar = () => {
  return (
    <nav className={S_navbar.main_navigation}>
      <Link href='/'>Home</Link>
    </nav>
  );
};

export default NavBar;
