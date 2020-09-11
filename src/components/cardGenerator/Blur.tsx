import React, { useState, useEffect } from 'react';
import 'react-rangeslider/lib/index.css';
import './Blur.scss';
import Slider from 'react-rangeslider';

interface Props {
  min: number;
  max: number;
  onChange: (v: number) => void;
}

const Blur: React.FC<Props> = ({ min, max, onChange }) => {
  const [intensity, setIntensity] = useState<number>(min);

  const handleClick = (value: any) => {
    setIntensity(value);
  };
  const setOnChange = () => {
    onChange(intensity);
  };

  return (
    <Slider
      value={intensity}
      min={min}
      max={max}
      onChange={handleClick}
      onChangeComplete={setOnChange}
      className='slider'
    />
  );
};
export default Blur;
