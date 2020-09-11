import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import ContainerPage from '../containerPage/ContainerPage';

interface Props {
  darkMode: boolean;
  callBack: (change: boolean) => void;
}

const VLAUES_FROM_LOCAL_PICS = localStorage.getItem('LikedPics');

if (!VLAUES_FROM_LOCAL_PICS) {
  localStorage.setItem('LikedPics', JSON.stringify([]));
}

//CONTEXT
export const likedPicsContext = React.createContext([
  JSON.parse(localStorage.getItem('LikedPics')!),
  () => {},
]);
//CONTEXT DARK/LIGHT MODE

//pref of user
const prefLight =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

console.log(prefLight);

export const defalutValue = {
  darkMode: prefLight ? false : true,
  callBack: () => {},
};

export const darkLightContext = React.createContext<Props>(defalutValue);

export const useMode = (): Props => {
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', '' + darkMode);
  }, [darkMode]);

  const callBack = React.useCallback((change: boolean): void => {
    setDarkMode(change);
  }, []);

  return {
    darkMode,
    callBack,
  };
};
//detail pic context
interface PropsDetailPic {
  detailPic: {
    detailPic: number | null;
    customize: boolean;
  };
  callBackId: (img: number | null, customize: boolean) => void;
}

const defalutValueDetailPic = {
  detailPic: { detailPic: null, customize: false },
  callBackId: () => {},
};

export const detailPicContext = React.createContext<PropsDetailPic>(
  defalutValueDetailPic
);

export const useDetailPic = (): PropsDetailPic => {
  const [detailPic, setDetailPic] = useState<{
    detailPic: number | null;
    customize: boolean;
  }>({ detailPic: null, customize: false });

  const callBackId = React.useCallback(
    (img: number | null, customize: boolean): void => {
      setDetailPic({ detailPic: img, customize: customize });
    },
    []
  );

  return {
    detailPic,
    callBackId,
  };
};
//

//APP//
const App: React.FC = () => {
  const [likedPicsState, setLikedPicsState] = useState<number[]>(
    JSON.parse(localStorage.getItem('LikedPics')!)
  );

  useEffect(() => {
    localStorage.setItem('LikedPics', JSON.stringify(likedPicsState));
  }, [likedPicsState]);

  return (
    <Router>
      <darkLightContext.Provider value={useMode()}>
        <likedPicsContext.Provider value={[likedPicsState, setLikedPicsState]}>
          <div className='containerApp'>
            <Header />
            <detailPicContext.Provider value={useDetailPic()}>
              <ContainerPage />
            </detailPicContext.Provider>
            <Footer
              startDate={new Date('2020-8-17')}
              endDate={new Date('2020-9-11')}
              studentName='Aleksandar'
              studentLastName='Kenderesi'
            />
          </div>
        </likedPicsContext.Provider>
      </darkLightContext.Provider>
    </Router>
  );
};

export default App;
