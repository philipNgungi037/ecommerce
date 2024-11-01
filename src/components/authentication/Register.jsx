import React from 'react'
import NormalForms from '../re-usable components/forms/NormalForms'; // Importing the reusable form component
import { registerFields } from '../re-usable components/forms/forms-data'; // Importing the login form fields

// use onSubmit as prop from signup-page
const Register = ({ onSubmit }) => {

    return (
        <div className='register p-2 md:p-4 bg-white rounded-md '>
            {/* Reusing the NormalForms component for rendering the login form */}
            <NormalForms
                fields={registerFields} // Passes register form fields imported from formFields.js
                onSubmit={onSubmit} // Passes handleSubmit function to handle form submission
                buttonText="Register" // Text to display on the submit button
                className="" // Additional CSS class for styling the form
            />
        </div>
    )
}

export default Register