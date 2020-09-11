import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CgDetailsMore as More } from 'react-icons/cg';
import LightDark from './SwitchButton';

const getClosest = (e: any, selector: string) => {
  for (; e && e !== document; e = e.parentNode) {
    if (e.matches(selector)) return true;
  }
  return false;
};

const DropdownMenu: React.FC = () => {
  const [display, setDisplay] = useState<'block' | 'none'>('none');

  const handleClick = (e: any) => {
    if (display === 'block' && !getClosest(e.target, '.toggleDarkLight')) {
      setDisplay('none');
    } else {
      setDisplay('block');
    }
  };

  window.onclick = (e: any) => {
    if (!e.target.matches('.moreBtn')) {
      let dropdowns = document.getElementsByClassName('drop');
      for (let i = 0; i < dropdowns.length; i++) {
        if (display === 'block' && !getClosest(e.target, '.toggleDarkLight')) {
          setDisplay('none');
        }
      }
    }
  };

  return (
    <>
      <div className='more' onClick={handleClick}>
        <More size={50} className='moreBtn' />
      </div>
      <ul className='drop' style={{ display: display }} onClick={handleClick}>
        <li>
          <NavLink activeClassName='activePage' to='/all/?page=1'>
            All
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='activePage' to='/random'>
            Random
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='activePage' to='/favorite'>
            Favorite
          </NavLink>
        </li>
        <li>
          <div id='toggleDarkLight' className='toggleDarkLight'>
            <LightDark />
          </div>
        </li>
      </ul>
    </>
  );
};

export default DropdownMenu;
