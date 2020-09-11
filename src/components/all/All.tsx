import React, { useEffect, useState, useContext } from 'react';
import CardGenerator from '../cardGenerator/CardGenerator';
import './All.scss';
import { useLocation } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { darkLightContext } from '../app/App';

interface Props {}

const MAX_PAGINATIONS = 75;

export const All = (props: any) => {
  const darkMode = useContext(darkLightContext);
  const params = new URLSearchParams(useLocation().search);
  const [page, setPage] = useState<number>(+params.get('page')!);

  useEffect(() => {
    setPage(+params.get('page')!);
  }, [params]);

  if (!Number.isInteger(page) || page < 1 || page > MAX_PAGINATIONS) {
    return (
      <div className={'notFound ' + (darkMode.darkMode ? 'dark3' : '')}>
        OOPS SUCH A PAGE DOES NOT EXIST :(
      </div>
    );
  } else {
    return (
      <>
        <div className='all'>
          <CardGenerator page={page} limit={12} />
        </div>
        <Pagination maxPagination={MAX_PAGINATIONS} page={page} />
      </>
    );
  }
};
