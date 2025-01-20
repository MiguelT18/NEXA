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