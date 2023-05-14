import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export default function LoginViewModel() {
  const [nip, setnip] = useState('');
  const [password, setpassword] = useState('');
  const [Message, setMessage] = useState('');
  const [Hide, setHide] = useState(true);
  const [Visible, setVisible] = useState(false);

  function onChangePassword(value:string) {
    setpassword(value);
  }
  function onChangeNip(value:string) {
    setnip(value);
  }
  const onSetHide = () => {
    setHide(!Hide);
  };
  const onSetVisibleHide = () => {
    setVisible(false);
  };

  const onSetVisible = (message:string) => {
    setVisible(true);
    setMessage(message);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };



  return {
    nip,
    password,
    Hide,
    onChangePassword,
    onChangeNip,
    onSetHide,
    Visible,
    Message,
    onSetVisible,
    onSetVisibleHide,setVisible,
  };
}
