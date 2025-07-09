import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
import Product from './Product';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination'; // we’ll define this next

const Products = ({heading = "Best products onboarded"}) => {
  const dispatch = useDispatch();
  const { products, loading, error, totalProductCount } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    dispatch(fetchProducts({ pageNo: currentPage, pageSize }));
  }, [dispatch, currentPage]);

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">{heading}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={totalProductCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
