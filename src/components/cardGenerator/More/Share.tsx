import React, { FC } from 'react';
import './Share.scss';
import { FaShareAlt as ShareImg } from 'react-icons/fa';
import Swal from 'sweetalert2';

interface Props {
  url: string;
  author: string;
}

const Share: FC<Props> = ({ url, author }) => {
  const handleClick = async () => {
    if (window.navigator.share) {
      try {
        window.navigator.share({
          title: 'Lorem Picsum',
          text: `Hey, check this great photo made by ${author}`,
          url: `${url}`,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: 'Share failed :(, try again',
        });
      }
    } else {
      const dummy = document.createElement('textarea');
      document.body.appendChild(dummy);
      dummy.value = url;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Image link has been coppied',
        text: `${url}`,
        showConfirmButton: false,
        timer: 800,
      });
    }
  };

  return <ShareImg size={25} className='share' onClick={handleClick} />;
};

export default Share;
