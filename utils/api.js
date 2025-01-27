import axios from "axios";

class Api {
  constructor({
    baseUrl = '',
    token = ''
  }) {
    if (!baseUrl) {
      throw new Error('Api: baseUrl is required');
    }

    if (!token) {
      throw new Error('Api: token is required');
    }

    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'X-Project-Token': `${token}`
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