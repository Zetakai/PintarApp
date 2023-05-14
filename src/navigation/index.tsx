import React, {useEffect, useRef} from 'react';

import RootNavigation from './RootNavigator';
import {useDispatch} from 'react-redux';

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({type: 'SPLASH', payload: false});
      console.log('test')
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <RootNavigation />;
};

export default AppRoutes;
