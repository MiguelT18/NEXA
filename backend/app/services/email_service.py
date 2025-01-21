from app.utils.email_utils import send_email

def send_welcome_email(to_email, name):
    """
    Servicio para enviar un correo de bienvenida.

    Args:
        to_email (str): Dirección de correo del destinatario.
        name (str): Nombre del usuario.

    Returns:
        str: Mensaje de éxito.
    """
    subject = "Bienvenido a la plataforma"
    body = f"""
    <h1>Hola, {name}!</h1>
    <p>Gracias por registrarte en nuestra plataforma. Estamos encantados de tenerte con nosotros.</p>
    """
    send_email(to_email, subject, body)
    return "Correo enviado con éxito"

def send_user_credentials_email(to_email, name, username, password):
    """
    Servicio para enviar las credenciales del usuario por correo electrónico.

    Args:
        to_email (str): Dirección de correo del destinatario.
        name (str): Nombre del usuario.
        username (str): Nombre de usuario del usuario.
        password (str): Contraseña del usuario.

    Returns:
        str: Mensaje de éxito.
    """
    subject = "Tus credenciales de registro"
    body = f"""
    <h1>Hola, {name}!</h1>
    <p>Gracias por registrarte en nuestra plataforma. Aquí están tus credenciales:</p>
    <p><strong>Nombre de usuario:</strong> {username}</p>
    <p><strong>Contraseña:</strong> {password}</p>
    <p>Te recomendamos que cambies tu contraseña después de iniciar sesión.</p>
    """
    send_email(to_email, subject, body)
    return "Correo con credenciales enviado con éxito"