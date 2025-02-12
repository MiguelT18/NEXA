/**
 * Clase Scripts que contiene utilidades para manipulación de datos.
 */
export default class Scripts {
  /**
   * Capitaliza la primera letra de cada palabra en una cadena de texto.
   *
   * @param {string} text - La cadena de texto a capitalizar.
   * @returns {string} La cadena de texto con la primera letra de cada palabra en mayúscula.
   */
  static capitalizeWords(text) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
