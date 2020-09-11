import React, { useState, useContext } from 'react';
import './Favorite.scss';
import CardGeneratorFavorite from '../cardGenerator/CardGeneratorFavorite';
import { likedPicsContext } from '../app/App';

export const Favorite = () => {
  const [likedPicsState, setLikedPicsState] = useContext(likedPicsContext);
  return (
    <div className='favorite'>
      <CardGeneratorFavorite favoritePics={likedPicsState} />
    </div>
  );
};
