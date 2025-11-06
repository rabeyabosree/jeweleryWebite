import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getReviews, SingleProduct } from "../../../redux/reducers/productReducer";
import ReviewModel from "./ReviewModel";
import { FaStar } from "react-icons/fa";
import { addToCart, updateQty } from "../../../redux/reducers/cartReducer"; // ✅ updateQty added

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, error, loading } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart); // ✅ cart state

  const [activeTab, setActiveTab] = useState("description");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch product + reviews
  useEffect(() => {
    dispatch(SingleProduct(id));
    dispatch(getReviews(id));
  }, [dispatch, id]);

  // ✅ Check if product exists in cart
  useEffect(() => {
    const existingItem = cartItems.find((item) => item._id === id);
    if (existingItem) {
      setQuantity(existingItem.qty);
    }
  }, [cartItems, id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading product...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product || Object.keys(product).length === 0)
    return <p className="text-center mt-10 text-gray-500">No product found.</p>;

  // Calculate discounted price
  const salePrice =
    product.sale > 0
      ? product.price - (product.price * product.sale) / 100
      : product.price;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(addReview({ id, rating, comment: reviewText }));
    setShowReviewModal(false);
    setRating(0);
    setReviewText("");
  };

  // ✅ Handle Quantity Change + Sync with Cart
  const handleQtyChange = (type) => {
    let newQty = quantity;

    if (type === "inc" && quantity < product.stock) newQty++;
    if (type === "dec" && quantity > 1) newQty--;

    setQuantity(newQty);

    const existingItem = cartItems.find((x) => x._id === product._id);

    if (existingItem) {
      // ✅ Update existing cart item quantity
      dispatch(updateQty({ id: product._id, qty: newQty }));
    } else {
      // ✅ If not in cart yet, add it directly with current quantity
      dispatch(
        addToCart({
          _id: product._id,
          title: product.title,
          image: product.image,
          price: product.sale
            ? product.price - (product.price * product.sale) / 100
            : product.price,
          stock: product.stock,
          qty: newQty,
        })
      );
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-5 bg-white rounded-lg mt-6">
      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-8 relative">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.title}
          className="w-full md:w-1/2 object-cover h-[380px] rounded-lg shadow-sm"
        />

        <div className="flex-1">
          <p className="text-gray-500 mb-2 capitalize">{product.category}</p>

          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`${i < Math.round(product.averageRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
            <span className="text-gray-500">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          {/* Price Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            {product.sale > 0 ? (
              <>
                <div>
                  <h3 className="text-md font-semibold mb-1"> Price:</h3>
                  <p className="text-gray-400 line-through text-sm">
                     ৳ {product.price.toLocaleString()}
                  </p>
                  <p className="text-2xl font-semibold text-blue-600">
                    ৳ {salePrice.toLocaleString()}
                    <span className="ml-2 text-sm text-gray-500">
                      (After Discount)
                    </span>
                  </p>
                </div>
                <p className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.sale}% OFF
                </p>
              </>
            ) : (
              <p className="text-2xl font-semibold text-gray-800">
                ৳ {product.price.toLocaleString()}
              </p>
            )}
          </div>



          {/* Materials */}
          <div className="mb-4">
            <h2 className="font-semibold mb-1">Materials:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {product.materials?.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          </div>

          {/* ✅ Quantity Selector */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => handleQtyChange("dec")}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
            >
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => handleQtyChange("inc")}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
            >
              +
            </button>
          </div>
          {/* Stock Info */}
          <p className="text-gray-600 mt-4 ">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-red-500 font-medium">Out of stock</span>
            )}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    _id: product._id,
                    title: product.title,
                    image: product.image,
                    price: salePrice,
                    stock: product.stock,
                    qty: quantity, // ✅ use current quantity
                  })
                );
                navigate("/cart");
              }}
              className="flex-1 bg-[#d4a373] text-white py-3 rounded-md font-semibold hover:bg-[#b58457] transition"
            >
              Add to Cart
            </button>


            <button
              onClick={() => navigate("/checkout")}
              className="flex-1 bg-[#f59e0b] text-white py-3 rounded-md font-semibold hover:bg-[#d97706] transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex border-b mb-4">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 capitalize transition-all duration-200 ${activeTab === tab
                ? "border-b-2 border-blue-500 font-semibold text-blue-600"
                : "text-gray-600 hover:text-blue-500"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-gray-700">
          {activeTab === "description" && (
            <p className="leading-relaxed">{product.description}</p>
          )}
          {activeTab === "additional" && (
            <p className="leading-relaxed">{product.additionalDescription}</p>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {product.reviews?.length > 0 ? (
                product.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-md bg-gray-50 border text-gray-700"
                  >
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <FaStar
                          key={idx}
                          className={`${idx < r.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <p className="mt-1">{r.comment}</p>
                    <small className="text-gray-400">
                      - {r.userName || "Anonymous"}
                    </small>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}

              {/* Add Review Button */}
              <button
                onClick={() => setShowReviewModal(true)}
                className="mt-4 bg-[#d4a373] text-white px-4 py-2 rounded-md hover:bg-[#b58457] transition"
              >
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModel
        showReviewModal={showReviewModal}
        setHover={setHover}
        setRating={setRating}
        setReviewText={setReviewText}
        setShowReviewModal={setShowReviewModal}
        reviewText={reviewText}
        handleSubmitReview={handleSubmitReview}
        hover={hover}
        rating={rating}
      />
    </div>
  );
}

export default ProductDetails;
