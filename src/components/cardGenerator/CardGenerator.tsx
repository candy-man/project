import React, { useState, useEffect } from 'react';
import Card from './Card';
import './CardGenerator.scss';
import { Axios } from '../../global/Axios';
import CardDetail from './CardDetail';
interface Props {
  page: number;
  limit: number;
}

const CardGenerator: React.FC<Props> = ({ page, limit }) => {
  const [pics, setPics] = useState<
    { id: number; author: string; download_url: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(`v2/list?page=${page}&limit=${limit}`);
      setPics(result.data);
      setLoading(false);
    };
    fetchData();
  }, [page]);

  return loading ? (
    <div className='bigCenterText'>loading!!!</div>
  ) : (
    <>
      <div className='cardsContainer'>
        {pics.map((pic) => {
          return (
            <Card
              key={pic.id}
              author={pic.author}
              url={`${Axios.defaults.baseURL}id/${pic.id}/340`}
              id={pic.id}
              urlDownload={pic.download_url}
            />
          );
        })}
      </div>
      <CardDetail />
    </>
  );
};
export default CardGenerator;
