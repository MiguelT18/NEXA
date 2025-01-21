# from app.mod_auth.models import User
import os
from flask import Flask, jsonify, render_template, request, redirect, url_for, flash, session, send_file
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import pickle
import pandas as pd
import MySQLdb.cursors
import bcrypt
import string
import re
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import pymysql
import secrets
import jwt
from datetime import datetime
import datetime
import seaborn as sns
import matplotlib.pyplot as plt
from io import BytesIO
import base64
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

import warnings
warnings.filterwarnings('ignore')

pymysql.install_as_MySQLdb()

app = Flask(__name__)

secret_key = secrets.token_hex(16)  # Genera una clave secreta de 16 bytes

app.config['SECRET_KEY'] = secret_key

# CORS
CORS(app, origins=["http://localhost:3000"])
# Configurations
app.config.from_object('config')

LOGGER = app.logger

LOGGER.info(f'static folder: {app.static_folder}')

app_files_folder = os.path.join(app.static_folder, 'files')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Inicializar Flask-Migrate

# Sample HTTP error handling


def generate_unique_username(name, last_name):
    from app.mod_auth.models import User

    base_username = f"{name.lower()}_{last_name.lower()}"
    random_number = random.randint(1000, 9999)
    username = f"{base_username}{random_number}"

    while User.query.filter_by(username=username).first():
        random_number = random.randint(1000, 9999)
        username = f"{base_username}{random_number}"

    return username


@app.errorhandler(404)
def not_found(error):
    return render_template('pages-error-404.html'), 404


@app.route('/')
def home_view():
    return render_template('home-page.html')


@app.route('/contact')
def contact_view():
    return render_template('pages-contact.html')


@app.route('/faq_view')
def faq_view():
    return render_template('pages-faq.html')


@app.route('/profile_view')
def profile_view():
    return render_template('users-profile.html')


@app.route('/charts_view')
def charts_view():
    return render_template('charts-apexcharts.html')


def send_email(email, information):
    try:
        smtp_server = "smtp.gmail.com"
        port = 587  # puerto para TLS
        sender_email = "axelmiranda.845@gmail.com"
        sender_password = "wgzy jufx jokq pzno"

        server = smtplib.SMTP(smtp_server, port)
        server.starttls()
        server.login(sender_email, sender_password)
        subject = "Data Learning System"
        body = information

        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))
        server.sendmail(sender_email, email, message.as_string())
    except Exception as e:
        flash(f'informacion de error: {str(e)}')


@app.route('/contact_send', methods=['POST'])
def contact_send():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        subject = request.form['subject']
        message_body = request.form['message']
        message = 'El usuario envio un mensaje: ' + name + ' ' + message_body

        try:
            send_email(email, message)
            flash('Message sent successfully!', 'success')
        except Exception as e:
            print(str(e))
            flash('Error sending message. Please try again later.', 'error')

    return redirect(url_for('contact_view'))


@app.route('/contact_information', methods=['POST'])
def contact_information():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        subject = request.form['subject']
        message_body = request.form['message']
        message = 'El usuario envio un mensaje: ' + name + ' ' + message_body

        try:
            send_email(email, message)
            flash('Message sent successfully!', 'success')
        except Exception as e:
            print(str(e))
            flash('Error sending message. Please try again later.', 'error')

    return redirect(url_for('home_view'))


@app.route('/login')
def login_view():
    return render_template('pages-login.html')


@app.route('/logout')
def logout():
    session.clear()
    return jsonify({"message": "Sesión cerrada", "status": 200})


@app.route('/register')
def register_view():
    return render_template('pages-register.html')

# ruta para la vista login


@app.route('/index')
def index():
    return render_template('index.html')

# mostrar las lista de registros


@app.route('/list_users', methods=['GET'])
def list_users():
    from app.mod_auth.models import User
    try:
        users = User.query.all()
        return render_template('tables-data.html', users=users)
    except Exception as e:
        flash(f'Informacion del error: {str(e)}')

    return render_template('tables-data.html', users=[])


@app.route('/add_user', methods=['POST'])
def add_user():
    from app.mod_auth.models import User
    try:
        if request.method == 'POST':
            data = request.get_json()  # obtener los datos en formato JSON

            if not data.get('email').endswith('.com'):
                app.logger.info("Correo inválido: no tiene dominio .com")
                return jsonify({"error": "El correo electrónico ingresado no tiene dominio .com"}), 400

            if len(data.get('password')) < 6:
                app.logger.info("Contraseña demasiado corta")
                return jsonify({"error": "La contraseña debe tener al menos 6 caracteres"}), 400

            if data.get('password') != data.get('confirmPassword'):
                app.logger.info("Las contraseñas no coinciden")
                return jsonify({"error": "Las contraseñas no coinciden"}), 400

            if User.query.filter_by(email=data.get('email')).first():
                app.logger.info(f"Correo ya registrado: {data.get('email')}")
                return jsonify({"error": "El correo electrónico ya está en uso"}), 400

            username = generate_unique_username(
                data['firstName'], data['lastName'])

            # Crea un nuevo usuario utilizando el modelo User
            new_user = User(
                name=data['firstName'],
                last_name=data['lastName'],
                username=username,
                email=data['email'],
                password=bcrypt.hashpw(
                    data['password'].encode("utf-8"), bcrypt.gensalt())
            )
            db.session.add(new_user)
            db.session.commit()

            return jsonify({"message": "Tu cuenta ha sido creada con éxito", "username": username}), 201

    except Exception as e:
        app.logger.error(f"Error al agregar usuario: {str(e)}")
        return jsonify({"error": "Ocurrió un error inesperado. Por favor, inténtelo más tarde."}), 500


@app.route('/get_user/<id>', methods=['GET'])
def get_user(id):
    from app.mod_auth.models import User
    user = User.query.get(id)  # Obtener un solo usuario por su ID

    if user:
        user_data = {
            "username": user.username,
            "name": user.name,
            "last_name": user.last_name,
            "email": user.email,
            "role": user.role,
            "active": user.status,
            "id": user.id,
            "created_at": user.date_created,
            "updated_at": user.date_modified,
        }

        return jsonify(user_data)
    else:
        # Manejar el caso en que no se encuentra el usuario con el ID especificado
        return jsonify({"error": "No se encontró el usuario con el ID especificado"}), 404


@app.route('/update_user/<id>', methods=['POST'])
def update_user(id):
    from app.mod_auth.models import User
    try:
        if request.method == 'POST':
            user = User.query.get(id)

            if user:
                data = request.get_json()

                if 'name' in data and data['name']:
                    user.name = data['name']
                if 'last_name' in data and data['last_name']:
                    user.last_name = data['last_name']
                if 'email' in data and data['email']:
                    user.email = data['email']
                if 'username' in data and data['username']:
                    user.username = data['username']
                if 'role' in data and data['role']:
                    user.role = data['role']

                current_datetime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                user.date_modified = current_datetime

                db.session.commit()

                return jsonify({
                    'message': 'Registro actualizado correctamente',
                    'status': 'success'
                }), 200
            else:
                return jsonify({
                    'message': 'No se encontró el usuario con el ID especificado',
                    'status': 'error'
                }), 404
    except Exception as e:
        return jsonify({
            'message': f'Error al actualizar el usuario: {str(e)}',
            'status': 'error'
        }), 500


# eliminar registro existente de la tabla usuario


@app.route('/delete_user/<id>', methods=['POST', 'GET'])
def delete_user(id):
    from app.mod_auth.models import User
    try:
        user = User.query.get(id)

        if user:
            user.status = 0
            current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            user.date_modified = current_datetime

            db.session.commit()
            flash('Registro eliminado', 'info')
        else:
            flash('No se encontró el usuario con el ID especificado', 'info')
    except Exception as e:
        flash(f'Informacion del error: {str(e)}')

    return redirect(url_for('list_users'))


@app.route('/login_send', methods=['POST'])
def login_send():
    from app.mod_auth.models import User
    try:
        if request.method == "POST":
            data = request.get_json()

            if not data or 'identifier' not in data or 'password' not in data:
                return jsonify({"message": "Faltan datos necesarios"}), 400

            identifier = data['identifier']
            password = data['password']
            # remember = request.form.get('remember')

            user = User.query.filter_by(email=identifier).first(
            ) if "@" in identifier else User.query.filter_by(username=identifier).first()

            if not user:
                return jsonify({"message": "El usuario no existe"}), 404

            if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                return jsonify({"message": "La contraseña es incorrecta"}), 401

            payload = {
                "email": user.email,
                "role": user.role,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }
            token = jwt.encode(payload, secret_key, algorithm="HS256")

            session.update({
                'email': user.email,
                'role': user.role,
                'name': user.name,
                'username': user.username,
                'status': user.status,
                'lastName': user.last_name,
                'id': user.id,
            })

            return jsonify({
                "message": "Sesión iniciada correctamente",
                "token": token,
                "userId": user.id
            }), 200

    except Exception as e:
        print(f"Error en /login_send: {e}")
        return jsonify({"message": f"Error interno: {str(e)}"}), 500


# Build the database:
# This will create the database file in the folder where the app.py is located
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
