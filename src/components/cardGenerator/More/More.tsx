import React, { useState, useContext } from 'react';
import { BsThreeDots as Drop } from 'react-icons/bs';
import './More.scss';
import Save from './Save';
import Share from './Share';
import Customize from './Customize';
import { detailPicContext } from '../../app/App';

interface Props {
  id: number;
  url: string;
  author: string;
  onChange?: () => void;
}

const getClosest = (e: any, selector: string) => {
  for (; e && e !== document; e = e.parentNode) {
    if (e.matches(selector)) return true;
  }
  return false;
};

const More: React.FC<Props> = ({ id, url, author, onChange }) => {
  const detailPic = useContext(detailPicContext);
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  window.onclick = (e: any) => {
    if (!getClosest(e.target, '.more')) {
      let dropdowns = document.getElementsByClassName('moreList');

      for (let i = 0; i < dropdowns.length; i++) {
        if (showMore) {
          setShowMore(false);
        }
      }
    }
  };

  const CustomizeHandler = () => {
    if (typeof onChange === 'function') {
      onChange();
    } else {
      detailPic.callBackId(id, true);
    }
  };

  return (
    <div className='wrapMore'>
      <Drop
        title='Show more'
        size={35}
        className='more'
        onClick={handleClick}
      />
      <ul className={'moreList ' + (showMore ? 'show' : '')}>
        <li className='moreListItem'>
          <Save id={id} url={url} />
        </li>
        <li className='moreListItem'>
          <Share url={url} author={author} />
        </li>
        <li className='moreListItem'>
          <Customize onChange={() => CustomizeHandler()} />
        </li>
      </ul>
    </div>
  );
};

export default More;
