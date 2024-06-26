import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, selectError, selectLoggedInUser } from "../authSlice";

const ForgotPassword = () => {

  const { register, handleSubmit, watch, formState: { errors }} = useForm();
  const dispatch = useDispatch();
  return (
    <>
      <div className="mx-auto max-w-96 flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8 bg-white rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to='/'>
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
          </Link>
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Your Password</h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{
            // dispatch(loginUserAsync(data));
          })}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', { required: "email is requierd", pattern:{
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: 'email is not valid'} 
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send Email</button>

          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Want to go back?{" "}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
