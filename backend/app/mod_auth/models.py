# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db

# Define a base model for other database tables to inherit
class Base(db.Model):

    __abstract__  = True

    id            = db.Column(db.Integer, primary_key=True)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(),
                                           onupdate=db.func.current_timestamp())

# Define a User model
class User(Base):

    __tablename__ = 'auth_user'
    
    # User Name
    name = db.Column(db.String(128), nullable=False)

    # Additional User Data
    last_name = db.Column(db.String(128), nullable=False)
    username = db.Column(db.String(128), nullable=False, unique=True)
    
    # New columns for phoneNumber and address with nullable option
    phoneNumber = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(255), nullable=True)

    # Identification Data: email & password
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(192), nullable=False)

    # Authorisation Data: role & status
    role = db.Column(db.SmallInteger, nullable=True, default=1)
    status = db.Column(db.SmallInteger, nullable=False, default=1)

    # Photo indicator, nullable
    photo = db.Column(db.SmallInteger, default=0, nullable=True)  # 0 = no photo, 1 = photo exists, or null if not specified

    # New instance instantiation procedure
    def __init__(self, name, last_name, username, email, password, photo=None, phoneNumber=None, address=None):
        self.name = name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.password = password
        self.photo = photo if photo is not None else 0
        self.phoneNumber = phoneNumber
        self.address = address

    def __repr__(self):
        return '<User %r>' % (self.name)
