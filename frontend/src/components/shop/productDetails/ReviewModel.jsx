import React from 'react'
import { FaStar } from "react-icons/fa";

function ReviewModel({showReviewModal , setHover,hover, rating, setRating , setReviewText , setShowReviewModal , reviewText, handleSubmitReview}) {
  return (
    <div>
        {showReviewModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[400px] relative">
                    <h2 className="text-xl font-semibold mb-3">Write a Review</h2>
        
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`cursor-pointer text-2xl ${
                            i < (hover || rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          onClick={() => setRating(i + 1)}
                          onMouseEnter={() => setHover(i + 1)}
                          onMouseLeave={() => setHover(null)}
                        />
                      ))}
                    </div>
        
                    <textarea
                      className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-[#d4a373]"
                      rows="4"
                      placeholder="Write your review..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
        
                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() => setShowReviewModal(false)}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitReview}
                        disabled={!rating || !reviewText}
                        className="px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#b58457] transition disabled:opacity-60"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
    </div>
  )
}

export default ReviewModel