import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AllAdminProduct, deleteSingleProduct } from "../../../../redux/reducers/productReducer";
import { FiMoreVertical } from "react-icons/fi";
import { MdEdit, MdDelete } from "react-icons/md";

function AllProductsAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    dispatch(AllAdminProduct());
  }, [dispatch]);

  const handleMenuToggle = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/products/edit/${id}`);
  };


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteSingleProduct(id))
        .unwrap()
        .then(() => {
          alert("Product deleted successfully");
          // Remove deleted product from the local products array
       
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#d4a373]">All Products</h2>
        <button
          onClick={() => navigate("/dashboard/products/create")}
          className="bg-[#d4a373] text-white px-4 py-2 rounded-md hover:bg-[#b67e4a] transition"
        >
          + Create Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* 3-dot menu */}
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() => handleMenuToggle(product._id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiMoreVertical className="text-gray-600 text-lg" />
                </button>

                {openMenu === product._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-20">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="flex items-center gap-2 px-3 py-2 w-full text-left text-sm hover:bg-gray-100"
                    >
                      <MdEdit className="text-blue-500" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-2 px-3 py-2 w-full text-left text-sm hover:bg-gray-100 text-red-500"
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Product Image */}
              <img
                onClick={() => navigate(`/dashboard/products/${product._id}`)}
                src={product.image || "https://via.placeholder.com/300x200"}
                alt={product.title}
                className="w-full h-48 object-cover cursor-pointer"
              />

              {/* Product Info */}
              <div className="p-4" onClick={() => handleView(product._id)}>
                <h3 className="text-lg font-semibold text-gray-800 truncate cursor-pointer">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">{product.category}</p>
                <p className="mt-2 font-medium text-[#d4a373]">${product.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default AllProductsAdmin;
