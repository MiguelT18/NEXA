from flask import Flask
from app.extensions import db, migrate, cors
from app.routes.user_routes import user_bp


def create_app():
    """
    Crea y configura la instancia principal de la aplicación Flask.
    """
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(
        app, resources={r"/api/*": {"origins": "*"}}
    )  # Habilitar CORS para todas las rutas de la API

    # Registrar blueprints
    app.register_blueprint(user_bp)

    return app
