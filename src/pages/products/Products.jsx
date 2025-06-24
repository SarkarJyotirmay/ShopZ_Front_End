import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
// Optional: import cart and wishlist actions if you’ve defined them
// import { addToCart } from '../../store/slices/cartSlice';
// import { addToWishlist } from '../../store/slices/wishlistSlice';

import Product from './Product';


const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.length > 0 &&
          products.map((product) => (
            <Product key={product._id} product={product}/>
          ))}
      </div>
    </div>
  );
};

export default Products;
