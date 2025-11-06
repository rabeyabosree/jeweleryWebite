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

  // Get logged in user
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Fetch blog on mount
  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [dispatch, id]);

  // Set liked status and likes count whenever blog changes
  useEffect(() => {
    if (blog) {
      setLikesCount(blog.likes?.length || 0);
      setLiked(userId ? blog.likes?.some(like => like._id === userId) : false);
    }
  }, [blog, userId]);

  // Handle like/unlike click
  const handleLike = async () => {
    if (!userId) {
      alert("Please login to like this blog.");
      return;
    }

    // Optimistic UI update
    setLiked(prev => !prev);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);

    // Dispatch like/unlike action
    await dispatch(likeBlog(id));

    // Refetch blog to sync with backend (optional)
    dispatch(getSingleBlog(id));
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (!blog) return <div className="text-center mt-20 text-xl">Blog not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-5 space-y-8">
      {/* Featured Image */}
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
      )}

      {/* Title & Meta */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-gray-500">{blog.excerpt}</p>
        <div className="flex gap-4 items-center text-gray-600 text-sm">
          <span className="flex items-center gap-1">
            <FaEye /> {blog.viewsCount || 0} Views
          </span>

          {/* Like Button */}
          <span className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {blog?.likesCount || 0} Likes
          </span>


          <span className="flex items-center gap-1">
            <FaShareAlt /> {blog.shareCount || 0} Shares
          </span>

          <span className="flex items-center gap-1">
            Category: <strong className="ml-1">{blog.category}</strong>
          </span>

          <span className="flex items-center gap-1">
            Product Category: <strong className="ml-1">{blog.productCategory}</strong>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <p>{blog.content}</p>
      </div>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* SEO Meta */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 border border-gray-200">
        <h3 className="font-semibold text-gray-700">SEO Details</h3>
        <p><strong>Meta Title:</strong> {blog.metaTitle}</p>
        <p><strong>Meta Description:</strong> {blog.metaDescription}</p>
        {blog.keywords?.length > 0 && (
          <p className="flex flex-wrap gap-2 items-center">
            <FaTag />
            {blog.keywords.map((kw, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {kw}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">
          Comments ({blog.comments?.length || 0})
        </h3>
        {(blog.comments?.length || 0) === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          blog.comments.map((comment, idx) => (
            <div key={idx} className="border-b py-2">
              <p className="font-semibold">{comment.user?.name || "Anonymous"}</p>
              <p>{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BlogDetails;
