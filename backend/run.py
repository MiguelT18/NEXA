from app import create_app

# Crear instancia de la aplicación Flask
app = create_app()

if __name__ == "__main__":
    # Ejecutar el servidor en modo de desarrollo
    app.run(host="0.0.0.0", port=5000, debug=True)
