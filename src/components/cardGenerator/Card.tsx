import React, { useContext } from 'react';
import './Card.scss';
import LikeButton from './LikeButton';
import { darkLightContext } from '../app/App';
import { detailPicContext } from '../app/App';
import More from './More/More';

interface Props {
  author: string;
  url: string;
  id: number;
  urlDownload: string;
}

const Card: React.FC<Props> = ({ author, id, url, urlDownload }) => {
  const darkMode = useContext(darkLightContext);
  const detailPic = useContext(detailPicContext);
  const handleClick = () => {
    detailPic.callBackId(id, false);
  };

  return (
    <div className={(darkMode.darkMode ? 'dark' : '') + ' cardContainer'}>
      <div className='top'>
        <LikeButton id={id} />
        <More id={id} url={urlDownload} author={author} />
      </div>
      <div className='mid'>
        <img className='pic' src={url} alt={author} onClick={handleClick} />
      </div>
      <div className='bottom'>
        <span>{author}</span>
      </div>
    </div>
  );
};

export default Card;
