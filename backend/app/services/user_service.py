from app.models.user import User
from app.models.person import Person
from app.extensions import db
from datetime import datetime

def create_user(username, email, password, name, last_name, photo=None, role='usuario'):
    """
    Crea un nuevo usuario en la base de datos y una nueva persona asociada.

    :param username: Nombre de usuario único para el nuevo usuario.
    :param email: Correo electrónico único para el nuevo usuario.
    :param password: Contraseña en texto plano para el nuevo usuario.
    :param name: Nombre de la persona asociada al usuario.
    :param last_name: Apellido de la persona asociada al usuario.
    :param photo: Foto del usuario como datos binarios (opcional).
    :param role: Rol del usuario (por defecto 'usuario').
    :return: La instancia del nuevo usuario creado.
    """
    # Crear una nueva instancia de Person
    person = Person(
        name=name,
        last_name=last_name
    )
    
    # Crear una nueva instancia de User
    user = User(
        username=username,
        email=email,
        person=person,  # Asumimos que 'person' es una nueva instancia de Person
        photo=photo,
        role=role
    )
    
    user.set_password(password)  # Generar el hash de la contraseña
    db.session.add(person)  # Agregar la persona a la sesión
    db.session.add(user)  # Agregar el usuario a la sesión
    db.session.commit()  # Confirmar los cambios en la base de datos
    return user

def get_user(user_id):
    """
    Obtiene un usuario por su ID incluyendo todos sus atributos y la información de la persona asociada.

    :param user_id: ID del usuario a buscar.
    :return: Un diccionario con los atributos del usuario y la persona asociada, o None si no se encuentra.
    """
    user = User.query.filter_by(id=user_id, status=1).join(User.person).first()  # Filtrar por ID y status = 1 con join
    if not user:
        return None  # Usuario no encontrado o inactivo
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "photo": user.photo,
        "status": user.status,
        "role": user.role,
        "date_created": user.date_created,
        "date_modified": user.date_modified,
        "person": {
            "id": user.person.id,
            "name": user.person.name,
            "last_name": user.person.last_name,
            "phone_number": user.person.phone_number,
            "address": user.person.address,
            "city": user.person.city,
            "birthdate": user.person.birthdate
        }
    }

def get_user_by_email(email):
    """
    Obtiene un usuario por correo electrónico y verifica que esté activo.

    :param email: Correo electrónico del usuario a buscar.
    :return: La instancia del usuario si se encuentra y está activo (status = 1), None en caso contrario.
    """
    return User.query.filter_by(email=email, status=1).first()  # Filtrar por correo electrónico y status = 1

def get_user_by_username(username):
    """
    Obtiene un usuario por su nombre de usuario y verifica si está activo.

    :param username: Nombre de usuario del usuario a buscar.
    :return: La instancia del usuario si se encuentra y está activo (status = 1), None en caso contrario.
    """
    return User.query.filter_by(username=username, status=1).first()  # Filtrar por username y status = 1

def list_users(status=1):
    """
    Lista usuarios con un filtro opcional por status.
    Por defecto, solo devuelve usuarios activos (status=1).
    
    :param status: Estado de los usuarios a listar (0 = inactivo, 1 = activo).
    :return: Una lista de diccionarios con los atributos de los usuarios y la información de la persona asociada.
    """
    users = User.query.filter_by(status=status).join(User.person).all()  # Realizar la unión con la tabla Person

    user_list = []
    for user in users:
        user_list.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "photo": user.photo,
            "status": user.status,
            "role": user.role,
            "date_created": user.date_created,
            "date_modified": user.date_modified,
            "person": {
                "id": user.person.id,
                "name": user.person.name,
                "last_name": user.person.last_name,
                "phone_number": user.person.phone_number,
                "address": user.person.address,
                "city": user.person.city,
                "birthdate": user.person.birthdate
            }
        })

    return user_list

def delete_user_by_status(user_id):
    """
    Elimina lógicamente un usuario cambiando su status.
    Activo (1) -> Inactivo (0).
    """
    user = User.query.get(user_id)
    if not user:
        return None  # Usuario no encontrado
    user.status = 0  # Cambiar el status a inactivo
    user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Actualizar la fecha de modificación usando el formato deseado
    db.session.commit()
    return user

def change_user_password(user_id, new_password):
    """
    Cambia la contraseña de un usuario.

    :param user_id: ID del usuario cuya contraseña será cambiada.
    :param new_password: Nueva contraseña en texto plano.
    :return: True si la contraseña fue actualizada correctamente, False si el usuario no existe.
    """
    user = User.query.get(user_id)
    if not user:
        return False  # Usuario no encontrado

    user.set_password(new_password)  # Actualizar el hash de la contraseña
    user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Actualizar la fecha de modificación usando el formato deseado
    db.session.commit()
    return True

def update_user_data(user_id, username=None, email=None, photo=None, name=None, last_name=None, role=None):
    """
    Actualiza los datos del usuario y de la persona asociada.

    :param user_id: ID del usuario cuyos datos serán actualizados.
    :param username: Nuevo nombre de usuario (opcional).
    :param email: Nuevo correo electrónico (opcional).
    :param photo: Nueva foto del usuario como datos binarios (opcional).
    :param name: Nuevo nombre de la persona asociada (opcional).
    :param last_name: Nuevo apellido de la persona asociada (opcional).
    :param role: Nuevo rol del usuario (opcional).
    :return: True si los datos fueron actualizados correctamente, False si el usuario no existe.
    """
    user = User.query.filter_by(id=user_id).join(User.person).first()
    if not user:
        return False

    if username:
        user.username = username
    if email:
        user.email = email
    if photo:
        user.photo = photo
    if role:
        user.role = role

    if user.person:
        if name:
            user.person.name = name
        if last_name:
            user.person.last_name = last_name

    user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    db.session.commit()
    return True

def update_profile(user_id, username=None, email=None, photo=None, name=None, last_name=None, phone_number=None, city=None, address=None, birthdate=None):
    """
    Actualiza el perfil del usuario y de la persona asociada.

    :param user_id: ID del usuario cuyo perfil será actualizado.
    :param username: Nuevo nombre de usuario (opcional).
    :param email: Nuevo correo electrónico (opcional).
    :param photo: Nueva URL de la foto del usuario (opcional).
    :param name: Nuevo nombre de la persona asociada (opcional).
    :param last_name: Nuevo apellido de la persona asociada (opcional).
    :param phone_number: Nuevo número de teléfono de la persona (opcional).
    :param city: Nueva ciudad de la persona (opcional).
    :param address: Nueva dirección de la persona (opcional).
    :param birthdate: Nueva fecha de nacimiento de la persona (opcional).
    :return: True si los datos fueron actualizados correctamente, False si el usuario no existe.
    """
    user = User.query.filter_by(id=user_id).join(User.person).first()  # Usar join para cargar la relación
    if not user:
        return False  # Usuario no encontrado

    # Actualizar los campos del usuario solo si se proporcionan nuevos valores
    if username is not None:
        user.username = username
    if email is not None:
        user.email = email
    if photo is not None:
        user.photo = photo  # Asegúrate de que el modelo User tenga un campo 'photo'

    # Actualizar los campos de la persona asociada solo si se proporcionan nuevos valores
    if user.person:  # Verificar que la persona asociada exista
        if name is not None:
            user.person.name = name
        if last_name is not None:
            user.person.last_name = last_name
        if phone_number is not None:
            user.person.phone_number = phone_number
        if city is not None:
            user.person.city = city
        if address is not None:
            user.person.address = address
        if birthdate is not None:
            user.person.birthdate = birthdate

    user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Actualizar la fecha de modificación
    db.session.commit()  # Confirmar los cambios en la base de datos
    return True

def remove_user_photo(user_id):
    """
    Elimina la foto de un usuario y actualiza la fecha de modificación.

    :param user_id: ID del usuario cuya foto será eliminada.
    :return: True si la foto fue eliminada correctamente, False si el usuario no existe.
    """
    user = User.query.get(user_id)
    if not user:
        return False  # Usuario no encontrado

    user.photo = None  # Establecer el campo photo como None
    user.date_modified = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Actualizar la fecha de modificación
    db.session.commit()  # Guardar los cambios en la base de datos
    return True