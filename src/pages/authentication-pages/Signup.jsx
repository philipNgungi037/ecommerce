import React from 'react'
import Logo from '../../components/header/Logo'
import Register from '../../components/authentication/Register'
import { useAuth } from '../../components/contexts/AuthContext';

// This component will be rendering all signup/register UIs
const Signup = () => {

    //signup variables
    const { signup, successMsg, errorMsg } = useAuth();
    // Define the onSubmit function to handle form submission
    const handleSubmit = (formData) => {
        // Call the signup function from context
        signup(formData);
    };
    return (
        <div className='signup-page w-full h-full bg-gray-200 '>
            <Logo />
            <h1 className='signin-title p-4 text-center'>
                Create an Account
            </h1>
            <div className='flex justify-center p-8'> 
                <Register onSubmit={handleSubmit} />
            </div>


            {/* Display success message if any */}
            {successMsg && (
                <div className="text-green-500 text-center mt-4">
                    {successMsg}
                </div>
            )}

            {/* Display error message if any */}
            {errorMsg && (
                <div className="text-red-500 text-center mt-4">
                    {errorMsg}
                </div>
            )}

        </div>
    )
}

export default Signup