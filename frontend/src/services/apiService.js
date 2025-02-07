/**
 * Clase para manejar peticiones HTTP de manera simplificada.
 */
class apiService {
  /**
   * Constructor de la clase apiService.
   * @param {string} baseUrl - URL base del servicio API.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  /**
   * Método genérico para realizar peticiones HTTP.
   * @param {string} endpoint - Endpoint de la API a la que se realizará la petición.
   * @param {string} [method="GET"] - Método HTTP de la petición (GET, POST, PUT, DELETE).
   * @param {Object|null} [data=null] - Datos a enviar en el cuerpo de la petición (para POST y PUT).
   * @param {Object} [customHeaders={}] - Encabezados personalizados para la petición.
   * @returns {Promise<Object>} - Respuesta de la API en formato JSON.
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

  /**
   * Método para realizar una petición GET.
   * @param {string} endpoint - Endpoint de la API.
   * @param {Object} [customHeaders={}] - Encabezados personalizados.
   * @returns {Promise<Object>} - Respuesta de la API en formato JSON.
   */
  get(endpoint, customHeaders = {}) {
    return this.request(endpoint, "GET", null, customHeaders);
  }

  /**
   * Método para realizar una petición POST.
   * @param {string} endpoint - Endpoint de la API.
   * @param {Object} data - Datos a enviar en la petición.
   * @param {Object} [customHeaders={}] - Encabezados personalizados.
   * @returns {Promise<Object>} - Respuesta de la API en formato JSON.
   */
  post(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "POST", data, customHeaders);
  }

  /**
   * Método para realizar una petición PUT.
   * @param {string} endpoint - Endpoint de la API.
   * @param {Object} data - Datos a actualizar en la petición.
   * @param {Object} [customHeaders={}] - Encabezados personalizados.
   * @returns {Promise<Object>} - Respuesta de la API en formato JSON.
   */
  put(endpoint, data, customHeaders = {}) {
    return this.request(endpoint, "PUT", data, customHeaders);
  }

  /**
   * Método para realizar una petición DELETE.
   * @param {string} endpoint - Endpoint de la API.
   * @param {Object} [customHeaders={}] - Encabezados personalizados.
   * @returns {Promise<Object>} - Respuesta de la API en formato JSON.
   */
  delete(endpoint, customHeaders = {}) {
    return this.request(endpoint, "DELETE", null, customHeaders);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new apiService("http://127.0.0.1:5000");
