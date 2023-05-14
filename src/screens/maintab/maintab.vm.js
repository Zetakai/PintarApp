import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_API} from '../../api/base_url';

export default function MainTabViewModel() {
  const [faqData, setFaqData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const data = useSelector(state => state.data);
  const d = useDispatch();

  const fetchFaqData = async isNext => {
    // console.log("data")
    // d({type: 'USER-AUTH', payload: false});
    //   d({type: 'LOGIN-AUTH', payload: null});
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_API}/api/v1/superadmin/faq?page=${1}&rows=10`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );
      const json = await response.json();
      faqData.toString() !== json.data.toString() &&
        setFaqData([...faqData, ...json.data]);
      isNext &&
        faqData.toString() !== json.data.toString() &&
        setPage(page + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {faqData, loading, error, fetchFaqData};
}
