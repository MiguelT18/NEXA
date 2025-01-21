class apiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  async request(endpoint, method = "GET", data = null, customHeaders = {}) {
    const options = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...customHeaders,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, options);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  get(endpoint, customHeaders = {}) {
    return this.request(endpoint, "GET", null, customHeaders);
  }

  post(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "POST", data, customHeaders);
  }

  put(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "PUT", data, customHeaders);
  }

  delete(endpoint, customHeaders = {}) {
    return this.request(endpoint, "DELETE", null, customHeaders);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new apiService("http://localhost:5000");
