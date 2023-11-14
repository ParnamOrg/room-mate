import axios from 'axios';

export const checkAuthenticationStatus = async (token) => {
  try {
    console.log('Axios success resp:');
    const response = await axios.get('/api/v1/authentication_status');
    return response.data
  } catch (error) {
    console.error('Error in Axios request:', error);
    throw error;
  }
};
