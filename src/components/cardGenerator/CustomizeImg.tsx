import React, { useState, useEffect } from 'react';
import Blur from './Blur';

import './CustomizeImg.scss';
import Grayscale from './Grayscale';

interface Props {
  min: number;
  max: number;
  onChange: (v: { blur: number; grayscale: boolean }) => void;
}

const CustomizeImg: React.FC<Props> = ({ min, max, onChange }) => {
  const [blur, setBlur] = useState<number>(0);
  const [grayscale, setGrayScale] = useState<boolean>(false);

  useEffect(() => {
    onChange({ blur, grayscale });
  }, [blur, grayscale]);

  return (
    <div className='customizeImg'>
      <div>
        Blur <Blur min={min} max={max} onChange={(v) => setBlur(v)} />
      </div>
      <div>
        <Grayscale onChange={(v) => setGrayScale(v)} /> Grayscale
      </div>
    </div>
  );
};

export default CustomizeImg;
