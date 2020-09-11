import React, { useContext } from 'react';
import './Footer.scss';
import { darkLightContext } from '../app/App';

interface Props {
  startDate: Date;
  endDate: Date;
  studentName: string;
  studentLastName: string;
}

const Footer: React.FC<Props> = (props) => {
  const darkMode = useContext(darkLightContext);
  const { startDate, endDate, studentName, studentLastName } = props;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  return (
    <footer className={'footer ' + (darkMode.darkMode ? 'dark' : '')}>
      <div>
        {formatDate(startDate)} - {formatDate(endDate)}
      </div>
      <div>{`${studentName}  ${studentLastName}`}</div>
    </footer>
  );
};

export default Footer;
