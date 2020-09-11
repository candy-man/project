import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import './CardGenerator.scss';
import { Axios } from '../../global/Axios';
import axios from 'axios';
import CardDetail from './CardDetail';

interface Props {
  favoritePics: string[];
}

const CardGeneratorFavorite: React.FC<Props> = ({ favoritePics }) => {
  const [pics, setPics] = useState<
    { id: number; author: string; download_url: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    let arrayForFatch: any[] = [];
    let arrayPics: any[] = [];

    favoritePics.map((pic: any) =>
      arrayForFatch.push(axios.get(`https://picsum.photos/id/${pic}/info`))
    );

    const fetchData = async () => {
      const result = await axios.all(arrayForFatch);
      for await (const res of result) {
        arrayPics.push(res.data);
      }
      setPics(arrayPics);
      setLoading(false);
    };
    fetchData();
  }, [favoritePics]);

  return loading ? (
    <div className='bigCenterText'>loading!!!</div>
  ) : pics.length > 0 ? (
    <>
      <div className='cardsContainer containerFav'>
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
  ) : (
    <div className='bigCenterText'>
      Sorry no liked pics...go like some first
    </div>
  );
};

export default CardGeneratorFavorite;
