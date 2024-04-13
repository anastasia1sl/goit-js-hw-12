export function fetchData(searchQuery) {
  const API_KEY = '42024846-08e8117282465e780d398d927';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 21,
  });

  return fetch(`${BASE_URL}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error('error');
    }

    return response.json();
  });
}
