import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetchProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

const useFetchProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setProducts(json);
        await AsyncStorage.setItem('products', JSON.stringify(json)); // Save data for offline use
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Load offline data if fetch fails
        const offlineData = await AsyncStorage.getItem('products');
        if (offlineData) {
          setProducts(JSON.parse(offlineData));
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { products, loading };
};
}
export default useFetchProducts;
