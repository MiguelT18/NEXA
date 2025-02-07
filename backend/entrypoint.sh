#!/bin/bash

echo "Esperando a que MySQL esté listo..."
while ! nc -z mysql 3306; do  
  sleep 2  
done  

echo "MySQL está listo."

echo "Verificando migraciones de la base de datos..."

# Verificar si cualquier tabla ya existe
EXISTING_TABLES=$(mysql -u root -p$MYSQL_ROOT_PASSWORD -e "SHOW TABLES IN $MYSQL_DATABASE;")
NEEDS_MIGRATION=false

# Listar las tablas y comparar si existen las que se deben crear
for TABLE in $(echo "$EXISTING_TABLES" | grep -v '^Tables' | awk '{print $1}'); do
  if [[ "$TABLE" == "persons" ]]; then
    echo "La tabla 'persons' ya existe. Se verificará si necesita modificaciones."
    NEEDS_MIGRATION=true
  fi
  # Puedes agregar otras verificaciones para otras tablas si es necesario
done

# Si la tabla no existe o necesita modificaciones, aplicar migraciones
if $NEEDS_MIGRATION; then
  echo "Aplicando migraciones..."
  flask db upgrade || { echo "Error aplicando migraciones"; exit 1; }
else
  echo "Todas las tablas están actualizadas. No es necesario aplicar migraciones."
fi

# Verificar si el archivo principal existe antes de iniciar la app
if [ -f "/app/run.py" ]; then
  echo "Iniciando la aplicación con run.py..."
  exec python run.py
elif [ -f "/app/app.py" ]; then
  echo "Iniciando la aplicación con app.py..."
  exec python app.py
else
  echo "Error: No se encontró ni run.py ni app.py en /app/"
  exit 1
fi
