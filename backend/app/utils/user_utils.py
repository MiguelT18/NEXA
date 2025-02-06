import random
import string
import base64
import os

def generate_random_password(length=12):
    """
    Genera una contraseña aleatoria.

    :param length: Longitud de la contraseña a generar (por defecto es 12).
    :return: Una cadena que representa la contraseña aleatoria generada.
    """
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choices(characters, k=length))

def generate_username(last_name):
    """
    Genera un nombre de usuario basado en el apellido proporcionado.

    :param last_name: Apellido del cual se generará el nombre de usuario.
    :return: Una cadena que representa el nombre de usuario generado.
    """
    first_last_name = last_name.split()[0] if last_name else "usuario"
    random_number = random.randint(1000, 9999)
    return f"{first_last_name.lower()}{random_number}"

def convert_blob_to_base64(blob):
    """
    Convierte un BLOB a una cadena base64.

    :param blob: Datos binarios (BLOB) a convertir.
    :return: Una cadena que representa los datos en formato base64, o None si el BLOB es None.
    """
    if blob is None:
        return None
    return base64.b64encode(blob).decode('utf-8')  # Convertir a base64 y decodificar a UTF-8

def load_default_image():
    """
    Carga la imagen por defecto desde el sistema de archivos y la convierte a BLOB.

    :return: Datos binarios de la imagen.
    """
    image_path = os.path.join('app', 'static', 'img', 'profile-img.jpg')  # Ruta de la imagen por defecto
    with open(image_path, 'rb') as img_file:
        return img_file.read()  # Leer el contenido del archivo como BLOB