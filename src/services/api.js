import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data.sort((a, b) => 
      a.name.common.localeCompare(b.name.common)
    );
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
