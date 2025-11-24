import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getSingleBlog, likeBlog } from '../../redux/reducers/blogReducer';
import { FaHeart, FaRegHeart, FaShareAlt, FaEye, FaTag } from 'react-icons/fa';

function BlogDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, loading } = useSelector((state) => state.blogs);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setLikesCount(blog.likes?.length || 0);
      setLiked(userId ? blog.likes?.some(like => like._id === userId) : false);
    }
  }, [blog, userId]);

  const handleLike = async () => {
    if (!userId) {
      alert("Please login to like this blog.");
      return;
    }

    setLiked(prev => !prev);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);

    await dispatch(likeBlog(id));
    dispatch(getSingleBlog(id));
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (!blog) return <div className="text-center mt-20 text-xl">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-5 space-y-8">

      {/* Featured Image */}
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-lg shadow-md"
        />
      )}

      {/* Title & Meta */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold">{blog.title}</h1>

        <p className="text-gray-500 text-sm sm:text-base">{blog.excerpt}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 sm:gap-5 items-center text-gray-600 text-sm">

          <span className="flex items-center gap-1">
            <FaEye /> {blog.viewsCount || 0} Views
          </span>

          <span onClick={handleLike} className="flex items-center gap-1 cursor-pointer">
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            {likesCount} Likes
          </span>

          <span className="flex items-center gap-1">
            <FaShareAlt /> {blog.shareCount || 0} Shares
          </span>

          <span className="flex items-center gap-1">
            <strong>Category:</strong> {blog.category}
          </span>

          <span className="flex items-center gap-1">
            <strong>Product:</strong> {blog.productCategory}
          </span>

        </div>
      </div>

      {/* Content */}
      <div className="prose prose-sm sm:prose-lg max-w-none text-gray-800 leading-relaxed">
        {blog.content}
      </div>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* SEO Meta */}
      <div className="bg-gray-50 p-4 rounded-lg border space-y-2">
        <h3 className="font-semibold text-gray-700 text-lg">SEO Details</h3>

        <p className="text-sm sm:text-base">
          <strong>Meta Title:</strong> {blog.metaTitle}
        </p>

        <p className="text-sm sm:text-base">
          <strong>Meta Description:</strong> {blog.metaDescription}
        </p>

        {blog.keywords?.length > 0 && (
          <p className="flex flex-wrap gap-2 items-center text-sm">
            <FaTag className="text-gray-600" />
            {blog.keywords.map((kw, i) => (
              <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm">
                {kw}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Comments */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">
          Comments ({blog.comments?.length || 0})
        </h3>

        {blog.comments?.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">No comments yet.</p>
        ) : (
          blog.comments.map((comment, i) => (
            <div key={i} className="border-b pb-2">
              <p className="font-semibold">{comment.user?.name || "Anonymous"}</p>
              <p className="text-gray-700 text-sm sm:text-base">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogDetails;
