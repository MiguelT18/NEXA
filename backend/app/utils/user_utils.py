import random
import string
import base64
import os
import io
from PIL import Image

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
    image_path = os.path.join(os.path.dirname(__file__), '..', 'static', 'img', 'profile-img.jpg')
    image_path = os.path.abspath(image_path)  # Convierte a ruta absoluta

    print("Ruta de la imagen:", image_path)  # Depuración

    if not os.path.exists(image_path):
        raise FileNotFoundError(f"La imagen por defecto no se encuentra en: {image_path}")

    with open(image_path, 'rb') as img_file:
        return img_file.read()
    
def normalize_image(image_data, size=(200, 200)):
    """
    Redimensiona la imagen al tamaño especificado y la convierte a formato PNG.
    
    :param image_data: Datos binarios de la imagen.
    :param size: Tupla con el tamaño deseado (ancho, alto).
    :return: Datos binarios de la imagen en formato PNG.
    """
    try:
        image = Image.open(io.BytesIO(image_data))  # Abre la imagen desde binario
        image = image.convert("RGBA")  # Asegura que tenga transparencia si es necesario
        image = image.resize(size, Image.ANTIALIAS)  # Redimensiona con alta calidad
        
        output = io.BytesIO()
        image.save(output, format="PNG")  # Guarda como PNG
        return output.getvalue()  # Retorna los datos binarios en PNG
    
    except Exception as e:
        print(f"Error al procesar la imagen: {str(e)}")
        return None