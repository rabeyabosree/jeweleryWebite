import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../../redux/reducers/blogReducer";

function BlogPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs = [], loading } = useSelector((state) => state.blogs);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Calculate paginate data
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  useEffect(() => {
    dispatch(allBlogs());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#fff8f0]">
      {/* Hero section */}
      <div className="py-12 bg-[#d4a373] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">Blog Page</h1>
        <p className="mt-2 text-sm opacity-90">
          Discover insights, tips, and updates from our latest blogs
        </p>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/blogs" className="hover:underline">Blogs</a>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 py-10 px-4 sm:px-6">
        
        {/* Sidebar */}
        <aside className="p-5 h-fit bg-white rounded-md shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] pr-10"
            />
            <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-3">Categories</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="cursor-pointer hover:text-[#d4a373] transition">All</li>
            <li className="cursor-pointer hover:text-[#d4a373] transition">Gemstone</li>
            <li className="cursor-pointer hover:text-[#d4a373] transition">Handmade</li>
            <li className="cursor-pointer hover:text-[#d4a373] transition">Earrings</li>
          </ul>
        </aside>

        {/* Blog List */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Latest Blogs</h2>

          {loading && <p className="text-center py-10">Loading...</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/blogs/${blog._id}`)}
              >
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {blog.metaTitle}
                  </p>
                  <button className="mt-3 text-[#d4a373] hover:text-[#b58457] transition">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-2">
            {/* Prev */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-[#d4a373] hover:text-white transition"
            >
              &lt;
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded transition ${
                  currentPage === i + 1
                    ? "bg-[#d4a373] text-white"
                    : "hover:bg-[#d4a373] hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-[#d4a373] hover:text-white transition"
            >
              &gt;
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BlogPage;
