from flask import jsonify

def create_response(message, data=None, error=None, status=200):
    """
    Construye una respuesta JSON consistente para la API.

    Args:
        message (str): Mensaje de la respuesta.
        data (dict, optional): Datos adicionales en la respuesta. Defaults to None.
        error (str, optional): Mensaje de error si aplica. Defaults to None.
        status (int, optional): Código de estado HTTP. Defaults to 200.

    Returns:
        Response: Objeto de respuesta JSON.
    """
    return jsonify({
        "message": message,
        "data": data,
        "error": error
    }), status