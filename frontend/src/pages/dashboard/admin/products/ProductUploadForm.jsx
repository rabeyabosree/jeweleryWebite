import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, clearState } from "../../../../redux/reducers/productReducer";

function ProductUploadForm() {
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

  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector((state) => state.products);

  useEffect(() => {
    if(success) {
      // Clear form on success
      setFormData({
        category: "",
        title: "",
        description: "",
        price: "",
        stock: "",
        materials: "",
        sale: "",
        additionalDescription: "",
      });
      setImage(null);

      // Clear Redux state after 3s
      const timer = setTimeout(() => dispatch(clearState()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!image) return;

    const data = new FormData();
    data.append("image", image);
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    dispatch(createProduct(data));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-[#d4a373]">Add New Product</h2>

      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      {success && <p className="mb-4 text-center text-green-500">{message}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]" />
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]" />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]" />
        <input type="text" name="materials" placeholder="Materials (comma separated)" value={formData.materials} onChange={handleChange} className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]" />
        <input type="number" name="sale" placeholder="Sale %" value={formData.sale} onChange={handleChange} className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]" />
        <textarea name="additionalDescription" placeholder="Additional Description" value={formData.additionalDescription} onChange={handleChange} className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]" />
        <input type="file" accept="image/*" onChange={handleImageChange} required className="border px-3 py-2 rounded-md" />

        <button type="submit" disabled={loading} className="bg-[#d4a373] text-white py-2 rounded-md hover:bg-[#b67e4a] transition">
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductUploadForm;
