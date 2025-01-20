from app.models.user import User
from app.extensions import db


def get_user_by_email(email):
    """
    Obtiene un usuario por correo electrónico.
    """
    return User.query.filter_by(email=email).first()


def get_user_by_id(user_id):
    """
    Obtiene un usuario por ID.
    """
    return User.query.get(user_id)


def create_user(data):
    """
    Crea un nuevo usuario en la base de datos.
    """
    user = User(name=data['name'], email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return user