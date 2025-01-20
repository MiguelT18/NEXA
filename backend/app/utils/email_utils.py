import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import Config


def send_email(to_email, subject, body):
    """
    Envía un correo electrónico con los parámetros especificados.

    Args:
        to_email (str): Dirección de correo del destinatario.
        subject (str): Asunto del correo.
        body (str): Cuerpo del correo (texto plano o HTML).

    Raises:
        Exception: En caso de error al enviar el correo.
    """
    try:
        # Configurar el correo emisor y el servidor SMTP
        smtp_server = Config.SMTP_SERVER
        smtp_port = Config.SMTP_PORT
        sender_email = Config.SMTP_USERNAME
        sender_password = Config.SMTP_PASSWORD

        # Crear el mensaje
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'html'))

        # Conectar al servidor SMTP y enviar el correo
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  # Habilitar conexión segura
            server.login(sender_email, sender_password)
            server.send_message(msg)

        print(f"Correo enviado a {to_email} con éxito.")
    except Exception as e:
        print(f"Error al enviar el correo: {str(e)}")
        raise