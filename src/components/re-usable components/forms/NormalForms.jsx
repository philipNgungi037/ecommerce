import React, { useState, useEffect } from 'react'

// component renders a form dynamically based on the provided fields. 
// It accepts props; fields (an array of objects representing form fields), onSubmit (a function to handle form submission), 
// buttonText (text to display on the submit button), 
// className (additional CSS classes for styling), and error (an optional error message to display).
const NormalForms = ({ fields, onSubmit, buttonText, className, error }) => {

  // Define initial form state based on the specific fields
  const initialFormState = Object.fromEntries(fields.map((field) => [field.name, '']));

  // Set up state for form data and form error
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState(error);

  // Update formError state when the error prop changes
  useEffect(() => {
    setFormError(error);
  }, [error]);

  // Function to handle input changes and update formData state as the user types.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };



  return (
    <form className={`w-full  p-4 shadow-bgColor rounded-md shadow-md ${className}`} onSubmit={handleSubmit}>

      {/* Map over fields array to render form inputs */}
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="normal-forms-label block mb-2">
            {field.label}
          </label>
          <input
            type={field.type }
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="normal-forms-input w-full p-2 border-b border-appColor bg-bgColor rounded-md  text-start "
          />
        </div>
      ))}

      {/* Display form error if any */}
      {formError && (
        <div className="text-red-500 mb-4">
          {formError}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="normal-forms-button w-full bg-appColor p-2 rounded-md"
      >
        {buttonText}
      </button>
    </form>
  )
}

export default NormalForms
