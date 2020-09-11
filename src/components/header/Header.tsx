import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import LightDark from './SwitchButton';

import DropdownMenu from './DropdownMenu';
import { useWindowSize } from '../../global/UseWidnowsSize';
//context dark/light mode
import { darkLightContext } from '../app/App';

import './Header.scss';

const FullSizeHeader = () => {
  return (
    <>
      <div className='category'>
        <NavLink activeClassName='activePage' to='/all/?page=1'>
          All
        </NavLink>
        <NavLink activeClassName='activePage' to='/random'>
          Random
        </NavLink>
        <NavLink activeClassName='activePage' to='/favorite'>
          Favorite
        </NavLink>
      </div>
      <div className='toggleDarkLight'>
        <LightDark />
      </div>
    </>
  );
};

const MobileSizeHeader = () => {
  return <DropdownMenu />;
};

const Header: React.FC = () => {
  const width = useWindowSize()!;
  const darkMode = useContext(darkLightContext);
  return (
    <header className={darkMode.darkMode ? 'dark' : ''}>
      <div className='logo'>
        <img
          src='https://execomnord.com/images/logo-execom-nord.db5f429e.svg'
          alt='logo'
        />
      </div>
      {width! >= 700 ? <FullSizeHeader /> : <MobileSizeHeader />}
    </header>
  );
};

export default Header;
