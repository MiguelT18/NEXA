from app import app, db  # Importa la aplicación y la instancia de la base de datos
from flask_migrate import Migrate

# Inicializar Flask-Migrate con la aplicación y la base de datos
migrate = Migrate(app, db)

if __name__ == '__main__':
    # Aquí, dentro del bloque if, estás dentro del contexto de la aplicación
    # Puedes realizar operaciones de base de datos aquí

    # Crear las tablas de la base de datos si aún no existen
    with app.app_context():
        db.create_all()

    # También puedes aplicar migraciones si las estás usando
    # flask db upgrade

    # Ejecuta el servidor de desarrollo
    app.run(host='0.0.0.0', port=5000, debug=True)