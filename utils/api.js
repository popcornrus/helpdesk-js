import axios from "axios";

class Api {
  constructor({
    baseUrl = '',
    token = ''
  }) {
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async get(url) {
    return this.axios.get(url);
  }

  async post(url, data) {
      return this.axios.post(url, data);
  }
}

export default Api;