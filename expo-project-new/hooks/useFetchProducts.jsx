import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save products to AsyncStorage
const saveProductsToStorage = async (products) => {
  try {
    if (products) {
      await AsyncStorage.setItem('products', JSON.stringify(products));
      console.log("Saved products to AsyncStorage");
    } else {
      console.warn('Attempted to save null or undefined products');
    }
  } catch (error) {
    console.error("Failed to save data", error);
  }
};

// Load products from AsyncStorage
const loadProductsFromStorage = async () => {
  try {
    const storedProducts = await AsyncStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  } catch (error) {
    console.error("Failed to load data", error);
    return [];
  }
};

// The custom hook to fetch products and store them in AsyncStorage
export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const storedProducts = await loadProductsFromStorage();
        console.log('Loaded products from storage:', storedProducts);
        setProducts(storedProducts);
  
        if (storedProducts.length === 0) {
          const response = await fetch('https://simple-grocery-store-api.online/products');
          if (!response.ok) throw new Error('Network response was not ok');
          
          const data = await response.json();
          console.log('Fetched data from API:', data);
  
          if (data.categories) {
            setProducts(data.categories);
            await saveProductsToStorage(data.categories);
            console.log('Saved fetched products to storage');
          } else {
            throw new Error('No categories found in fetched data');
          }
        }
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  return { products, loading, error };
};