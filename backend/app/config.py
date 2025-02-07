import os

class Config:
    """
    Configuración de la aplicación Flask, incluida la configuración de correo.
    """
    SECRET_KEY = os.getenv('SECRET_KEY', 'super-secret-key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', "mysql://root:root@mysql/dbbot")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Habilita el modo de depuración de Flask. Esto es útil para el desarrollo ya que proporciona
    # errores detallados y reinicia automáticamente el servidor cuando se realizan cambios en el código.
    DEBUG = True

    # Directorio base del proyecto. Se utiliza para definir rutas absolutas dentro de la aplicación.
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    # Opciones de conexión a la base de datos que pueden ser necesarias para configuraciones específicas.
    DATABASE_CONNECT_OPTIONS = {}

    # Configuración de hilos de la aplicación. Se asume comúnmente que se utilizan 2 hilos por núcleo de procesador disponible:
    # uno para manejar solicitudes entrantes y otro para operaciones en segundo plano.
    THREADS_PER_PAGE = 2

    # Habilita la protección contra CSRF (Cross-site Request Forgery).
    # Esto es crucial para la seguridad en formularios y peticiones POST para evitar ataques maliciosos.
    CSRF_ENABLED = True
    # Carpeta estática donde se almacenan los archivos estáticos como CSS, JavaScript e imágenes.
    STATIC_FOLDER = '/static'

    # Carpeta de archivos dentro de la carpeta estática. Utilizada para almacenar archivos subidos por los usuarios u otros archivos necesarios.
    FILES_FOLDER = os.path.join(STATIC_FOLDER, 'files')

    # Ruta para guardar las imágenes de perfil de los usuarios.
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'img')

    # Configuración de correo SMTP
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME', 'axelmiranda.845@gmail.com')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', "wgzy jufx jokq pzno")