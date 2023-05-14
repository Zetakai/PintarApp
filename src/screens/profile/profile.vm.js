import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';

export default function ProfileViewModel() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleLogout = () => {
    try {
      dispatch({type: 'USER-AUTH', payload: false});
      dispatch({type: 'LOGIN-AUTH', payload: null});
    } catch (err) {
      console.log(err);
    }
  };

  return {
    visible,
    showModal,
    hideModal,
    handleLogout,
  };
}
