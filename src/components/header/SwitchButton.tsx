import React, { useContext, useEffect } from 'react';
import Switch from 'react-switch';
import { darkLightContext } from '../app/App';
import { lchown } from 'fs';

const DARK_MODE_LOCAL = localStorage.getItem('darkMode');

if (!DARK_MODE_LOCAL) {
  localStorage.setItem('darkMode', '' + false);
}

const LightDark: React.FC = () => {
  const [checked, setChecked] = React.useState<boolean>(
    localStorage.getItem('darkMode') === 'true'
  );

  const darkMode = useContext(darkLightContext);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked) {
      darkMode.callBack(checked);
    } else {
      darkMode.callBack(checked);
    }
  }, [checked]);

  return (
    <>
      <span>{checked ? 'Light mode' : 'Dark mode'}</span>
      <label htmlFor='material-switch'>
        <Switch
          checked={checked}
          onChange={handleChange}
          //light mode white
          onColor='#f2f2f2'
          onHandleColor='#fff'
          offHandleColor='#3c3c46'
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
          height={20}
          width={48}
          className='react-switch'
          id='material-switch'
        />
      </label>
    </>
  );
};

export default LightDark;
