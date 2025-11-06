import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleBlog, updateBlog } from "../../../../redux/reducers/blogReducer";
import { toast } from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";

function SingleBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog, loading } = useSelector((state) => state.blogs);
  const [isEditing, setIsEditing] = useState(false);
  const [editableBlog, setEditableBlog] = useState(null);

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      // Pre-fill form state
      setEditableBlog({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        featuredImage: blog.featuredImage || null,
        tags: blog.tags?.join(", ") || "",
        category: blog.category || "",
        productCategory: blog.productCategory || "",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        keywords: blog.keywords?.join(", ") || "",
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setEditableBlog((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setEditableBlog((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = new FormData();
      for (let key in editableBlog) {
        if (editableBlog[key] !== null) {
          payload.append(key, editableBlog[key]);
        }
      }

      await dispatch(updateBlog({ id: blog._id, blogData: payload })).unwrap();
      toast.success("Blog updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message || "Failed to update blog");
    }
  };

  if (loading || !editableBlog) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Edit Icon */}
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
        onClick={() => setIsEditing(!isEditing)}
      >
        <FiEdit2 size={24} />
      </button>

      {/* Featured Image */}
      {!isEditing && editableBlog.featuredImage && (
        <img
          src={editableBlog.featuredImage}
          alt={editableBlog.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}
      {isEditing && (
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Featured Image</label>
          <input
            type="file"
            name="featuredImage"
            onChange={handleChange}
            accept="image/*"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      )}

      {/* Title */}
      {isEditing ? (
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={editableBlog.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ) : (
        <h1 className="text-3xl font-bold mb-2">{editableBlog.title}</h1>
      )}

      {/* Excerpt */}
      {isEditing ? (
        <textarea
          name="excerpt"
          value={editableBlog.excerpt}
          onChange={handleChange}
          rows={2}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      ) : (
        <p className="text-gray-600 mb-4">{editableBlog.excerpt}</p>
      )}

      {/* Content */}
      {isEditing ? (
        <textarea
          name="content"
          value={editableBlog.content}
          onChange={handleChange}
          rows={6}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      ) : (
        <p className="text-gray-800 mb-4 whitespace-pre-line">{editableBlog.content}</p>
      )}

      {/* Tags & Keywords */}
      {isEditing ? (
        <>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={editableBlog.tags}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Keywords (comma separated)</label>
            <input
              type="text"
              name="keywords"
              value={editableBlog.keywords}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {editableBlog.tags.split(",").map((tag, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {tag.trim()}
            </span>
          ))}
          {editableBlog.keywords.split(",").map((kw, idx) => (
            <span key={idx} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {kw.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Category & Product Category */}
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="category"
            value={editableBlog.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="productCategory"
            value={editableBlog.productCategory}
            onChange={handleChange}
            placeholder="Product Category"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ) : (
        <div className="flex gap-4 mb-4">
          <span className="text-gray-500 font-medium">Category: {editableBlog.category}</span>
          <span className="text-gray-500 font-medium">Product Category: {editableBlog.productCategory}</span>
        </div>
      )}

      {/* Meta */}
      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="metaTitle"
            value={editableBlog.metaTitle}
            onChange={handleChange}
            placeholder="Meta Title"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="text"
            name="metaDescription"
            value={editableBlog.metaDescription}
            onChange={handleChange}
            placeholder="Meta Description"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      ) : (
        <div className="text-gray-500 mb-4">
          <p>Meta Title: {editableBlog.metaTitle}</p>
          <p>Meta Description: {editableBlog.metaDescription}</p>
        </div>
      )}

      {/* Update Button */}
      {isEditing && (
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium"
        >
          Update Blog
        </button>
      )}
    </div>
  );
}

export default SingleBlog;
