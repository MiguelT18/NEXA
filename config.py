import os

# Habilita el modo de depuración de Flask. Esto es útil para el desarrollo ya que proporciona
# errores detallados y reinicia automáticamente el servidor cuando se realizan cambios en el código.
DEBUG = True

# Directorio base del proyecto. Se utiliza para definir rutas absolutas dentro de la aplicación.
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Configuración de la conexión a la base de datos MySQL.
# SQLALCHEMY_DATABASE_URI define la cadena de conexión con el usuario, contraseña, host y nombre de la base de datos.
SQLALCHEMY_DATABASE_URI = 'mysql://root:Univalle@localhost/dbbot'

# Desactiva las modificaciones de seguimiento de SQLAlchemy para mejorar el rendimiento.
SQLALCHEMY_TRACK_MODIFICATIONS = False

# Opciones de conexión a la base de datos que pueden ser necesarias para configuraciones específicas.
DATABASE_CONNECT_OPTIONS = {}

# Configuración de hilos de la aplicación. Se asume comúnmente que se utilizan 2 hilos por núcleo de procesador disponible:
# uno para manejar solicitudes entrantes y otro para operaciones en segundo plano.
THREADS_PER_PAGE = 2

# Habilita la protección contra CSRF (Cross-site Request Forgery).
# Esto es crucial para la seguridad en formularios y peticiones POST para evitar ataques maliciosos.
CSRF_ENABLED = True

# Clave secreta utilizada para firmar los datos de la sesión para protección CSRF.
# Debe ser una clave única y secreta para cada aplicación.
CSRF_SESSION_KEY = "secret"

# Clave secreta para firmar las cookies. Similar a CSRF_SESSION_KEY, debe ser única y secreta.
SECRET_KEY = "secret"

# Carpeta estática donde se almacenan los archivos estáticos como CSS, JavaScript e imágenes.
STATIC_FOLDER = '/static'

# Carpeta de archivos dentro de la carpeta estática. Utilizada para almacenar archivos subidos por los usuarios u otros archivos necesarios.
FILES_FOLDER = os.path.join(STATIC_FOLDER, 'files')

# Ruta para guardar las imágenes de perfil de los usuarios.
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'img')