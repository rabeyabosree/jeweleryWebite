import React from "react";
import { blogData } from "../../../data/data";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../../../redux/reducers/blogReducer";
import { useEffect } from "react";


function LatestBlogs() {
   const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blogs = [], loading } = useSelector((state) => state.blogs);

  const latestBlogs = blogs.slice().sort((a, b)=> a.id - b.id).slice(0, 6)
  

  useEffect(() => {
    dispatch(allBlogs());
  }, [dispatch]);
  return (
    <div className="mt-16 px-6 md:px-12 justify-items-center ">
     <div className="max-w-6xl">
       {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Latest Blogs
        </h2>
        <Link
          to="/blogs"
          className="text-blue-600 hover:underline font-medium"
        >
          See All →
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {latestBlogs.map((blog) => (
          <div
            key={blog._id}
            onClick={()=> navigate(`/blogs/${blog._id}`)}
            className="bg-white rounded-sm shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
          >
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="capitalize bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-medium">
                  {blog.category}
                </span>
                <span>{blog.date}</span>
              </div>
              <h3 className="text-gray-800 font-semibold text-lg line-clamp-2">
                {blog.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
     </div>
    </div>
  );
}

export default LatestBlogs;
