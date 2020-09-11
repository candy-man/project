import React from 'react';
import './Save.scss';
import { GiSaveArrow as SaveImg } from 'react-icons/gi';
import axios from 'axios';

interface Props {
  id: number;
  url: string;
}

const Save: React.FC<Props> = ({ id, url }) => {
  const handleClick = () => {
    const download = async () => {
      await axios
        .request({
          url: url,
          method: 'get',
          responseType: 'blob',
        })
        .then(({ data }) => {
          const downloadUrl = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', `${id}.jpg`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
    };
    download();
  };

  return (
    <SaveImg
      title='Save this image'
      className='imgSave'
      size={25}
      onClick={handleClick}
    />
  );
};

export default Save;
