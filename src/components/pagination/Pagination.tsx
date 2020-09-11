import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Pagination.scss';
import { useWindowSize } from '../../global/UseWidnowsSize';
import { darkLightContext } from '../app/App';

interface Props {
  page: number;
  maxPagination: number;
}

const Pagination: React.FC<Props> = ({ page, maxPagination }) => {
  const windowWidth = useWindowSize();
  const history = useHistory();

  const range = () => {
    if (windowWidth > 950) {
      return 12;
    } else if (windowWidth <= 950 && windowWidth > 600) {
      return 6;
    } else {
      return 3;
    }
  };

  const [paginationRange, setPaginationRange] = useState(range());

  const createArray = (start: number) => {
    let paginations: number[] = [];
    if (start + 12 > 75) {
      start = 75 - 11;
    }
    for (let i = start; i < start + paginationRange; i++) {
      paginations.push(i);
    }
    return paginations;
  };

  const [selected, setSelected] = useState<number>(page);

  const [paginations, setPaginations] = useState<number[]>(
    createArray(selected)
  );

  //
  useEffect(() => {
    setPaginationRange(range());
  }, [windowWidth]);
  //These two are used together , seting paginations only after the range has been set
  useEffect(() => {
    setPaginations(createArray(selected));
  }, [paginationRange]);
  //

  useEffect(() => {
    history.push(`/all/?page=${selected}`);
  }, [selected]);

  useEffect(() => {
    if (paginations[0] > selected) {
      setSelected(paginations[0]);
    }
    if (paginations[paginationRange - 1] < selected) {
      setSelected(paginations[paginationRange - 1]);
    }
  }, [paginations]);

  const handleClick = (e: any) => {
    let target = e.target;
    setSelected(target.parentElement.value);
  };

  const handleClickArrowLeft = () => {
    if (!(paginations[0] === 1)) {
      setPaginations(createArray(paginations[0] - 1));
    }
  };
  const handleClickArrowRight = () => {
    if (!(paginations[paginationRange - 1] === maxPagination)) {
      setPaginations(createArray(paginations[0] + 1));
    }
  };

  const darkMode = useContext(darkLightContext);
  return (
    <div className='paginationContainer'>
      <ul className='paginationArray'>
        <li onClick={handleClickArrowLeft} className='paginationArrow'>
          <i className='arrow left' />
        </li>
        {paginations.map((item) => {
          return (
            <li
              className={
                'pagination ' +
                (selected === item ? 'selected ' : '') +
                (darkMode.darkMode ? 'dark' : '')
              }
              value={item}
              onClick={handleClick}
              key={item}
            >
              <Link to={`/all/?page=${item}`}>{item}</Link>
            </li>
          );
        })}
        <li onClick={handleClickArrowRight} className='paginationArrow'>
          <i className='arrow right' />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
