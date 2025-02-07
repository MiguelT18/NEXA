FROM python:3.11-slim

# Instalar dependencias necesarias para mysqlclient y netcat
RUN apt-get update && apt-get install -y \
  netcat-openbsd \
  pkg-config \
  default-libmysqlclient-dev \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

# Instalar herramientas necesarias (incluye mysql-client)
RUN apt-get update && apt-get install -y default-mysql-client \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY backend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
