import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/CartSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
        <HomePage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      // <ProtectedRoute>
        <CartPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      // <ProtectedRoute>
        <CheckoutPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      // <ProtectedRoute>
        <ProductDetailsPage />
      // </ProtectedRoute>
    ),
  },
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  // console.log('user from App js', user[0].id);

  // loading user cart
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user[0]?.id));
    }
  },[dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
