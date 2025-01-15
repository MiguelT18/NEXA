from . import auth_blueprint
from flask import Blueprint, request, render_template, flash, redirect, url_for, session, current_app as app, jsonify
from app import db
from app.mod_auth.models import User
import random
import bcrypt
from datetime import datetime
from werkzeug.utils import secure_filename
import os
from PIL import Image
import io

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@auth_blueprint.route('/list_users', methods=['GET'])
def list_users():
    """
    Lista todos los usuarios registrados con status = 1 y retorna en formato JSON.
    """
    try:
        users = User.query.filter_by(status=1).all()
        users_data = [{
            'id': user.id,
            'name': user.name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'status': user.status,
            'photo': user.photo,
            'phone_number': user.phone_number,
            'address': user.address,
            'date_register': user.date_register,
            'date_modified': user.date_modified
        } for user in users]
        return jsonify(users_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_blueprint.route('/add_user', methods=['POST'])
def add_user():
    """
    Añade un nuevo usuario al sistema y retorna en formato JSON.
    """
    try:
        if request.method == 'POST':
            random_number = random.randint(1000, 9999)
            name = request.form['name']
            last_name = request.form['lastName'].split()[0]
            username = last_name.lower() + str(random_number)
            email = request.form['email']
            password = request.form['password']
            repeat_password = request.form['repeatPassword']
            accept_terms = request.form['acceptTerms']

            existing_user = User.query.filter_by(email=email).first()

            if existing_user:
                return jsonify({"error": "El correo electrónico ya está en uso"}), 400

            if not email.endswith('.com'):
                return jsonify({"error": "El correo electrónico ingresado no tiene dominio .com"}), 400

            if len(password) < 8:
                return jsonify({"error": "La contraseña debe tener al menos 8 caracteres"}), 400

            if password != repeat_password:
                return jsonify({"error": "Las contraseñas no coinciden"}), 400

            if accept_terms != 'yes':
                return jsonify({"error": "Debes aceptar los términos y condiciones"}), 400

            new_user = User(
                name=name,
                last_name=last_name,
                username=username,
                email=email,
                password=bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
            )
            db.session.add(new_user)
            db.session.commit()

            return jsonify({
                "message": "Su cuenta ha sido creada con éxito",
                "username": f"Su nombre de usuario es: {username}"
            }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_blueprint.route('/get_user/<id>', methods=['GET'])
def get_user(id):
    """
    Obtiene los detalles de un usuario específico por su ID y retorna en formato JSON.
    """
    user = User.query.get(id)
    if user:
        user_data = {
            'id': user.id,
            'name': user.name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'status': user.status,
            'photo': user.photo,
            'phoneNumber': user.phoneNumber,
            'address': user.address,
            'date_register': user.date_register,
            'date_modified': user.date_modified
        }
        return jsonify(user_data), 200
    else:
        return jsonify({'error': 'Usuario no encontrado'}), 404

@auth_blueprint.route('/update_user/<id>', methods=['POST'])
def update_user(id):
    """
    Actualiza la información de un usuario específico y retorna en formato JSON.
    """
    try:
        if request.method == 'POST':
            user = User.query.get(id)
            if user:
                # Validaciones
                name = request.form.get('name')
                last_name = request.form.get('lastName')
                email = request.form.get('email')
                username = request.form.get('username')
                phoneNumber = request.form.get('phoneNumber')
                address = request.form.get('address')

                if not name or not last_name or not email or not username:
                    return jsonify({'error': 'Todos los campos son obligatorios.'}), 400

                if User.query.filter_by(email=email).first() and user.email != email:
                    return jsonify({'error': 'El correo electrónico ya está en uso.'}), 400

                if len(phoneNumber) < 10:
                    return jsonify({'error': 'El número de teléfono debe tener al menos 10 dígitos.'}), 400

                # Actualizar datos del usuario
                user.name = name
                user.last_name = last_name
                user.email = email
                user.username = username
                user.phoneNumber = phoneNumber  # Actualizar phoneNumber
                user.address = address  # Actualizar address
                user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

                db.session.commit()
                return jsonify({'message': 'Registro actualizado'}), 200
            else:
                return jsonify({'error': 'No se encontró el usuario con el ID especificado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_blueprint.route('/delete_user/<id>', methods=['POST', 'GET'])
def delete_user(id):
    """
    Elimina un usuario del sistema cambiando su estado a inactivo y retorna en formato JSON.
    """
    try:
        user = User.query.get(id)
        if user:
            user.status = 0
            user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            db.session.commit()
            return jsonify({'message': 'Registro eliminado'}), 200
        else:
            return jsonify({'error': 'No se encontró el usuario con el ID especificado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_blueprint.route('/login_send', methods=['POST'])
def login_send():
    """
    Procesa el inicio de sesión del usuario y retorna en formato JSON.
    Verifica las credenciales y, si son correctas, retorna un mensaje de éxito.
    De lo contrario, retorna un mensaje de error.
    """
    try:
        if request.method == "POST":
            username = request.form['username']
            password = request.form['password'].encode('utf-8')

            # Filtrar para obtener solo usuarios con status = 1
            user = User.query.filter_by(username=username, status=1).first()

            if user:
                if bcrypt.checkpw(password, user.password.encode('utf-8')):
                    # Guardar información del usuario en la sesión
                    session['email'] = user.email
                    session['role'] = user.role
                    session['name'] = user.name
                    session['username'] = user.username
                    session['status'] = user.status
                    session['last_name'] = user.last_name
                    session['user_id'] = user.id
                    session['phone_number'] = user.phone_number
                    session['address'] = user.address
                    session['photo'] = user.photo

                    return jsonify({'message': 'Inicio de sesión exitoso', 'user_id': user.id}), 200
                else:
                    return jsonify({'error': 'La contraseña es incorrecta'}), 401
            else:
                return jsonify({'error': 'No existe el usuario o el usuario está inactivo'}), 404

    except Exception as e:
        return jsonify({'error': f'Informacion del error: {str(e)}'}), 500

    return jsonify({'error': 'Método no permitido'}), 405

@auth_blueprint.route('/login')
def login_view():
    """
    Muestra la página de inicio de sesión.
    """
    return render_template('pages-login.html')

@auth_blueprint.route('/logout')
def logout():
    """
    Cierra la sesión del usuario y limpia la sesión.
    Retorna un mensaje en formato JSON.
    """
    session.clear()
    return jsonify({'message': 'Sesión cerrada con éxito.'}), 200

@auth_blueprint.route('/register')
def register_view():
    """
    Muestra la página de registro de usuarios.
    """
    return render_template('pages-register.html')

@auth_blueprint.route('/user_profile/<id>', methods=['POST'])
def user_profile(id):
    """
    Actualiza la información y la foto de perfil de un usuario específico.
    """
    try:
        user = User.query.filter_by(id=id, status=1).first()
        if user:
            # Actualizar datos del usuario según los campos del formulario
            user.name = request.form['name']
            user.last_name = request.form['lastName']
            user.email = request.form['email']
            user.username = request.form['username']
            user.phone_number = request.form['phoneNumber']
            user.address = request.form.get('address')

            # Manejar la actualización de la foto
            photo = request.files.get('photo')
            if photo and allowed_file(photo.filename):
                # Convertir la imagen a PNG
                image = Image.open(photo.stream)
                filename = f"{user.username}.png"
                photo_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image.save(photo_path, format='PNG')
                user.photo = 1
            else:
                user.photo = 0

            # Actualizar la fecha de modificación del usuario
            user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            db.session.commit()
            return jsonify({'message': 'Perfil actualizado con éxito.'}), 200
        else:
            return jsonify({'error': 'Usuario no encontrado o inactivo.'}), 404

    except Exception as e:
        return jsonify({'error': f'Error al actualizar el perfil: {str(e)}'}), 500

@auth_blueprint.route('/change_password/<id>', methods=['POST'])
def change_password(id):
    """
    Cambia la contraseña del usuario específico.
    """
    try:
        user = User.query.filter_by(id=id, status=1).first()
        if user:
            current_password = request.form['currentPassword']
            new_password = request.form['newPassword']
            confirm_password = request.form['confirmPassword']

            # Validaciones
            if not current_password or not new_password or not confirm_password:
                return jsonify({'error': 'Todos los campos son obligatorios.'}), 400

            if len(new_password) < 8:
                return jsonify({'error': 'La nueva contraseña debe tener al menos 8 caracteres.'}), 400

            # Verificar la contraseña actual
            if not bcrypt.checkpw(current_password.encode('utf-8'), user.password.encode('utf-8')):
                return jsonify({'error': 'La contraseña actual es incorrecta.'}), 400

            # Validar que la nueva contraseña y la confirmación coincidan
            if new_password != confirm_password:
                return jsonify({'error': 'Las contraseñas nuevas no coinciden.'}), 400

            # Actualizar la contraseña y la fecha de modificación
            user.password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            db.session.commit()
            return jsonify({'message': 'Contraseña actualizada con éxito.'}), 200
        else:
            return jsonify({'error': 'Usuario no encontrado o inactivo.'}), 404

    except Exception as e:
        return jsonify({'error': f'Error al cambiar la contraseña: {str(e)}'}), 500