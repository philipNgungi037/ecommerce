import React from 'react'
import NormalForms from '../re-usable components/forms/NormalForms'; // Importing the reusable form component
import { loginFields } from '../re-usable components/forms/forms-data'; // Importing the login form fields
import { Link } from 'react-router-dom';

// This component, accepts onSubmit as a prop from parent signin-page
const Login = ({ onSubmit }) => {


    return (
        <div className="login-container p-2 md:p-4 bg-white rounded-md"> 
   
            {/* Reusing the NormalForms component for rendering the login form */}
            <NormalForms
                fields={loginFields} // Passes login form fields imported from formFields.js
                onSubmit={onSubmit} // Passes onSubmit function to handle form submission
                buttonText="Login" // Text to display on the submit button
                className="login-form" // Additional CSS class for styling the form
            />
            <Link to="f">
        {" "}<h2 className="font-semibold  p-2  hover:underline text-center">
          Forgot your password?
        </h2>
      </Link>
      <h2 className="p-2 mb-8 text-center">
        Are you new here?<a href="register">
          {" "}<span className="text-appColor">
            Register
          </span>
        </a>
      </h2>
        </div>
    )
}

export default Login