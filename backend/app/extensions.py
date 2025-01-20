from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

# Inicialización de extensiones de Flask
db = SQLAlchemy()
migrate = Migrate()
cors = CORS()  # Inicializar CORS