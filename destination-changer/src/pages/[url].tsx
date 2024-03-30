import { getOriginalUrl } from '@/constants/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RedirectPage = () => {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await axios.get(`${getOriginalUrl}${url}`);
        console.log('Response:', response.data);
        const { originalUrl } = response.data;
        console.log('Original URL:', originalUrl);
        window.location.href = originalUrl;
      } catch (error) {
        console.error('Error fetching original URL:', error);
        // router.push('/404'); 
      }
    };

    if (url) {
      fetchOriginalUrl();
    }
  }, [url, router]);

  return null; // This page doesn't render anything visible
};

export default RedirectPage;
