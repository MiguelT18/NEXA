from app.models.user import User
from app.models.person import Person
from app.extensions import db

def create_user(username, email, password, name, last_name):
    """
    Crea un nuevo usuario en la base de datos y una nueva persona asociada.

    :param username: Nombre de usuario único para el nuevo usuario.
    :param email: Correo electrónico único para el nuevo usuario.
    :param password: Contraseña en texto plano para el nuevo usuario.
    :param name: Nombre de la persona asociada al usuario.
    :param last_name: Apellido de la persona asociada al usuario.
    
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
        person=person  # Asumimos que 'person' es una nueva instancia de Person
    )
    
    user.set_password(password)  # Generar el hash de la contraseña
    db.session.add(person)  # Agregar la persona a la sesión
    db.session.add(user)  # Agregar el usuario a la sesión
    db.session.commit()  # Confirmar los cambios en la base de datos
    return user

def get_user_by_id(user_id):
    """
    Obtiene un usuario por ID.
    """
    return User.query.get(user_id)

def get_user_by_email(email):
    """
    Obtiene un usuario por correo electrónico.
    """
    return User.query.filter_by(email=email).first()

def get_user_by_username(username):
    """
    Obtiene un usuario por su nombre de usuario.

    :param username: Nombre de usuario del usuario a buscar.
    :return: La instancia del usuario si se encuentra, None en caso contrario.
    """
    return User.query.filter_by(username=username).first()  # Buscar el primer usuario que coincida con el nombre de usuario

def list_users(status=1):
    """
    Lista usuarios con un filtro opcional por status.
    Por defecto, solo devuelve usuarios activos (status=1).
    """
    query = User.query.filter_by(status=status)
    return query.all()

def delete_user_by_status(user_id):
    """
    Elimina lógicamente un usuario cambiando su status.
    Activo (1) -> Inactivo (0).
    """
    user = User.query.get(user_id)
    if not user:
        return None  # Usuario no encontrado
    user.status = 0  # Cambiar el status a inactivo
    db.session.commit()
    return user