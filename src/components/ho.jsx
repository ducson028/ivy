import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import BestSeller from './BestSeller';
import Collections from './Collections';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    const fetchData = async () => {
      try {
        const productData = await axios.get('/api/products');
        const bestSellerData = await axios.get('/api/products/bestsellers');
        const collectionData = await axios.get('/api/collections');

        setProducts(productData.data);
        setBestSellers(bestSellerData.data);
        setCollections(collectionData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ProductList products={products} />
      <BestSeller bestSellers={bestSellers} />
      <Collections collections={collections} />
    </div>
  );
};

export default Home;
