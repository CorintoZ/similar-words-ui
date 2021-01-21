import axios from 'axios';

const apiClient = axios.create({
  baseURL: `https://api.gavagai.se/v3`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json;charset=UTF-8',
  },
});

const API_KEY = '12c1199d4b43706e6a6e8394b518b7f8';

export default {
  getSimilarWords(language, word) {
    return apiClient.get(
      `/lexicon/${language}/${word}?additionalFields=SEMANTICALLY_SIMILAR_WORDS&apiKey=${API_KEY}`
    );
  },
};
