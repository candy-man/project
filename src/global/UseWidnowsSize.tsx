import React, { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleRezsize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', handleRezsize);
    return () => {
      window.removeEventListener('resize', handleRezsize);
    };
  }, []);

  return size;
};

export const useEscape = () => {
  const [key, setKey] = useState<{ key: string }>({ key: '' });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKey({ key: e.code });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return key;
};
