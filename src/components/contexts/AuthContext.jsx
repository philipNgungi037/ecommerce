import { useNavigate } from 'react-router-dom';
import React, { createContext, useContext, useState, useEffect } from 'react';


// Create context
const AuthContext = createContext();


// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);



// AuthProvider to wrap the application and provide authentication-related data
export const AuthProvider = ({ children }) => {


  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [user, setUser] = useState(null); // Manage user state
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [LoginError, setLoginError] = useState(null);
  const navigate = useNavigate();


  const signup = async (userData) => {
    try {
      setSuccessMsg('');
      setErrorMsg('');


      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to create an account. Please try again.'
        );
      }

      const data = await response.json();
      setSuccessMsg('Account created successfully!');
      navigate('/signin')
      console.log('User created:', data);
    } catch (error) {
      console.error('Error during signup:', error.message);
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const handleLoginSuccess = (data) => {
    localStorage.setItem("jwt", data.jwt); // Store JWT token
    localStorage.setItem("user", JSON.stringify(data.user)); // Store user in localStorage
    setUser(data.user); // Set user state
    console.log(`Welcome back ${data.user.username}!`);

     // Role-based navigation
     if (data.user.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/'); // Redirect to user dashboard or home for non-admins
      // window.reload()
    }
  };

  const handleLoginError = (LoginError) => {
    console.error(LoginError);
    setLoginError("Invalid email or password. Please try again.");
  };

  // Login function
  const login = (formData) => {
    const { email, password } = formData;
    const body = JSON.stringify({ user: { email, password } });

    if (!email || !password) {
      setLoginError("Email and password are required.");
      return;
    }

    setLoading(true);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        handleLoginSuccess(data);
      })
      .catch((error) => handleLoginError(error))
      .finally(() => setLoading(false));
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("jwt"); // Remove JWT from localStorage
    localStorage.removeItem("user"); // Remove user from localStorage
    setUser(null); // Clear user state
    navigate("/"); // Redirect to sign-in page
    window.location.reload()
  };

  // Fetch user data with authentication token, this function am reserving it for future usage
  // const fetchUserData = (token) => {
  //   fetch("http://localhost:3000/users", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error("Error fetching user data");
  //       }
  //     })
  //     .then((user) => {
  //       // Store the user object in local storage
  //       localStorage.setItem("user", JSON.stringify(user));
  //     })
  //     .catch((error) => {
  //       // Handle error fetching user data
  //       console.error(error);
  //     });
  // };

  return (
    <AuthContext.Provider value={{ signup, login,logout, successMsg, errorMsg, LoginError, loading, successMessage,  }}>
      {children}
    </AuthContext.Provider>
  );
};


