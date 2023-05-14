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

  const fetchFaqData = async (isNext,firstPage) => {
    try {
      setLoading(true);
      firstPage&&setPage(1)
      firstPage&&setFaqData([])
      const response = await fetch(
        `${BASE_API}/api/v1/superadmin/faq?page=${page}&rows=10`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );
      const json = await response.json();
        setFaqData([...faqData, ...json.data]);
      isNext &&
        setPage(page + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {faqData, loading, error, fetchFaqData};
}
