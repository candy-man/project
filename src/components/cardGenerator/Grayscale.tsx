import React, { useState, useEffect } from 'react';

interface Props {
  onChange: (v: boolean) => void;
}

const Grayscale: React.FC<Props> = ({ onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked(!checked);
  };
  useEffect(() => {
    onChange(checked);
  }, [checked]);

  return <input type='checkbox' name='grayscale' onClick={handleClick} />;
};
export default Grayscale;
