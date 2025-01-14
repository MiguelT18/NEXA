# Integrantes del equipo:
1. Miguel Teran
2. Axel Miranda

## Tareas pendientes
- [❓] Asegurarse de que los ids de los usuarios creados sean aleatorios 'uuid'
- [❓] Implementar la e] Implementar la estrategias de trading
- [❓] Implementar la gestión de datos históricos
- [❓] Implementar la gestión de ordenes y acciones
- [❓] Crear archivo de configuración para la conexión con el broker
- [❓] config/broker.py  -> Validar las credenciales.
- [❓] config/broker.py  -> Conectar a MetaTrader5.
- [❓] config/broker.py  -> Cerrar la conexión.
- [❓] config/broker.py  -> Ejecutar el flujo de la configuración con el broker en el archivo principal que ejecuta el flujo de la aplicación.

## Tareas completadas:
- [✔] Organizar la estructura de la aplicación
- [✔] Crear la base de datos
- [✔] Conexion con la base de datos
- [✔] Registrar datos del usuario
- [✔] Iniciar sesión en la aplicación
- [✔] Crear la vista de iniciar sesión

## Estructura del proyecto
project/
├── app/
│   ├── __init__.py            # Inicialización de la aplicación principal
│   ├── models.py              # Modelos generales compartidos
│   ├── mod_auth/              # Módulo de autenticación
│   │   ├── __init__.py        # Inicialización del módulo de autenticación
│   │   ├── controllers.py     # Controladores para rutas de autenticación
│   │   ├── forms.py           # Formularios relacionados con autenticación
│   │   ├── models.py          # Modelos relacionados con autenticación
│   ├── mod_reports/           # Módulo de reportes
│   │   ├── __init__.py        # Inicialización del módulo de reportes
│   │   ├── controllers.py     # Rutas y lógica de reportes
│   │   ├── forms.py           # Formularios relacionados con reportes
│   │   ├── models.py          # Modelos relacionados con reportes
│   │   ├── utils.py           # Funciones de utilidad para reportes
│   ├── mod_statistics/        # Módulo de estadísticas
│   │   ├── __init__.py        # Inicialización del módulo de estadísticas
│   │   ├── controllers.py     # Rutas y lógica de estadísticas
│   │   ├── forms.py           # Formularios relacionados con estadísticas
│   │   ├── models.py          # Modelos relacionados con estadísticas
│   │   ├── utils.py           # Funciones de utilidad para estadísticas
│   ├── mod_trading/           # Módulo principal de predicción de trading
│   │   ├── __init__.py        # Inicialización del módulo de predicción
│   │   ├── controllers.py     # Rutas para funcionalidades de trading
│   │   ├── forms.py           # Formularios relacionados con predicción
│   │   ├── models.py          # Modelos relacionados con predicción
│   │   ├── utils.py           # Funciones de utilidad (cálculos, APIs)
│   ├── static/                # Archivos estáticos
│   │   ├── assets/            # Archivos generales de recursos
│   │   ├── css/               # Archivos CSS
│   │   └── img/               # Imágenes
│   └── templates/             # Plantillas HTML
│       ├── auth/              # Plantillas relacionadas con autenticación
│       ├── reports/           # Plantillas relacionadas con reportes
│       ├── statistics/        # Plantillas relacionadas con estadísticas
│       ├── trading/           # Plantillas relacionadas con predicción
│       └── base.html          # Base para heredar estilos y estructura
├── config.py                  # Configuración de la aplicación
├── run.py                     # Punto de entrada para iniciar la aplicación
├── requirements.txt           # Dependencias del proyecto
├── .env                       # Variables de entorno sensibles

# FRONTEND

# Tareas completadas

✅ Reducir el tamaño de la imagen de hero (Largest Contentful Paint - LCP)

# Tareas pendientes

- [❓] Crear un componente market ticker que muestre algunos precios de algunos activos del mercado en forma de carrusel infinito
- [❓] Usar cookies junto con localStorage para menjar las sesiones del usuario

# Caracteristicas a tomar en cuenta
1. Diseñar un sistema de planes mensuales y anuales para la suscripción al bot.
2. Diseñar un sistema de afiliados al bot y/u ofrecer descuentos para usuarios que traigan más clientes.
