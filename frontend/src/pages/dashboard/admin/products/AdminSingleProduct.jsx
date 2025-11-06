import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { adminSingleProduct } from "../../../../redux/reducers/productReducer";

function AdminSingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminSingleProduct(id));
  }, [dispatch, id]);

  const { product, error, loading } = useSelector((state) => state.products);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading product...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-md">
      {/* Product Image */}
      <div className="md:w-1/2">
        <img
          src={product.image || "https://via.placeholder.com/500x500"}
          alt={product.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-gray-500">{product.category}</p>
        <p className="mt-2 text-gray-700">{product.description}</p>

        {/* Materials */}
        {product.materials && product.materials.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold">Materials:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {product.materials.map((mat, index) => (
                <li key={index}>{mat}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Price and Sale */}
        <div className="mt-4 flex items-center gap-4">
          {product.sale > 0 ? (
            <>
              <span className="text-2xl font-bold text-[#d4a373]">
                ${Math.round(product.price * (1 - product.sale / 100))}
              </span>
              <span className="text-gray-400 line-through">${product.price}</span>
              <span className="text-red-500 font-semibold">{product.sale}% OFF</span>
            </>
          ) : (
            <span className="text-2xl font-bold text-[#d4a373]">${product.price}</span>
          )}
        </div>

        {/* Stock */}
        <p className="mt-2 text-gray-600">
          {product.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
        </p>

        {/* Additional Description */}
        {product.additionalDescription && (
          <p className="mt-2 text-gray-700">{product.additionalDescription}</p>
        )}

        {/* Average Rating */}
        <p className="mt-2 text-gray-600">
          Average Rating: {product.averageRating} / 5
        </p>

        {/* Created/Updated */}
        <p className="mt-2 text-gray-500 text-sm">
          Created: {new Date(product.createdAt).toLocaleDateString()} | Updated: {new Date(product.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default AdminSingleProduct;
