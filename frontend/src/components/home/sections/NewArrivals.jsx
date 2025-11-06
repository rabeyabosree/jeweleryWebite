import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllProduct } from "../../../redux/reducers/productReducer";

function NewArrivals() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(AllProduct());
  }, [dispatch]);

  // 🔹 Filter New Arrivals: last 4 products added
  const newArrivals = products
    .slice()
    .sort((a, b) => b.id - a.id)
    .slice(0, 8);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-16 px-6 md:px-12 justify-items-center">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            New Arrivals
          </h2>
          <Link
            to="/shop"
            className="text-blue-600 hover:underline font-medium"
          >
            See All →
          </Link>
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {newArrivals.map((item) => (
            <div
              key={item.id}
              className="bg-white transition duration-300 cursor-pointer relative"
              onClick={() => navigate(`/shops/${item._id}`)}
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover rounded-sm"
              />

              {/* Sale Badge */}
              {item.sale > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {item.sale}%
                </div>
              )}

              {/* Product Info */}
              <div className="p-3 text-center">
                <h3 className="text-gray-800 font-semibold text-sm md:text-base truncate">
                  {item.title}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;
