import React, { useEffect } from "react";
import { jewelryData } from "../../../data/data";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllProduct } from "../../../redux/reducers/productReducer";


function BestSellers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  const bestSellers = products
    .slice() // create a copy
    .sort((a, b) => b.reviews.length - a.reviews.length) // most reviews first
    .slice(0, 8); // pick top 4

  useEffect(() => {
    dispatch(AllProduct());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="mt-16 px-6 md:px-12 text-center">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Best Sellers
          </h2>
          <Link
            to="/shop"
            className="text-blue-600 hover:underline font-medium"
          >
            See All →
          </Link>
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
          {bestSellers.map((item) => (
            <div
              key={item._id}
              onClick={()=> navigate(`/shops/${item._id}`)}
              className="bg-white relative w-full max-w-[250px] transition-shadow duration-300 cursor-pointer shadow-sm hover:shadow-lg rounded-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover rounded-t-sm"
              />
              <div className="p-3 text-center">
                <h3 className="text-gray-800 font-semibold text-sm md:text-base truncate">
                  {item.name}
                </h3>
                {/* Price */}
                {item.sale > 0 ? (
                  <div className="flex justify-center gap-2 items-center mt-1">
                    <span className="text-gray-500 line-through">
                      ৳ {item.price.toLocaleString()}
                    </span>
                    <span className="text-blue-600 font-medium">
                      ৳ {Math.round(item.price - (item.price * item.sale) / 100).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <p className="text-blue-600 font-medium mt-1">
                    ৳ {item.price.toLocaleString()}
                  </p>
                )}
                <span >{item.sale > 0 && <p className="absolute top-2 right-2 bg-red-400 text-white p-2 rounded-full font-semibold text-sm">{item.sale}%</p>}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
