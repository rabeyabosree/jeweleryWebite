import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrder } from '../../../redux/reducers/orderReducer';


function OrderSuccess() {
    const { orderId } = useParams();
    const { order, loading } = useSelector((state) => state.orders);

    const dispatch = useDispatch();

    useEffect(() => {
        if (orderId) {
            dispatch(getOrder(orderId)); // ✅ send string only
        }
    }, [dispatch, orderId]);

    if (loading || !order) return <p>Loading...</p>;

    return (

        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">

            <h2 className="text-2xl font-semibold text-green-600 mb-4">Order Successful!</h2>
            <p className="text-gray-600 mb-2">Order ID: <b>{order._id}</b></p>
            <p className="text-gray-600 mb-2">Total Amount: <b>${order.totalPrice}</b></p>
            <p className="text-gray-600 mb-2">Payment Method: <b>{order.paymentMethod}</b></p>
            <p className="text-gray-600 mb-2">Status: <b>{order.status}</b></p>


            <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Ordered Items:</h3>
                {order?.orderItems?.map(item => (
                    <div key={item._id} className="flex items-center gap-4 mb-3">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div>
                            <p>{item.title}</p>
                            <p className="text-gray-500 text-sm">{item.qty} × ${item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderSuccess;
