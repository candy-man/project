import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import CustomizeImg from './CustomizeImg';

interface Props {
  author: string;
  showCustomize: boolean;
  id: number;
}

export const InnerDetail = forwardRef<any, Props>(
  ({ author, showCustomize, id }, ref) => {
    const [searchUrl, setSearchUrl] = useState('');
    const [loaded, setLoaded] = useState(false);
    //
    const initialCustomize = { blur: 0, grayscale: false };
    const [customize, setCustomize] = useState<{
      blur: number;
      grayscale: boolean;
    }>(initialCustomize);
    //
    const setInitalCustomize = () => {
      setCustomize(initialCustomize);
    };

    useEffect(() => {
      setCustomize(initialCustomize);
      settingUrl();
      setLoaded(true);
    }, [showCustomize]);

    //change to initail state uppon exeting
    useImperativeHandle(ref, () => {
      return {
        setInitalCustomize: setInitalCustomize,
      };
    });

    const settingUrl = () => {
      let stringForQuery: string = `https://picsum.photos/id/${id}/0`;
      if (customize.blur > 0 && customize.grayscale) {
        stringForQuery = stringForQuery.concat(
          `/?grayscale&blur=${customize.blur}`
        );
      } else if (customize.blur > 0) {
        stringForQuery = stringForQuery.concat(`/?blur=${customize.blur}`);
      } else if (customize.grayscale) {
        stringForQuery = stringForQuery.concat(`/?grayscale`);
      }
      if (stringForQuery !== searchUrl) {
        setLoaded(false);
        setSearchUrl(stringForQuery);
      }
    };

    useEffect(() => {
      settingUrl();
    }, [id, customize]);

    return (
      <>
        <div className='midDetail'>
          {!loaded ? (
            <div className='loading'>
              <div className='loader'></div>
            </div>
          ) : (
            ''
          )}

          <img
            className='picDetail'
            src={searchUrl}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className='bottomDetail'>
          <span>{author}</span>
        </div>
        {showCustomize ? (
          <CustomizeImg min={0} max={10} onChange={(v) => setCustomize(v)} />
        ) : (
          ''
        )}
      </>
    );
  }
);

export default InnerDetail;
