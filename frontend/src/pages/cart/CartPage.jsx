import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "../../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";


function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Calculate total price
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="py-12 bg-[#d4a373] text-center text-white">
        <h1 className="text-4xl font-semibold tracking-wide">Cart Page</h1>
        <p className="mt-2 text-sm opacity-90">
          Explore our beautiful jewelry collections and find your perfect piece
        </p>
        <div className="flex items-center justify-center mt-4 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <MdKeyboardArrowRight className="text-lg" />
          <a href="/cart" className="hover:underline">Cart</a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto p-5">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
            <button onClick={()=> navigate("/shop")} className="mt-4 bg-[#d4a373] text-white px-4 py-2 rounded-md hover:bg-[#b58457] transition">Shop Now</button>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/shops/${item._id}`)}
                className="flex justify-between items-center border-b border-gray-3s00 pb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQty({
                              id: item._id,
                              qty: Math.max(item.qty - 1, 1),
                            })
                          )
                        }
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQty({
                              id: item._id,
                              qty: Math.min(item.qty + 1, item.stock),
                            })
                          )
                        }
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <button
                    onClick={(e) => { dispatch(removeFromCart(item._id)), e.stopPropagation() }}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total Price */}
            <div className="text-right mt-6 pt-4">
              <p className="text-xl font-semibold">
                Total: ${total.toFixed(2)}
              </p>
              <button onClick={() => navigate("/place-order")} className="mt-4 bg-[#d4a373] text-white px-6 py-2 rounded-md hover:bg-[#b58457] transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
