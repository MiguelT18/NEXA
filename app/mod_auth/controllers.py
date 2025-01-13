from . import auth_blueprint
from flask import Blueprint, request, render_template, flash, redirect, url_for, session, current_app as app
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
    Lista todos los usuarios registrados.
    Retorna una página HTML con una tabla que muestra los usuarios.
    """
    try:
        users = User.query.all()
        return render_template('tables-data.html', users=users)
    except Exception as e:
        flash(f'Informacion del error: {str(e)}')
    return render_template('tables-data.html', users=[])

@auth_blueprint.route('/add_user', methods=['POST'])
def add_user():
    """
    Añade un nuevo usuario al sistema.
    Recoge datos del formulario y crea un nuevo usuario si no existe uno con el mismo email.
    Redirige a la vista de registro con un mensaje apropiado dependiendo del resultado de la operación.
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
                flash("El correo electrónico ya está en uso", "error")
                return redirect(url_for('auth.register_view'))

            if not email.endswith('.com'):
                flash("El correo electrónico ingresado no tiene dominio .com", "info")
                return redirect(url_for('auth.register_view'))

            if len(password) < 8:
                flash("La contraseña debe tener al menos 8 caracteres", "info")
                return redirect(url_for('auth.register_view'))

            if password != repeat_password:
                flash('Las contraseñas no coinciden', 'info')
                return redirect(url_for('auth.register_view'))

            if accept_terms != 'yes':
                flash("Debes aceptar los términos y condiciones", "info")
                return redirect(url_for('auth.register_view'))

            new_user = User(
               name=name,
               last_name=last_name,  
               username=username,    
               email=email,
               password=bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
            )
            db.session.add(new_user)
            db.session.commit()

            session['name'] = name
            session['email'] = email
            session['username'] = username

            flash('Su cuenta ha sido creado con éxito', "info")
            flash(f'Su nombre de usuario es: {username}', 'info')
            return redirect(url_for('auth.register_view'))

    except Exception as e:
        flash(f'Informacion del error: {str(e)}')
        return redirect(url_for('auth.register_view'))

    return redirect(url_for('auth.register_view'))

@auth_blueprint.route('/get_user/<id>', methods=['GET'])
def get_user(id):
    """
    Obtiene los detalles de un usuario específico por su ID.
    Retorna una página HTML para actualizar los datos del usuario si existe, de lo contrario muestra una página de error.
    """
    user = User.query.get(id)
    if user:
        return render_template('user-update.html', user=user)
    else:
        return render_template('pages-error-404.html')

@auth_blueprint.route('/update_user/<id>', methods=['POST'])
def update_user(id):
    """
    Actualiza la información de un usuario específico.
    Recoge datos del formulario y actualiza los detalles del usuario en la base de datos.
    Retorna a la lista de usuarios si la actualización es exitosa, de lo contrario muestra un mensaje de error.
    """
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

    return redirect(url_for('auth.list_users'))

@auth_blueprint.route('/delete_user/<id>', methods=['POST', 'GET'])
def delete_user(id):
    """
    Elimina un usuario del sistema cambiando su estado a inactivo.
    Retorna a la lista de usuarios con un mensaje apropiado.
    """
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

    return redirect(url_for('auth.list_users'))

@auth_blueprint.route('/login_send', methods=['POST'])
def login_send():
    """
    Procesa el inicio de sesión del usuario.
    Verifica las credenciales y, si son correctas, redirige al usuario a la página principal.
    De lo contrario, muestra un mensaje de error y redirige a la página de inicio de sesión.
    """
    try:
        if request.method == "POST":
            username = request.form['username']
            password = request.form['password'].encode('utf-8')

            user = User.query.filter_by(username=username).first()

            if user:
                if bcrypt.checkpw(password, user.password.encode('utf-8')):
                    session['email'] = user.email
                    session['role'] = user.role
                    session['name'] = user.name
                    session['username'] = user.username
                    session['status'] = user.status
                    session['last_name'] = user.last_name
                    session['user_id'] = user.id
                    return render_template('index.html')
                else:
                    flash('La contraseña es incorrecta', 'info')
                    return redirect(url_for('auth.login_view'))
            else:
                flash('No existe el usuario', 'info')
                return redirect(url_for('auth.login_view'))

    except Exception as e:
        flash(f'Informacion del error: {str(e)}')

    return redirect(url_for('auth.register_view'))

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
    Redirige al usuario a la página de inicio.
    """
    session.clear()
    return render_template('home-page.html')

@auth_blueprint.route('/register')
def register_view():
    """
    Muestra la página de registro de usuarios.
    """
    return render_template('pages-register.html')

@auth_blueprint.route('/update_user_with_photo/<id>', methods=['POST'])
def update_user_with_photo(id):
    """
    Actualiza la información y la foto de perfil de un usuario específico.
    """
    try:
        user = User.query.get(id)
        if user:
            # Actualizar datos del usuario según los campos del formulario
            user.name = request.form['name']
            user.last_name = request.form['lastName']
            user.email = request.form['email']
            user.username = request.form['username']

            # Manejar la actualización de la foto
            photo = request.files.get('photo')
            if photo and allowed_file(photo.filename):
                # Convertir la imagen a PNG
                image = Image.open(photo.stream)
                filename = f"{user.username}.png"  # Construir el nombre del archivo en formato PNG
                photo_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image.save(photo_path, format='PNG')
                user.photo = 1  # Indica que la foto existe
            else:
                user.photo = 0  # No hay foto o el archivo no es permitido

            # Actualizar la fecha de modificación del usuario
            user.date_modified = datetime.datetime.now()  # Actualizar con la fecha y hora actuales

            db.session.commit()
            flash('Perfil actualizado con éxito.', 'info')
        else:
            flash('Usuario no encontrado.', 'error')
            return render_template('users-profile.html')

        return redirect(url_for('auth.list_users'))
    except Exception as e:
        flash(f'Error al actualizar el perfil: {str(e)}', 'error')
        return render_template('users-profile.html', user=user)