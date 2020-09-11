import React, { useState, useContext, useEffect } from 'react';
import './RandomGen.scss';

import { darkLightContext } from '../app/App';
import { Axios } from '../../global/Axios';
import More from '../cardGenerator/More/More';
import LikeButton from '../cardGenerator/LikeButton';
import InnerDetail from '../cardGenerator/InnerDetail';

const RandomGen: React.FC = () => {
  const darkMode = useContext(darkLightContext);
  const [showCustom, setShowcustom] = useState(false);

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

  const fetchData = async () => {
    let result = await Axios(`/0`);
    result = await Axios(`id/${result.headers['picsum-id']}/info`);
    setPicInfo(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  };

  return (
    <>
      <div className={'cardDetail ' + (darkMode.darkMode ? 'darkDetail2' : '')}>
        <div className='topDetail'>
          <div className='left'>
            <button onClick={handleClick} className='button'>
              Random pic
            </button>
          </div>
          <div className='right'>
            <LikeButton id={picInfo.id} />
            <More
              id={picInfo.id}
              url={picInfo.download_url}
              author={picInfo.author}
              onChange={() => setShowcustom(!showCustom)}
            />
          </div>
        </div>
        <InnerDetail
          id={picInfo.id}
          showCustomize={showCustom}
          author={picInfo.author}
        />
      </div>
    </>
  );
};

export default RandomGen;
