import random
import string


def generate_random_password(length=12):
    """
    Genera una contraseña aleatoria.

    :param length: Longitud de la contraseña a generar (por defecto es 12).
    :return: Una cadena que representa la contraseña aleatoria generada.
    """
    characters = string.ascii_letters + string.digits + string.punctuation
    return "".join(random.choices(characters, k=length))


def generate_username(last_name):
    """
    Genera un nombre de usuario basado en el apellido proporcionado.

    :param last_name: Apellido del cual se generará el nombre de usuario.
    :return: Una cadena que representa el nombre de usuario generado.
    """
    first_last_name = last_name.split()[0] if last_name else "usuario"
    random_number = random.randint(1000, 9999)
    return f"{first_last_name.lower()}{random_number}"
