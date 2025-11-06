import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBlog, getAllBlogs } from "../../../../redux/reducers/blogReducer";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

function AdminBlogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogs = [], loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/dashboard/blogs/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
    console.log("Delete blog:", id);
  };

  if (loading) return <p className="text-center py-10">Loading blogs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Blogs</h2>
        <button
          onClick={() => navigate("/dashboard/blogs/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Blog
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition relative"
            onClick={() => navigate(`/dashboard/blogs/${blog._id}`)}
          >
            {/* Card Top Menu */}
            <div className="absolute top-2 right-2 flex items-center space-x-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(blog._id);
                }}
                className="p-2 hover:bg-gray-100 rounded"
                title="Edit"
              >
                <FaEdit className="text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(blog._id);
                }}
                className="p-2 hover:bg-gray-100 rounded"
                title="Delete"
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Blog Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{blog.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{blog.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4 flex justify-between items-center text-gray-500 text-xs">
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              <span>{blog.viewsCount} views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBlogs;
