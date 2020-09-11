import React, { useState, useContext } from 'react';
import './ContainerPage.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { darkLightContext } from '../app/App';

import { All } from '../all/All';
import { Random } from '../random/Random';
import { Favorite } from '../favorite/Favorite';

interface Props {}

const ContainerPage: React.FC<Props> = (prop) => {
  const darkMode = useContext(darkLightContext);
  return (
    <div className={'container ' + (darkMode.darkMode ? 'dark2' : '')}>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/all/?page=1' />
        </Route>
        <Route path='/all' component={All} />
        <Route path='/random' component={Random} />
        <Route path='/favorite' component={Favorite} />
      </Switch>
    </div>
  );
};

export default ContainerPage;
