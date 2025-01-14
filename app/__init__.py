import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, send_file, jsonify
import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import pymysql
import secrets

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

# Carpeta para subir imágenes de perfil
app.config['UPLOAD_FOLDER'] = os.path.join(app.static_folder, 'img')

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
        return {'error': f'información de error: {str(e)}'}

@app.route('/contact_send', methods=['POST'])
def contact_send():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        subject = request.form['subject']
        message_body = request.form['message']
        message = 'El usuario envió un mensaje: ' + name + ' ' + message_body  

        try:
            send_email(email, message)
            return jsonify({'message': '¡Mensaje enviado con éxito!'}), 200
        except Exception as e:
            print(str(e))
            return jsonify({'error': 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.'}), 500

@app.route('/contact_information', methods=['POST'])
def contact_information():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        subject = request.form['subject']
        message_body = request.form['message']
        message = 'El usuario envió un mensaje: ' + name + ' ' + message_body  

        try:
            send_email(email, message)
            return jsonify({'message': '¡Mensaje enviado con éxito!'}), 200
        except Exception as e:
            print(str(e))
            return jsonify({'error': 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.'}), 500

#ruta para la vista login
@app.route('/index')
def index():
    return render_template('index.html')

from app.mod_auth.controllers import auth_blueprint

app.register_blueprint(auth_blueprint, url_prefix='/auth')