import React, { useContext } from 'react';
import { FaHeart as Heart } from 'react-icons/fa';

import Swal from 'sweetalert2';
import './LikeButton.scss';
import { likedPicsContext } from '../app/App';
interface Props {
  id: number;
}

const LikeButton: React.FC<Props> = ({ id }) => {
  const [likedPicsState, setLikedPicsState] = useContext(likedPicsContext);

  const handleClick = () => {
    if (isLiked()) {
      const removeLiked = (likedPicsState as number[]).filter((p) => p !== id);
      setLikedPicsState(removeLiked);
    } else {
      if (likedPicsState.length === 5) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'U can only like 5 pics...try unliking some first :)',
        });
      } else {
        setLikedPicsState([...likedPicsState, id]);
      }
    }
  };

  const isLiked = () => {
    return (likedPicsState as number[]).find((item) => item === id)
      ? 'liked'
      : null;
  };

  return (
    <Heart size={35} className={'heart ' + isLiked()} onClick={handleClick} />
  );
};
export default LikeButton;
