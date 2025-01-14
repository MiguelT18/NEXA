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
CORS(app)
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
    # return redirect(url_for('home_view'))
    return jsonify({"message": "Sesión cerrada"})


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
            print(data)

            # Obtener los datos del usuario
            random_number = random.randint(1000, 9999)
            name = data['firstName']
            last_name = data['lastName']
            username = name.lower() + '_' + last_name.lower() + str(random_number)
            email = data['email']
            password = data['password']
            repeat_password = data['confirmPassword']
            accept_terms = data['terms']

            # ? algunas validaciones se realizan desde el frontend
            # Consulta la base de datos para verificar si el correo electrónico ya existe
            existing_user = User.query.filter_by(email=email).first()
            if existing_user:
                #     # flash("El correo electrónico ya está en uso", "error")
                #     # return redirect(url_for('register_view'))
                return jsonify({"error": "El correo electrónico ya está en uso."}), 400

            # if not email.endswith('.com'):
            #     # flash("El correo electrónico ingresado no tiene dominio .com", "info")
            #     # return redirect(url_for('register_view'))
            #     return jsonify({"error": "El correo electrónico ingresado no tiene dominio .com"}), 400

            # if len(password) < 6:
            #     # flash("La contraseña debe tener al menos 8 caracteres", "info")
            #     # return redirect(url_for('register_view'))
            #     return jsonify({"error": "La contraseña debe tener al menos 8 caracteres"}), 400

            # if password != repeat_password:
            #     # flash('Las contraseñas no coinciden', 'info')
            #     # return redirect(url_for('register_view'))
            #     return jsonify({"error": "Las contraseñas no coinciden"}), 400

            # if accept_terms != 'yes':
            #     # flash("Debes aceptar los términos y condiciones", "info")
            #     # return redirect(url_for('register_view'))
            #     return jsonify({"error": "Debes aceptar los términos y condiciones"}), 400

            # Crea un nuevo usuario utilizando el modelo User
            new_user = User(
                name=name,
                last_name=last_name,
                username=username,
                email=email,
                password=bcrypt.hashpw(
                    password.encode("utf-8"), bcrypt.gensalt())
            )
            db.session.add(new_user)
            db.session.commit()

            # Almacenar los datos del usuario en la sesión
            session['name'] = name
            session['email'] = email
            session['username'] = username

            flash('Su cuenta ha sido creado con éxito', "info")
            flash(f'Su nombre de usuario es: {username}', 'info')
            return jsonify({"message": "Tu cuenta ha sido creada con éxito"}), 201

    except Exception as e:
        flash(f'Informacion del error: {str(e)}')
        return jsonify({"error": f"Error: {str(e)}"}), 500


@app.route('/get_user/<id>', methods=['GET'])
def get_user(id):
    from app.mod_auth.models import User
    user = User.query.get(id)  # Obtener un solo usuario por su ID

    if user:
        return render_template('user-update.html', user=user)
    else:
        # Manejar el caso en que no se encuentra el usuario con el ID especificado
        return render_template('pages-error-404.html')


@app.route('/update_user/<id>', methods=['POST'])
def update_user(id):
    from app.mod_auth.models import User
    try:
        if request.method == 'POST':
            user = User.query.get(id)

            if user:
                user.name = request.form['name']
                user.last_name = request.form['lastName']
                user.email = request.form['email']
                user.username = request.form['username']
                user.role = request.form['role']
                current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                user.date_modified = current_datetime

                db.session.commit()
                flash('Registro actualizado', 'info')
            else:
                flash('No se encontró el usuario con el ID especificado', 'info')
    except Exception as e:
        flash(f'Informacion del error: {str(e)}')
        return render_template('user-update.html')

    return redirect(url_for('list_users'))


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
            email = data['email']
            password = data['password']
            # username = request.form['username']
            # password = request.form['password'].encode('utf-8')
            remember = request.form.get('remember')

            user = User.query.filter_by(email=email).first()

            if user:
                if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
                    # datos para el token
                    payload = {
                        "email": user.email,
                        "role": user.role,
                        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                    }
                    token = jwt.encode(payload, secret_key, algorithm="HS256")

                    session['email'] = user.email
                    session['role'] = user.role
                    session['name'] = user.name
                    session['username'] = user.username
                    session['status'] = user.status
                    session['lastName'] = user.last_name
                    # return redirect(url_for('analisis_view'))
                    return jsonify({
                        "message": "Sesión iniciada correctamente",
                        "token": token
                    }), 200
                else:
                    # flash('La contraseña es incorrecta', 'info')
                    # return redirect(url_for('login_view'))
                    return jsonify({"message": "La contraseña es incorrecta"}), 401
            else:
                # flash('No existe el usuario', 'info')
                # return redirect(url_for('error_view'))
                return jsonify({"message": "El usuario no existe"}), 500

    except Exception as e:
        # flash(f'Informacion del error: {str(e)}')
        return jsonify({"message": f'Informacion del error: {str(e)}'})

    # return redirect(url_for('register_view'))


# Build the database:
# This will create the database file in the folder where the app.py is located
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
