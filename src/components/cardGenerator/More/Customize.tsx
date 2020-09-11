import React, { useContext } from 'react';
import './Customize.scss';
import { BsGearFill as CustomizeImg } from 'react-icons/bs';
import { detailPicContext } from '../../app/App';

interface Props {
  onChange: () => void;
}

const Customize: React.FC<Props> = ({ onChange }) => {
  return (
    <CustomizeImg size={25} className='customize' onClick={() => onChange()} />
  );
};

export default Customize;
