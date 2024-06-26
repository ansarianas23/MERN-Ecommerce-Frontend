import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/CartSlice';
import { resetOrder } from '../features/order/orderSlice';

const OrderSuccessPage = () => {

  const params = useParams();
  const dispacth = useDispatch();

  useEffect(()=>{
    // resetting cart
    dispacth(resetCartAsync());

    // resetting current order
    dispacth(resetOrder());
  },[dispacth])

  return (
    <>
    {!params.id && <Navigate to='/' replace={true}></Navigate>}
    <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Order ID #{params?.id}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Placed Successfully</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">You can chcek or track your order in my Account &gt; My order</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/orders" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Go to My Orders
            </Link>
            <Link to="/" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Go back to home
            </Link>
          </div>
        </div>
    </main>
    </>
  )
}

export default OrderSuccessPage
