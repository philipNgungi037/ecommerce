import React from 'react'
import Logo from '../../components/header/Logo'
import Login from '../../components/authentication/Login'
import { useAuth } from '../../components/contexts/AuthContext'
import { ClipLoader } from "react-spinners";

const Signin = () => {
  // Use the login function from the AuthContext
  const { login, errorMsg, LoginError, loading, successMsg } = useAuth();

  // Define the onSubmit function to handle form submission
  const handleSubmit = (formData) => {

    // Call login function from AuthContext
    login(formData);
  };
  return (
    <div className='signin-page w-full h-full bg-gray-200'>
      <div className='signin-logo'>
        <Logo />
        <h1 className='signin-title p-4 text-center'>
          Access your account
        </h1>
      </div>
      <div className='signin-login-container flex justify-center items-center p-8 '>
        { loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#000" loading={true} size={35} /> {/* Render the ClipLoader component */}
        </div>
        
      ) : (
        <Login onSubmit={handleSubmit} />
      )
        }
      </div>
      {/* Display success or error messages */}
      {successMsg && <p className="text-green-500 text-center mt-4">{successMsg}</p>}
      {errorMsg && <p className="text-red-500 text-center mt-4">{LoginError}</p>}
    </div>
  )
}

export default Signin