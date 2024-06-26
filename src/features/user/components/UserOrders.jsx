import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedinUserOrdersAsync, selectUserInfo, selectUserInfoStatus, selectUserOrders } from '../UserSlice';
import { discountedPrice } from '../../../utils/constants';
import { Grid } from 'react-loader-spinner';


const UserOrders = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const orders = useSelector(selectUserOrders);
    const status = useSelector(selectUserInfoStatus);

    useEffect(()=>{
      if(user){
        dispatch(fetchLoggedinUserOrdersAsync());
      }
    },[user]);

  return (
    <>
     {/* {!items.length && <Navigate to="/" replace={true}></Navigate>} */}
     
      {orders && orders?.map((order) => (
        <div key={order.id}>
            <div className="mx-auto mb-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Order # {order?.id}
                </h1>
                <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                  Order Status : {order?.status}
                </h3>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order?.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item?.product.thumbnail}
                            alt={item?.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <div>
                                <h3><a target='_blank' href={item.itemUrl}>{item?.product.title}</a></h3>
                                <p className="mt-1 text-sm text-gray-500">{item?.product.brand}</p>
                              </div>
                              <div>
                                {/* <p className="ml-4 font-medium">${item.price}</p> */}
                                <p className="ml-4 font-medium">${discountedPrice(item?.product)}</p>
                                <p className="ml-4 text-gray-400 line-through">${item?.product.price}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900" >
                                Qty :{item.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* lower details section */}
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items :</p>
                  <p>{order.totalItems} items</p>
                </div>

                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal :</p>
                  <p>$ {order.totalAmount}</p>
                </div>

                <p className="py-2 font-medium text-gray-900 border-t-[1px]">Shipping Address :</p>

                <div className="flex justify-between gap-x-6">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Name: <span className='font-normal'>{order?.selectedAddress?.name}</span>
                      </p>
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Address: <span className='font-normal'>{order?.selectedAddress?.street}</span>
                      </p>
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Pin Code: <span className='font-normal'>{order?.selectedAddress?.pinCode}</span>
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Phone: <span className='font-normal'>{order.selectedAddress?.phone}</span>
                      </p>
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        City: <span className='font-normal'>{order.selectedAddress?.city}</span>
                      </p>
                  </div>
                </div>
              </div>
            </div> 
        </div>
      ))}
       {status === 'loading' ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
    </>
  )
}

export default UserOrders
