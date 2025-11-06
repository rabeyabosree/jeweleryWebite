import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createBlog } from "../../../../redux/reducers/blogReducer";


function CreateBlog() {
  const dispatch = useDispatch();

  const [blogData, setBlogData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: null,
    tags: "",
    category: "",
    productCategory: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setBlogData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setBlogData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit blog
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", blogData.title);
    payload.append("slug", blogData.slug);
    payload.append("excerpt", blogData.excerpt);
    payload.append("content", blogData.content);
    if (blogData.featuredImage) payload.append("featuredImage", blogData.featuredImage);
    payload.append("tags", blogData.tags);
    payload.append("category", blogData.category);
    payload.append("productCategory", blogData.productCategory);
    payload.append("metaTitle", blogData.metaTitle);
    payload.append("metaDescription", blogData.metaDescription);
    payload.append("keywords", blogData.keywords);

    dispatch(createBlog(payload))
      .unwrap()
      .then(() => toast.success("Blog created successfully!"))
      .catch((err) => toast.error(err.message || "Failed to create blog"));

  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Blog</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Slug */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Slug (optional)</label>
          <input
            type="text"
            name="slug"
            value={blogData.slug}
            onChange={handleChange}
            placeholder="auto-generated if left blank"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Excerpt */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Excerpt</label>
          <textarea
            name="excerpt"
            value={blogData.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Content */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleChange}
            rows={5}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Featured Image</label>
          <input
            type="file"
            name="featuredImage"
            onChange={handleChange}
            accept="image/*"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={blogData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Product Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Product Category</label>
          <input
            type="text"
            name="productCategory"
            value={blogData.productCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Meta Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={blogData.metaTitle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Meta Description */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Meta Description</label>
          <textarea
            name="metaDescription"
            value={blogData.metaDescription}
            onChange={handleChange}
            rows={2}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Keywords */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Keywords (comma separated)</label>
          <input
            type="text"
            name="keywords"
            value={blogData.keywords}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium w-full"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
