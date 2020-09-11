import React, { useState, useContext, useEffect, useRef } from 'react';
import './CardDetail.scss';
import LikeButton from './LikeButton';
import { BsX as Exit } from 'react-icons/bs';
import { detailPicContext, darkLightContext } from '../app/App';
import { useEscape } from '../../global/UseWidnowsSize';
import { Axios } from '../../global/Axios';
import More from './More/More';

import InnerDetail from './InnerDetail';

const CardDetail: React.FC = () => {
  const windowClick = useEscape();
  const detailPic = useContext(detailPicContext);
  const darkMode = useContext(darkLightContext);

  //REF
  const customizeRef = useRef<any>(null);

  const initialState = {
    id: -1,
    author: '',
    download_url: '',
  };
  const [picInfo, setPicInfo] = useState<{
    id: number;
    author: string;
    download_url: string;
  }>(initialState);

  const handleClick = () => {
    detailPic.callBackId(null, false);
    setPicInfo({ id: -1, author: '', download_url: '' });
    customizeRef.current.setInitalCustomize();
  };

  useEffect(() => {
    if (windowClick.key === 'Escape') {
      detailPic.callBackId(null, false);
      setPicInfo({ id: -1, author: '', download_url: '' });
    }
  }, [windowClick]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(`id/${detailPic.detailPic.detailPic}/info`);
      setPicInfo(result.data);
    };
    fetchData();
  }, [detailPic]);

  return (
    <div
      className={
        'cardDetailContainer ' +
        (picInfo.id > -1 ? 'visible ' : '') +
        (darkMode.darkMode ? 'darkDetail' : '')
      }
    >
      <div className='cardDetail'>
        <div className='topDetail'>
          <LikeButton id={picInfo.id} />
          <More
            id={picInfo.id}
            url={picInfo.download_url}
            author={picInfo.author}
          />
          <Exit size={45} className='exit' onClick={handleClick} />
        </div>
        <InnerDetail
          ref={customizeRef}
          author={picInfo.author}
          showCustomize={detailPic.detailPic.customize}
          id={picInfo.id}
        />
      </div>
    </div>
  );
};

export default CardDetail;
