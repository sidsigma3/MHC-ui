import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'https://mhc-backend-six.vercel.app'; // Replace with your API base URL

const API_URL = process.env.REACT_APP_API_URL || 'https://api.mediprobehealthcare.life';


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, { email, password },{ withCredentials: true } );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Server error');
  }
};


export const loginWithGoogle = async (credential) => {
  const response = await axios.post(`${API_URL}/api/users/auth/google`, { token: credential }, { withCredentials: true } );
  return response.data;
};


export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/create`, userData,);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Server error');
  }
};

export const createUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/createNewUser`, userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : 'Server error');
    }
};
  


export const createSurvey = async (surveyData) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/survey/create`, surveyData, { withCredentials: true } );
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : 'Server error');
    }
  };


  export const getUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/${userId}`,{ withCredentials: true } );
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : 'Server error');
    }
  };

  export const updateUserDetails = async (userId, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/api/users/update/${userId}`, updatedData,{ withCredentials: true } );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to update profile");
    }
  };

  export const getSurveyById = async (userId, { startDate, endDate } = {}) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/survey/${userId}`, {
        params: {
          startDate: startDate ,
          endDate: endDate ,
        },
        withCredentials: true
      },
     );
      return response.data; // Return the survey data
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to fetch survey details");
    }
  };
  

  export const getAllSurveys = async ({ startDate, endDate } = {}) => {
    try {
      

      const response = await axios.get(`${API_URL}/api/users/surveys/getAll`, {
        params: {
          startDate,
          endDate,
        },
        withCredentials: true,
      },
    );
      return response.data; // Return all survey data
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to fetch surveys");
    }
};


  export const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users/getAll`,{ withCredentials: true } ); // Call your backend API to fetch users
      return response.data; // Return the user data
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to fetch users");
    }
  };


  // export const saveProfilePicture = async (formData) => {
  //   try {
  //     const response = await axios.post(`${API_URL}/api/users/profilePicSave`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     return response.data; // Return the response data for further use
  //   } catch (error) {
  //     throw error.response?.data || error.message; // Throw error if needed
  //   }
  // };


  export const saveProfilePicture = async (base64Image, userId) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/profilePicSave`, {
        userId,
        base64Image,
      },{ withCredentials: true });
      console.log("Profile picture uploaded successfully:", response.data);
  
      return response.data;
    } catch (error) {
      console.error("Error uploading profile picture:", error.response?.data || error.message);
      throw error;
    }
  };

  
  export const logoutUserAPI = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/users/logoutUser`,{},{ withCredentials: true });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.error : 'Server error');
    }
  };