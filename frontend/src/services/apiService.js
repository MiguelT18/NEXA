class apiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Realiza una solicitud HTTP.
   * @param {string} endpoint - El endpoint de la API.
   * @param {string} method - El método HTTP (GET, POST, PUT).
   * @param {Object} data - Los datos a enviar en la solicitud (opcional).
   * @param {Object} customHeaders - Encabezados personalizados (opcional).
   * @returns {Promise<Object>} - La respuesta de la API en formato JSON.
   * @throws {Error} - Lanza un error si la respuesta no es exitosa.
   */
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
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new apiService("http://127.0.0.1:5000/api/");
