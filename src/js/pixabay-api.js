import axios from 'axios';

export async function fetchData(searchQuery, currentPage, perPage) {
  try {
    const API_KEY = '42024846-08e8117282465e780d398d927';
    const BASE_URL = 'https://pixabay.com/api/';

    const params = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: currentPage,
    });

    const response = await axios.get(`${BASE_URL}?${params}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
