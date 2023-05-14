import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_API } from '../../api/base_url';
import { useNavigation } from '@react-navigation/native';

export default function FaqDetailViewModel() {
    const navigation = useNavigation()
    const [faqData, setFaqData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pertanyaan, setPertanyaan] = useState('');
    const [jawaban, setJawaban] = useState('');
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const startUpdating = () => setUpdating(true);
    const finishUpdating = () => setUpdating(false);
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const showModal = () => setVisibleModal(true);
    const hideModal = () => setVisibleModal(false);
    const data = useSelector(state => state.data);
    const d = useDispatch()

    const onChangePertanyaan = (text) => setPertanyaan(text)

    const onChangeJawaban = (text) => setJawaban(text)
    const fetchDetail = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_API}/api/v1/superadmin/faq/${id}`, {
                headers: {
                    Authorization: `Bearer ${data.access_token}`
                }
            });

            const json = await response.json();
            console.log(id, json.data.pertanyaan)
            setFaqData(json.data);
            setPertanyaan(json.data.pertanyaan);
            setJawaban(json.data.jawaban);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const updateFaq = async (faqId) => {
        const form = new FormData();
        form.append("pertanyaan", pertanyaan);
        form.append("jawaban", jawaban);
        try {
            const response = await fetch(`${BASE_API}/api/v1/superadmin/faq/${faqId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${data.access_token}`,
                    'Content-Type': 'multipart/form-data'
                },
                body: form
            });
            const json = await response.json()
            console.log(json)
            navigation.goBack()
        } catch (error) {
            console.error(error);
        }
    };
    const createFaq = async () => {
        const form = new FormData();
        form.append("pertanyaan", pertanyaan);
        form.append("jawaban", jawaban);
        try {
            const response = await fetch(`${BASE_API}/api/v1/superadmin/faq`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${data.access_token}`,
                    'Content-Type': 'multipart/form-data'
                },
                body: form
            });
            const json = await response.json()
            console.log(json)
            navigation.goBack()
        } catch (error) {
            console.error(error);
        }
    };
    
    const deleteFaq = async (faqId) => {
        try {
            const response = await fetch(`${BASE_API}/api/v1/superadmin/faq/${faqId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${data.access_token}`
                }
            });
            const json = await response.json()
            console.log(json)
            navigation.goBack()
        } catch (error) {
            console.error(error);
        }
    };
    return {
        visible, visibleModal, openMenu, closeMenu, pertanyaan, setPertanyaan, jawaban, setJawaban, onChangePertanyaan, onChangeJawaban, updating, setUpdating, startUpdating, finishUpdating,
        showModal,
        hideModal, faqData, loading, error, fetchDetail, updateFaq, deleteFaq,createFaq
    };
}
