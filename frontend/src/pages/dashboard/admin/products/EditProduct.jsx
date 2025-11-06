import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AdminEditProduct, adminSingleProduct } from "../../../../redux/reducers/productReducer";

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector(state => state.products);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    stock: "",
    materials: "",
    sale: "",
    additionalDescription: "",
  });
  const [image, setImage] = useState(null);

  // Fetch product on load
  useEffect(() => {
    dispatch(adminSingleProduct(id));
  }, [dispatch, id]);

  // Fill form with fetched data
  useEffect(() => {
    if (product) {
      setFormData({
        category: product.category,
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        materials: product.materials.join(", "),
        sale: product.sale,
        additionalDescription: product.additionalDescription || "",
      });
    }
  }, [product]);

  // Input change handlers
  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Submit edit
  const handleSubmit = e => {
    e.preventDefault();
    const updatedData = new FormData();
    for (const key in formData) updatedData.append(key, formData[key]);
    if (image) updatedData.append("image", image);

    dispatch(AdminEditProduct({ id, formData: updatedData }))
      .unwrap()
      .then(() => navigate("/dashboard/products"))
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#d4a373]">Edit Product</h2>

      {/* Image Preview */}
      {product?.image && !image && (
        <div className="mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover rounded-md border"
          />
        </div>
      )}
      {image && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-64 object-cover rounded-md border"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Category */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-[#d4a373] outline-none py-2"
            required
          />
        </div>

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-[#d4a373] outline-none py-2"
            required
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-[#d4a373] outline-none py-2"
            required
          />
        </div>

        {/* Stock */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-[#d4a373] outline-none py-2"
            required
          />
        </div>

        {/* Sale */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1">Sale %</label>
          <input
            type="number"
            name="sale"
            value={formData.sale}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-[#d4a373] outline-none py-2"
          />
        </div>

        {/* Materials */}
        <div className="flex flex-col col-span-1 sm:col-span-2">
          <label className="text-gray-600 mb-1">Materials (comma separated)</label>
          <input
            type="text"
            name="materials"
            value={formData.materials}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-[#d4a373] outline-none py-2"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col col-span-1 sm:col-span-2">
          <label className="text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-[#d4a373] outline-none py-2 resize-none"
            rows={3}
            required
          />
        </div>

        {/* Additional Description */}
        <div className="flex flex-col col-span-1 sm:col-span-2">
          <label className="text-gray-600 mb-1">Additional Description</label>
          <textarea
            name="additionalDescription"
            value={formData.additionalDescription}
            onChange={handleChange}
            className="border-b border-gray-300 focus:border-[#d4a373] outline-none py-2 resize-none"
            rows={3}
          />
        </div>

        {/* Image */}
        <div className="flex flex-col col-span-1 sm:col-span-2">
          <label className="text-gray-600 mb-1">Change Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            className="bg-[#d4a373] text-white py-2 w-full rounded-md hover:bg-[#b67e4a]"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
